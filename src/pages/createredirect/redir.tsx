import { useEffect, useState } from 'react'
import { Redirect, RouteChildrenProps} from 'react-router-dom'
import styles from './redir.module.css'

export default function RedirPage(props: RouteChildrenProps) {
	const [inpVal, sIV] = useState('');
	const [loading, sL] = useState(false);
	const [redir, sR] = useState<null | string>(null);
	useEffect(() => {
		document.title = 'Miza: create redirect'
		return () => {
			document.title = 'Miza'
		}
	}, [])
	const doRedir = async () => {
		if (!inpVal.startsWith('http')) {
			return;
		}
		let d = new FormData();
		d.set('url', inpVal);
		d.set('code', '308')
		d.set('ftype', '1')
		let res = await fetch('http://i.mizabot.xyz/forward', {
			method: 'POST',
			mode: window.location.hostname.includes('mizabot.xyz') ? 'same-origin' : 'cors',
			body: d
		})
		sR(res.url.split('/').slice(-1)[0]);
	}
	if (redir) {
		return (
			<Redirect
				to={'/file/' + redir}
			/>
		)
	}
	return (
		<div className={styles.vcenter}>
			<div className={styles.hcenter}>
				<div className={styles.group}>
					<input
						value={inpVal}
						className={styles.inp}
						onChange={(e) => {
							if (!e.currentTarget.value.startsWith('http') && e.currentTarget.value.length !== 0) {
								return;
							}
							sIV(e.currentTarget.value);
						}}
						placeholder={window.location.protocol + 
							'//' + 
							window.location.host + 
							'/createredirect/'
						}
						onKeyPress={(e) => {
							if (e.key !== 'Enter') {
								return;
							}
							e.preventDefault();
							doRedir();
						}}
					/>
				</div>
				<div className={styles.group}>
					<button
						className={styles.cr}
						onClick={doRedir}
						disabled={!inpVal.startsWith('http')}
					>
						create redirect
					</button>
				</div>
			</div>
		</div>
	)
}