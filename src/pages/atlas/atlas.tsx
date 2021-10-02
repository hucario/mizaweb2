 import DiscordMessage from '../../components/DiscordMessage'
import { RouteChildrenProps } from 'react-router-dom'
import styles from './atlas.module.css'
import commandsByCategory, { mizaCommand } from '../../commands'
import IsVisible from '../../components/IsVisible'
import React, { useEffect, useState } from 'react'
import { MessageData } from '../../components/DiscordMessage/DiscordMessage'

let catimages = new Map([
	['MAIN', '/main.svg'],
	['STRING', '/string.svg'],
	['ADMIN', '/admin.svg'],
	['VOICE', '/voice.svg'],
	['IMAGE', '/image.svg'],
	['FUN', '/upside_down.svg'],
	['OWNER', '/owner.svg'],
	['NSFW', '/nsfw.svg'],
	['MISC', '/misc.svg']
])

let commandsByName: {
	[key: string]: namedMizaCommand
} = {};

interface namedMizaCommand extends mizaCommand {
	title: string,
	category: string,
	name: string
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
	const [forceRerender, sFRR] = useState<any>(null)
	useEffect(() => {}, [forceRerender])
	if (!commandsByCategory.effects.includes(sFRR)) {
		commandsByCategory.setEffectCB(sFRR)
	}
	useEffect(() => {
		document.title = "Mizatlas" + (
			currCmd?.title ? ': ' + currCmd.title : ''
		)
		return () => {
			document.title = "Miza";
		}
	})
	let cmd = props.match?.params.command;
	const updateCommandsByName = () => {
		if (!commandsByCategory.current) {
			return;
		}
		for (let key in commandsByCategory.current) {
			for (let cmd in commandsByCategory.current[key]) {
				commandsByName[cmd.toLowerCase()] = {
					...commandsByCategory.current[key][cmd],
					category: key,
					name: cmd
				} as namedMizaCommand;
			}

		}
		if (props.match?.params?.command && !currCmd) {
			if (commandsByName[props.match?.params?.command?.toLowerCase()]) {
				sCC({
					...commandsByName[props.match.params.command.toLowerCase()],
					title: commandsByName[props.match.params.command.toLowerCase()].name,
					category: commandsByName[props.match.params.command.toLowerCase()].category,
				})
				sCI('~' + commandsByName[props.match.params.command.toLowerCase()].name.toLowerCase())
			} else if (catimages.get(props.match.params.command.toUpperCase())) {
				document.getElementById(props.match.params.command.toLowerCase())?.scrollIntoView({
					behavior: 'smooth'
				});
			}
		}
	}
	if (!commandsByCategory.effects.includes(updateCommandsByName)) {
		commandsByCategory.setEffectCB(updateCommandsByName);
	}

	const scrollIntoViewBoye = () => {
		if (!commandsByCategory.current) {
			return;
		}
		if (commandsByCategory.current[(cmd ?? '').toUpperCase()]) {
			document.getElementById((cmd ?? '').toLowerCase())?.scrollIntoView({
				behavior: 'smooth'
			});
		}
	}
	useEffect(scrollIntoViewBoye, [cmd])
	if (!commandsByCategory.effects.includes(scrollIntoViewBoye)) {
		commandsByCategory.setEffectCB(scrollIntoViewBoye);
	}
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
		<div className={`${styles.page} hideext`}>
			<div className={styles.leftestnav}>
				{commandsByCategory.current && Object.keys(commandsByCategory.current).map(key => {
					return (
						<a
							onClick={(e) => {
								e.preventDefault();
								window.history.replaceState(null, `Miza: ${key}`, `/atlas/${key.toLowerCase()}`)
								document.getElementById(key.toLowerCase())?.scrollIntoView({
									behavior: 'smooth'
								});
							}}
							href={`/atlas/${key.toLowerCase()}`}
							target="_self"
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
						</a>
					)
				})}
			</div>
			<ol className={styles.leftnav}>
				{commandsByCategory.current && Object.keys(commandsByCategory.current).map(cat => {
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
								{commandsByCategory.current && Object.keys(commandsByCategory.current[cat]).map((key) => {
									return (
										<div
											className={styles.cmd}
											id={key.toLowerCase()}
										>
											<a
												className={styles.cmdB}
												href={`/atlas/${key.toLowerCase()}`}
												target="_self"
												onClick={(e) => {
													e.preventDefault();
													window.history.replaceState(null, `Miza: ${key}`, `/atlas/${key.toLowerCase()}`)
													if ((!currCmd || currCmd.title !== key) && commandsByCategory.current) {
														sDA(true);
														sCC({
															...commandsByCategory.current[cat][key],
															title: key,
															category: cat,
															name: key
														});
														sCI(`~${key.toLowerCase()} `)
														sCD(null);
														sPE(null);
														sL(false);
													}
												}}
											>
												{key}
											</a>
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
							<a
								className={styles.tCmdCatB}
								href={`/atlas/${currCmd.category.toLowerCase()}`}
								onClick={(e) => {
									e.preventDefault();
									document.getElementById(currCmd.category.toLowerCase())?.scrollIntoView({
										behavior: 'smooth'
									});
									window.history.replaceState(null, `Miza: ${currCmd.category.toLowerCase()}`, `/atlas/${currCmd.category.toLowerCase()}`)
								}}
								target="_self"
							>
								{currCmd.category}
							</a>
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
								{!cData && 
									<button className={styles.usage} onClick={() => { doCommand(); }}>
										Run
									</button>
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