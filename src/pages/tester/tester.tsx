
import DiscordMessage from '../../components/DiscordMessage/'
import { RouteChildrenProps} from 'react-router-dom'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { MessageData } from '../../components/DiscordMessage/DiscordMessage'
import styles from './tester.module.css'
import commandsByCategory from './commands'

let exampleCommandThingy = {
	"content": "", 
	"embed": {
		"thumbnail": {
			"url": "/logo512.png"
		},
		"color": 6899575, 
		"type": "rich", 
		"description": "**```\nEnter a command to start!```**"
	}
}
export default function TesterPage(props: RouteChildrenProps) {
	const [search, sS] = useState(props.location.search);
	const [commandInput, sCI] = useState('~');
	const [hasDoneInitial, sHDI] = useState(false);
	const [cData, sCD] = useState<MessageData>(exampleCommandThingy);
	const [procError, sPE] = useState<null | string>(null);
	const [storedResultsFor, sSRF] = useState<null | string>(null);
	const [loading, sL] = useState(false);

	let btD = btoa(unescape(encodeURIComponent(JSON.stringify(cData))));
	let sParams = new Map();
	(search.startsWith('?')?search:'?' + search).substring(1).split('&').forEach((a) => {
		let key = a.split('=')[0];
		let val = a.split('=').slice(1).join('=');
		sParams.set(key.toLowerCase(), val);
	});
	sParams.get('cmd') && sParams.set('cmd', decodeURIComponent(escape(sParams.get('cmd'))));

	const commandNames = useRef<string[]>([]);
	const doCommand = (force?: string) => {
		let cI = force ?? commandInput;
		sL(true);
		fetch('http://i.mizabot.xyz/command/' + cI, {
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
				sCI('~' + decodeURIComponent(escape(cmd)));
				// DON'T run the command again if there's data
			}
		} else if (cmd) {
			sCI('~' + cmd);
			doCommand('~' + cmd)
		}
		sHDI(true);
	}
	
	useEffect(() => {
		let tempC: string[] = [];
		for (let cat in commandsByCategory) {
			for (let command in commandsByCategory[cat]) {
			tempC.push(
					...commandsByCategory[cat][command].aliases.map(e => e.toLowerCase()),
					command.toLowerCase()
			)
				}
		}
		commandNames.current = tempC;
	}, [commandNames])

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
							e.currentTarget.value.startsWith('~') ?
								e.currentTarget.value :
								'~' + e.currentTarget.value
						);
					}}
					onKeyPress={(e) => {
						if (e.key !== 'Enter') {
							return;
						}
						e.preventDefault();
						if (suggestedCommand && commandInput !== '~' + suggestedCommand) {
							sCI('~' + suggestedCommand);
							return;
						}
						doCommand();
					}}
				/>
				<span
					className={styles.suggest}
				>
					{commandInput.length !== 0 && suggestedCommand && '~' + suggestedCommand}
				</span>
			</div>
			<div className={[
				styles.permalinks,
				(storedResultsFor === commandInput) && styles.permaShow,
				'hideext'
			].join(' ')}>
				<a
					className={
						(isPermaCmd) ?
							styles.inactiveLink :
							undefined
					}
					href={`./tester?cmd=${
						commandInput.substring(1)
					}`}
					onClick={(e) => {
						e.preventDefault();
						sS(`?cmd=${commandInput.substring(1)}`)
						window.history.replaceState(null, "Miza", `./tester?cmd=${
							commandInput.substring(1)
						}`);
					}}
					target="_self"
				>
					command permalink
				</a>
				<span className={styles.sep}>•</span>
				<a
					className={
						(isPermaRes) ?
							styles.inactiveLink :
							undefined
					}
					href={`./tester?cmd=${commandInput.substring(1)}&fdata=${btD}`}
					onClick={(e) => {
						e.preventDefault();
						window.history.replaceState(null, "Miza", `./tester?cmd=${
							commandInput.substring(1)
						}&fdata=${
							btD
						}`)
						sS(`?cmd=${
							commandInput.substring(1)
						}&fdata=${
							btD
						}`)
					}}
					target="_self"
				>
					result permalink
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
							window.history.replaceState(null, "Miza", `./tester`);
							sCI('~' + sParams.get('cmd'));
							doCommand('~' + sParams.get('cmd'))
						}}
					>
						run yourself
					</button>
				</div>
			</div>
		</div>
	</div>)
}