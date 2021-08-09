import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
					src='https://discord.com/assets/559c3311dcdb3f23b7fb745559207db9.svg'
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
					src='https://discord.com/assets/141d49436743034a59dec6bd5618675d.svg'
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
	let [commitCount, setCC] = useState<undefined | string | number>();
	useEffect(() => {
		if (commitCount) {
			return;
		}
		fetch(
			'https://api.github.com/repos/thomas-xin/miza/commits?since='
			+ (new Date(Date.now()-(1000 * 60 * 60 * 24 * 7))).toISOString().substring(0, 19) + 'Z'
		).then(b => b.json()).then(commits => {
			setCC(commits.length)
		}).catch(() => {
			setCC("{{ couldn't fetch commits, v sorry }}")
		})
	}, [commitCount])
	useEffect(() => {
		document.title = "Miza"
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
								<h2>Built for speed</h2>
								<p>Miza is written in Python and aggressively optimized. All commands are quick and responsive. Except for downloading youtube playlists with 100+ items. That takes a while.</p>
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
								<h2>Versatile</h2>
								<p>With <Link to="/atlas">over 350 commands</Link>, Miza will probably cover all your needs, which means <i>you</i> don't need to get several bots. </p>
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
								<h2>Maintained</h2>
								<p>Miza is constantly getting updated by <a href="https://github.com/thomas-xin">Thomas Xin.</a><br />
								{
									commitCount && commitCount > 2 && 
									<>
										<i>
											(There have been {commitCount} commits in the past week alone!)
										</i>
										<br />
									</>
								}
								If there's a bug it'll usually be fixed within a day.</p>
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
									<Link to="/docs/self-hosting">
										Self host
									</Link>
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