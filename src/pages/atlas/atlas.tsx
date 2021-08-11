 import DiscordMessage from '../../components/DiscordMessage'
import { RouteChildrenProps } from 'react-router-dom'
import styles from './atlas.module.css'
import commandsByCategory, { mizaCommand } from '../../commands'
import IsVisible from '../../components/IsVisible'
import React, { useEffect, useState } from 'react'
import { MessageData } from '../../components/DiscordMessage/DiscordMessage'

let catimages = new Map([
	['MAIN', 'https://discord.com/assets/516bf0fae97628e22a3a3ec810a8c4ba.svg'],
	['STRING', 'https://discord.com/assets/8db9972dd015f679c16544ac3e29e6b1.svg'],
	['ADMIN', 'https://discord.com/assets/0d9e341a5ff1e9d55e691cc7d86f05bd.svg'],
	['VOICE', 'https://discord.com/assets/0e7fc4b6265bd336e8fe4dca75417ee7.svg'],
	['IMAGE', 'https://discord.com/assets/59bdcc534c0d1adc1fb7575a1a4785a6.svg'],
	['FUN', 'https://discord.com/assets/559c3311dcdb3f23b7fb745559207db9.svg'],
	['OWNER', 'https://discord.com/assets/19fc9fc6001951c7370b1fd74e1570f1.svg'],
	['NSFW', 'https://discord.com/assets/ece853d6c1c1cd81f762db6c26fade40.svg'],
	['MISC', 'https://discord.com/assets/2e3fbb2338145553a3d26c677b4f83a3.svg']
])

let commandsByName: {
	[key: string]: mizaCommand
} = {};
for (let key in commandsByCategory) {
	commandsByName = {
		...commandsByName,
		...commandsByCategory[key]
	}
}

interface namedMizaCommand extends mizaCommand {
	title: string,
	category: string
}

export default function AtlasPage(props: {
	location: RouteChildrenProps['location'],
	match?: {
		params: {
			command?: string
		}
	}
}) {
	
	const [visibleCats, sVC] = useState<{
		[key: string]: boolean
	}>({})
	const [currCmd, sCC] = useState<namedMizaCommand | null>(null)
	const [doAnim, sDA] = useState(false);
	useEffect(() => {
		document.title = "Mizatlas" + (
			currCmd?.title ? ': ' + currCmd.title : ''
		)
		return () => {
			document.title = "Miza";
		}
	})
	let cmd = props.match?.params.command;
	useEffect(() => {
		if (commandsByCategory[(cmd ?? '').toUpperCase()]) {
			document.getElementById((cmd ?? '').toLowerCase())?.scrollIntoView({
				behavior: 'smooth'
			});
		}
	}, [cmd])
	useEffect(() => {
		setTimeout(() => {
			sDA(false);
		}, 250)
	}, [currCmd])

	const [commandInput, sCI] = useState('~');
	const [cData, sCD] = useState<null | MessageData>(null);
	const [procError, sPE] = useState<null | string>(null);
	const [loading, sL] = useState(false);

	const doCommand = (force?: string) => {
		let cI = force ?? commandInput;
		sL(true);
		fetch('http://i.mizabot.xyz/command/' + encodeURIComponent(cI), {
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
			sL(false);
		}).catch(e => {
			sL(false);
			sPE(e.toString());
		})
	}

	return (
		<div className={styles.page}>
			<div className={styles.leftestnav}>
				{Object.keys(commandsByCategory).map(key => {
					return (
						<button
							onClick={() => {
								document.getElementById(key.toLowerCase())?.scrollIntoView({
									behavior: 'smooth'
								});
							}}
						>
							<img
								className={[
									styles.leftestIcon,
									(visibleCats[key] ? styles.shownIcon : styles.hiddenIcon)
								].join(' ')}
								src={catimages.get(key)}
								alt={key.toLowerCase()}
								title={key.toLowerCase()}
							/>
						</button>
					)
				})}
			</div>
			<ol className={styles.leftnav}>
				{Object.keys(commandsByCategory).map(cat => {
					return (
						<IsVisible
							evts={{
								visible: () => {
									sVC({
										...visibleCats,
										[cat]: true
									})
								},
								invisible: () => {
									sVC({
										...visibleCats,
										[cat]: false
									})
								}
							}}
							minShown={0}
						>
							<li className={styles.cmdCat} id={cat.toLowerCase()} >
								<h5 className={styles.cmdCatH}>{cat.toLowerCase()}</h5>
								{Object.keys(commandsByCategory[cat]).map((key) => {
									return (
										<div
											className={styles.cmd}
											id={key.toLowerCase()}
										>
											<button
												className={styles.cmdB}
												onClick={() => {
													if (!currCmd || currCmd.title !== key) {
														sDA(true);
														sCC({
															...commandsByCategory[cat][key],
															title: key,
															category: cat
														});
														sCI(`~${key.toLowerCase()} `)
														sCD(null);
														sPE(null);
														sL(false);
													}
												}}
											>
												{key}
											</button>
										</div>
									)
								})}
							</li>
						</IsVisible>
					)
				})}
			</ol>
			<div className={[
				styles.remains,
				doAnim && 'fadeInUp'
			].join(' ')}>
				{currCmd && 
					<>
						<h6 className={styles.tCmdCat}>
							<button
								className={styles.tCmdCatB}
								onClick={() => {
									document.getElementById(currCmd.category.toLowerCase())?.scrollIntoView({
										behavior: 'smooth'
									});
								}}
							>
								{currCmd.category}
							</button>
						</h6>
						<h1 className={styles.tCmdHeader}>{currCmd.title}</h1>
						<h2 className={styles.aliases}>[[ aka {currCmd.aliases.join(', ')} ]]</h2>
						<p className={styles.desc}>
							{currCmd.description}
						</p>
						<p className={styles.usage}>
							Usage: ~{currCmd.title.toLowerCase()} {currCmd.usage}
						</p>
						<div className={styles.outputwrap}>
						<div
							className={[
								styles.inpWrapper
							].join(' ')}
						>
							<input
								className={styles.inp}
								value={commandInput}
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									sCI(
										e.currentTarget.value.startsWith('~' + currCmd.title.toLowerCase()) ?
											e.currentTarget.value :
											'~' + currCmd.title.toLowerCase() + (
												e.currentTarget.value.startsWith(
													'~' +
													currCmd.title.toLowerCase().substring(0, currCmd.title.length-1)
												)
												? ''
												: e.currentTarget.value
											)
									);
								}}
								onKeyPress={(e) => {
									if (e.key !== 'Enter') {
										return;
									}
									e.preventDefault();
									doCommand();
								}}
							/>
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
								opacity: (procError || loading || !cData) ? 0.6 : 1
							}}>
								{cData && 
									<DiscordMessage
										data={cData}
									/>
								}
							</div>
						</div>
					</div>
					
					</>
				}
			</div>
		</div>
	)
}