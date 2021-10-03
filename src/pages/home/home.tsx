import React, { useEffect } from 'react'
import IsVisible from '../../components/IsVisible'
import useTicker from '../../useTicker'
import Particles from "react-tsparticles";

import particleOptions from './particlesconfig';
import leavesconfig from './leavesconfig'

import styles from './home.module.css'
import cogsconfig from './cogsconfig1';
import cogsconfig2 from './cogsconfig2';

function MultiPorpoise() {
	return (<span className={styles.porpoise}>
		multip<span
			className={styles.serious}
		>u</span><span
			className={styles.nahlmao}
		>o</span>rpo<span 
		className={styles.nahlmao}
		>i</span>se<span 
		className={styles.nahlmao}
		> </span><span className={styles.icon}>🐬</span>
	</span>)
}

const range = (start: number, end?: number, step = 1) => {
	if (typeof end === 'undefined') {
		end = start;
		start = 0;
	}
	end = end as number;
	let therange = end - start;
	let output = [];
	for (let i = 0; i <= therange; i += step) {
		output.push(i - Math.abs(start))
	}
	return output;
}

interface customWidth extends React.CSSProperties {
		'--width': number
}

function Orbitals() {
	return (<div className={styles.orbitals}>
		{range(5).map(e => {
			return (
				<img
					key={e}
					className={styles.orbital}
					style={{
						animationDelay: -e*4 + 's'
					}}
					alt='Orbital'
					src='/upside_down.svg'
				/>
			)
		})}
	</div>)
}
function Orbi2() {
	return (<div className={[styles.orbitals, styles.orbs2].join(' ')}>
		{range(5).map(e => {
			return (
				<img
					key={e}
					className={styles.orbital}
					style={{
						animationDelay: -e*4 + 's'
					}}
					alt='Orbital'
					src='/star.svg'
				/>
			)
		})}
	</div>)
}

