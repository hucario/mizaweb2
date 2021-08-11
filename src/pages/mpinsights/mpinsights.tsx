import {useEffect, useState} from "react";
import styles from './mpinsights.module.css'
import {
	Chart
} from 'chart.js'
let canvId = Math.floor(Math.random()*0xFFFFFF).toString(16);
// TODO: Implement mpinsights with charts.js
export default function MPInsightsPage() {
	const [data, sD] = useState<null | any>(null)
	useEffect(() => {
		document.title = "MizaPlayer Insights"
		return () => {
			document.title = "Miza";
		}
	}, [])
	useEffect(() => {

	})
	return (
		<div className={styles.vcenter}>
			<div className={styles.hcenter}>
				<div className={styles.group}>
					MP Insights
					<canvas
						id={canvId}
						className={styles.canv}
					/>
				</div>
			</div>
		</div>
	)
}