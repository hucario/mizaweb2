
import DiscordMessage from '../../components/DiscordMessage/'
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
export default function TesterPage() {
	const [commandInput, sCI] = useState('~');
	const [cData, sCD] = useState<MessageData>(exampleCommandThingy);
	const [procError, sPE] = useState<null | string>(null);

	const commandNames = useRef<string[]>([]);
	const doCommand = () => {
		fetch('http://i.mizabot.xyz/command/' + commandInput, {
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
		}).catch(e => {
			sPE(e.toString());
		})
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
		console.log(tempC)
		commandNames.current = tempC;
	}, [commandNames])

	let suggestedCommand = commandNames.current.filter(e => e.startsWith(commandInput.substring(1))).sort()?.[0];

	return (<div style={{paddingTop: '100px'}}>
		<div className={styles.outputwrap}>
			<div className={styles.inpWrapper}>
				<input
					className={styles.inp}
					value={commandInput}
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
			<div className={styles.output}>
				<div className={styles.loaderBar} />
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
					opacity: procError ? 0.6 : 1
				}}>
					<DiscordMessage
						data={cData}
					/>	
				</div>
			</div>
		</div>
	</div>)
}