export default function HomePage() {
	const {
		curr,
		start,
		stop
	} = useTicker({
		start: 0,
		end: 350,
		duration: 750,
		started: false
	})
	let width = (curr > 0 ? 1 : 0);
	useEffect(() => {
		document.title = "Miza: a multipurpose Discord bot"
	})
	return (
	<div>
	<IsVisible
		classNames={{
			visible: styles.bigOpac,
			invisible:  styles.activePorpoise
		}}
		minShown={47}
	>
		<div className={[styles.hcenter, styles.slide1].join(' ')}>
			<Orbitals />
			<Orbi2 />
				<div className={[styles.vcenter, styles.vcfull].join(' ')}>
					<div className={styles.holder}>
						<IsVisible
							classNames={{
								visible: styles.slideIn,
								invisible: styles.isOut
							}}
							sticky
						>
							<div className={styles.left}>
								<img
									src="/logo512.png"
									alt="Miza's avatar"
									className={[styles.mizaImg, styles.slider].join(' ')}
								/>
							</div>
						</IsVisible>
						<div className={styles.right}>
							<h1 className={styles.name}>Miza</h1>
							<p className={styles.exp}>is a <MultiPorpoise /> discord bot</p>
						</div>
					</div>
				</div>
			</div>
		</IsVisible>
		<IsVisible
			classNames={{
				visible: styles.nomoreblur,
				invisible: styles.yeahblur
			}}
			minShown={50}
		>
			<div className={[styles.hcenter, styles.rel, styles.slide2].join(' ')}>
				<img src="/veryprofessionalserver.png" alt="Miza's Very Professional Server" className={styles.coolImgBro} />
				<img src="/monitor.png" alt="Miza's Very Professional Monitor" className={[styles.coolImgBro, styles.monitor].join(' ')} />
				<Particles
					id="sparkles"
					options={particleOptions}
				/>
				<div className={[styles.vcenter, styles.vc2].join(' ')}>
					<IsVisible
						classNames={{
							visible: styles.slideIn,
							invisible: styles.isOut
						}}
						sticky
					>
						<div className={styles.holder}>
							<div className={[styles.coolTextBro, styles.slider].join(' ')}>
								<h2 className={styles.coolHeadingBro}>Built for speed</h2>
								<p>Built in Python, Miza is a multipurpose Discord bot, fashioned after the character 'Misery' from the platformer game Cave Story.<br /><br />
She quickly branched out into all the areas you'd desire in a server, with careful attention to efficiency, performance, quality, and reliability. All commands are quick and responsive... except for downloading hundreds of items at a time. That may take you a while!<br /><br />
Above all else, Miza aims to provide users with a smooth, reliable and unique Discord experience, but the general premise for Miza is: 'If other bots can do it, Miza should be able to do it too.'</p>
							</div>
						</div>
					</IsVisible>
				</div>
			</div>
		</IsVisible>
		<IsVisible
			classNames={{
				visible: styles.nomoreblur,
				invisible: styles.yeahblur
			}}
			evts={{
				visible: start,
				invisible: stop
			}}
			stickyEvt
			minShown={70}
		>
			<div className={[styles.hcenter, styles.rel, styles.slide3].join(' ')}>
				<div className={[styles.vcenter, styles.vc3].join(' ')}>
					<div
						className={styles.bars} 
						style={{
							'--width': width * 1.05
						} as customWidth} 
					>
						{range(20).map((e) => {
							return (<div
								key={e}
								className={styles.bar}
								style={{
									width: Math.floor(Math.pow(.8, e)*100) + '%',
									height: Math.floor(Math.pow(.8, e) * 100)/50 + 'vw',
									backgroundColor: `hsl(${Math.floor(Math.floor((e / 14) * 100)/100 * 365)}deg, 100%, 50%)`
								}} 
							/>)
						})}
					</div>
					<div
						className={[styles.bars, styles.bars2].join(' ')} 
						style={{
							'--width': width * 1.05
						} as customWidth} 
					>
						{range(20).reverse().map((e) => {
							return (<div
								key={e}
								className={styles.bar}
								style={{
									width: Math.floor(Math.pow(.8, e)*100) + '%',
									height: Math.floor(Math.pow(.8, e) * 100)/50 + 'vw',
									backgroundColor: `hsl(${Math.floor(Math.floor((e / 14) * 100)/100 * 365)}deg, 100%, 50%)`
								}} 
							/>)
						})}
					</div>
					<IsVisible
						classNames={{
							visible: styles.slideIn,
							invisible: styles.isOut
						}}
						minShown={70}
						sticky
					>
						<div className={styles.holder}>
							<div className={[styles.coolTextBro, styles.slider].join(' ')}>
								<h2 className={styles.coolHeadingBro}>Versatile</h2>
								<p>
									All of Miza's commands are easily accessible and manageable, with permission levels assignable on a user/role basis, as well as command category enabling/disabling at will. <br /><br />
									Sporting features from every category, Miza is capable of suiting just about anyone's needs, from standard text commands, game features, moderating features, image features, roleplay features, and more.<br /><br />Remember, you can disable anything you please, so you can have Miza suit any one of them if that's what you want!
								</p>
							</div>
						</div>
					</IsVisible>
				</div>
			</div>
		</IsVisible>
		<IsVisible
			classNames={{
				visible: styles.nomoreblur,
				invisible: styles.yeahblur
			}}
			minShown={50}
		>
			<div className={[styles.hcenter, styles.rel, styles.slide4].join(' ')}>
				<Particles
					id="cogs1"
					options={cogsconfig}
				/>
				<Particles
					id="cogs2"
					options={cogsconfig2}
				/>
				<div className={[styles.vcenter, styles.vc2].join(' ')}>
					<IsVisible
						classNames={{
							visible: styles.slideIn,
							invisible: styles.isOut
						}}
						minShown={70}
						sticky
					>
						<div className={styles.holder}>
							<div className={styles.left}>
								<img
									src="/mizawrench.png"
									className={styles.mizaImg}
									alt="handy miza :)"
								/>
							</div>
							<div className={[styles.coolTextBro, styles.slider].join(' ')}>
								<h2 className={styles.coolHeadingBro}>Maintained</h2>
								<p>Miza is constantly getting updated by <a href="https://github.com/thomas-xin">Thomas Xin,</a> with a crew at hand for any questions, feature requests or bug reports you may have.<br /><br />
								Find a bug? Let us know and it'll usually be fixed within a day or few!
								</p>
							</div>
						</div>
					</IsVisible>
				</div>
			</div>
		</IsVisible>
		<IsVisible
			classNames={{
				visible: styles.nomoreblur,
				invisible: styles.yeahblur
			}}
			minShown={70}
		>
			<div className={[styles.hcenter, styles.rel, styles.slide5].join(' ')}>
				<img
					src="/mizaleaf.png"
					alt="Miza's doing Very Professional Things"
					className={[styles.coolImgBro, styles.mizaleaf].join(' ')}
				/>
				<Particles
					id="leaves"
					options={leavesconfig}
				/>
				<div className={[styles.vcenter, styles.vc2].join(' ')}>
					<IsVisible
						classNames={{
							visible: styles.slideIn,
							invisible: styles.isOut
						}}
						minShown={70}
						sticky
					>
						<div className={styles.holder}>
							<div className={[styles.coolTextBro, styles.slider, 'hideext'].join(' ')}>
								<h2 className={styles.center}>Get Miza now</h2>
								<div className={styles.ctas}>
									<a href="https://discordapp.com/oauth2/authorize?permissions=8&client_id=668999031359537205&scope=bot%20applications.commands" >
										Invite
									</a>
									<a href="https://discord.com/invite/cbKQKAr">
										Support server
									</a>
								</div>
							</div>
						</div>
					</IsVisible>
				</div>
			</div>
		</IsVisible>
	</div>
	)
}