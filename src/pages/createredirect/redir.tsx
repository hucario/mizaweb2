import { useEffect, useState } from 'react'
import { Redirect, RouteChildrenProps} from 'react-router-dom'
import styles from './redir.module.css'

export default function RedirPage(props: RouteChildrenProps) {
	const [loading, sL] = useState(false);
	const [redir, sR] = useState<null | string>(null);
	useEffect(() => {
		document.title = 'Miza: create redirect'
		return () => {
			document.title = 'Miza'
		}
	}, [])
	const doRedir = async () => {
		let urls: string[] = [];
		for (var e of document.getElementsByName("inputs")) {
			var e2 = e as HTMLInputElement;
			var url = e2!.value;
			if (!url || !url.startsWith("http")) continue;
			urls.push(url);
		}
		if (!urls) return;
		let d = new FormData();
		d.set('urls', JSON.stringify(urls));
		d.set('code', '307')
		d.set('ftype', '1')
		let res = await fetch('https://mizabot.xyz/forward', {
			method: 'POST',
			mode: window.location.hostname.includes('mizabot.xyz') ? 'same-origin' : 'cors',
			body: d
		})
		sR(res.url.split('/').slice(-1)[0]);
	}
	const maybeRedir = (e: any) => {
		if (e!.key == "Enter") doRedir();
	}
	if (redir) {
		return (
			<Redirect
				to={'/file/' + redir}
			/>
		)
	}
	function addField() {
		var newbox = document.createElement("input");
		newbox.setAttribute("type", "text");
		newbox.setAttribute("name", "inputs");
		newbox.setAttribute("class", styles.inp);
		newbox.setAttribute("onKeyPress", "maybeRedir");
		var contains = document.getElementById("contains");
		if (!contains) return;
		contains!.appendChild(document.createElement("br"));
		contains!.appendChild(newbox);
	}
	return (
		<div className={styles.vcenter}>
			<div className={styles.hcenter}>
				<div className={styles.group} id="contains">
					<input
						className={styles.inp}
						placeholder={window.location.protocol + 
							'//' + 
							window.location.host + 
							'/createredirect/'
						}
						onKeyPress={(e) => {
							if (e.key == 'Enter') doRedir()
						}}
					/>
				</div>
				<div className={styles.group}>
					<button
							className={styles.cr}
							onClick={addField}
						>
							Add URL
					</button>
					<button
						className={styles.cr}
						onClick={doRedir}
					>
						Create redirect
					</button>
				</div>
			</div>
		</div>
	)
}