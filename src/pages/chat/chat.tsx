
import DiscordMessage from '../../components/DiscordMessage/'
import { RouteChildrenProps} from 'react-router-dom'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { MessageData } from '../../components/DiscordMessage/DiscordMessage'
import styles from './chat.module.css'
import commandsByCategory from '../../commands'

let exampleCommandThingy = {
	"content": "", 
	"embed": {
		"thumbnail": {
			"url": "/logo512.png"
		},
		"color": 6899575, 
		"type": "rich", 
		"description": "**```\nAsk or talk about anything!```**"
	}
}
export default function ChatPage(props: RouteChildrenProps) {
	const [search, sS] = useState(props.location.search);
	const [commandInput, sCI] = useState('Can I please have a hug?');
	const [hasDoneInitial, sHDI] = useState(false);
	const [cData, sCD] = useState<MessageData>(exampleCommandThingy);
	const [procError, sPE] = useState<null | string>(null);
	const [storedResultsFor, sSRF] = useState<null | string>(null);
	const [loading, sL] = useState(false);
	useEffect(() => {
		document.title = "Miza: Chat"
		return () => {
			document.title = "Miza";
		}
	})

	let btD = btoa(unescape(encodeURIComponent(JSON.stringify(cData))));
	let sParams = new Map();
	(search.startsWith('?')?search:'?' + search).substring(1).split('&').forEach((a) => {
		let key = a.split('=')[0];
		let val = a.split('=').slice(1).join('=');
		sParams.set(key.toLowerCase(), val);
	});
	sParams.get('cmd') && sParams.set('cmd', decodeURIComponent(unescape(sParams.get('cmd'))));

	const commandNames = useRef<string[]>([]);
	const doChat = (force?: string) => {
		let cI = force ?? commandInput;
		sL(true);
		fetch('https://mizabot.xyz/command/ask%20' + encodeURIComponent(cI), {
			credentials: 'omit',
			mode: window.location.hostname.includes('mizabot.xyz') ? 'same-origin' : 'cors'
		}).then(async (e) => {
			let jsesc = await e.text();
			jsesc = jsesc
				.replace(/\n/g, "\\\\n")
				.replace(/\r/g, "\\\\r")
				.replace(/\t/g, "\\\\t");
			return JSON.parse(jsesc)
		}).then((e: MessageData[]) => {
			sCD(e[0]);
			sPE(null);
			sSRF(cI);
			sL(false);
		}).catch(e => {
			sL(false);
			sPE(e.toString());
		})
	}
	if (!hasDoneInitial) {
		let fD = sParams.get('fdata'),
			cmd = sParams.get('cmd');
		if (fD) {
			sCD(JSON.parse(decodeURIComponent(escape(atob(fD)))));
			if (cmd) {
				sCI(decodeURIComponent(unescape(cmd)));
				// DON'T run the command again if there's data
			}
		} else if (cmd) {
			sCI(decodeURIComponent(unescape(sParams.get('cmd'))));
			doChat(decodeURIComponent(unescape(sParams.get('cmd'))))
		}
		sHDI(true);
	}
	
	// const doStuff = () => {
		// let tempC: string[] = [];
		// if (!commandsByCategory.current) { 
			// return;
		// }
		// for (let cat in commandsByCategory.current) {
			// for (let command in commandsByCategory.current[cat]) {
			// tempC.push(
					// ...commandsByCategory.current[cat][command].aliases.map(e => e.toLowerCase()),
					// command.toLowerCase()
				// )
			// }
		// }
		// commandNames.current = tempC;
	// }
	// if (!commandsByCategory.effects.includes(doStuff)) {
		// commandsByCategory.setEffectCB(doStuff);
	// }

	// useEffect(() => {
		// doStuff();
	// }, [commandNames])

	let suggestedCommand = commandNames.current.filter(e => e.startsWith(commandInput.substring(1))).sort()?.[0];

	let isPermaCmd = sParams.get('cmd') === commandInput.substring(1);
	let isPermaRes = (
		sParams.get('cmd') === commandInput.substring(1) &&
		sParams.get('fdata') === btD
	)

	return (<div style={{paddingTop: '100px'}}>
		<div className={styles.outputwrap}>
			<div
				className={[
					styles.inpWrapper,
					(isPermaRes ? styles.disabled : '')
				].join(' ')}
			>
				<input
					className={styles.inp}
					value={commandInput}
					disabled={isPermaRes}
					onInput={(e: FormEvent<HTMLInputElement>) => {
						sCI(
							e.currentTarget.value
						);
					}}
					onKeyPress={(e) => {
						if (e.key !== 'Enter') {
							return;
						}
						e.preventDefault();
						// if (suggestedCommand && commandInput !== suggestedCommand) {
							// sCI(suggestedCommand);
							// return;
						// }
						doChat();
					}}
				/>
				<span
					className={styles.suggest}
				>
					{commandInput.length !== 0 && suggestedCommand}
				</span>
			</div>
			<div className={[
				styles.permalinks,
				(storedResultsFor === commandInput) && styles.permaShow,
				'hideext'
			].join(' ')}>
				<a
					className={[
						((isPermaCmd) ?
							styles.inactiveLink :
							undefined),
						styles.permCmd
					].join(' ')}
					href={`./chat?cmd=${
						commandInput
					}`}
					onClick={(e) => {
						e.preventDefault();
						sS(`?cmd=${commandInput}`)
						window.history.replaceState(null, "Miza", `./chat?cmd=${
							commandInput
						}`);
					}}
					target="_self"
				>
					{commandInput}
				</a>
				<span className={styles.sep}>•</span>
				<a
					className={[
						((isPermaRes) ?
							styles.inactiveLink :
							undefined),
						styles.permRes
					].join(' ')}
					href={`./chat?cmd=${commandInput}&fdata=${btD}`}
					onClick={(e) => {
						e.preventDefault();
						window.history.replaceState(null, "Miza", `./chat?cmd=${
							commandInput
						}&fdata=${
							btD
						}`)
						sS(`?cmd=${
							commandInput
						}&fdata=${
							btD
						}`)
					}}
					target="_self"
				>
					{commandInput} [perma]
				</a>
			</div>
			<div className={styles.output}>
				<div className={[
					styles.loaderBar,
					loading && styles.loading
				].join(' ')} />
				<div
					className={styles.errorBoi}
					style={{
						height: procError ? '100%' : '0',
						padding: procError ? '' : '0'
					}}
				>
					{procError}
				</div>
				<div className={styles.padder} style={{
					opacity: (procError || loading) ? 0.6 : 1
				}}>
					<DiscordMessage
						data={cData}
					/>
				</div>
				<div
					className={styles.permaInfo}
					style={{
						height: (isPermaRes) ? '100%' : '0',
						padding: (isPermaRes) ? '' : '0'
					}}
				>
					This is a recorded command, not one that was run just now.
					<button
						className={styles.runYourself}
						onClick={() => {
							sS(``)
							window.history.replaceState(null, "Miza", `./chat`);
							sCI(sParams.get('cmd'));
							doChat(sParams.get('cmd'))
						}}
					>
						run yourself
					</button>
				</div>
			</div>
		</div>
	</div>)
}