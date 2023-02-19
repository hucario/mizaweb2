import { useEffect, useRef, useState} from "react";
import styles from './mpinsights.module.css'
import {
	Chart,
	registerables
} from 'chart.js'
import 'chartjs-adapter-date-fns';
import { enUS as en } from 'date-fns/locale';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables);
Chart.register(zoomPlugin);
// TODO: Implement mpinsights with charts.js

type mizaCharts = {
    current: {
        active_users: number,
        average_playtime: number,
        live_users: number,
        total_playtime: number,
        total_use_time: number,
        total_users: number
    },
    historical: {
        active_users: [
            number[], // datapoints
            number // number of datapoints
        ],
        average_playtime: [
            number[], // datapoints
            number // number of datapoints
        ],
        live_users: [
            number[], // datapoints
            number // number of datapoints
        ],
        total_playtime: [
            number[], // datapoints
            number // number of datapoints
        ],
        total_use_time: [
            number[], // datapoints
            number // number of datapoints
        ],
        total_users: [
            number[], // datapoints
            number // number of datapoints
        ],
		[key: string]: [
			number[],
			number
		]
    }
}


export default function MPInsightsPage() {
	const [data, sD] = useState<null | mizaCharts>(null)
	const [myChart, setMyChart] = useState<null | HTMLCanvasElement[]>(null);
	const parentRef = useRef<null | HTMLDivElement>(null);
	useEffect(() => {
		document.title = "MizaPlayer Insights"
		return () => {
			document.title = "Miza";
		}
	}, [])
	useEffect(() => {
		(async() => {
			let a = await fetch("https://mizabot.xyz/api_mpinsights", {
				"headers": {
					"accept": "application/json",
				},
				"method": "GET",
				"mode": "cors",
				"credentials": "omit"
			})
			let theData: mizaCharts = await a.json();
			sD(theData);

			let labels = Object.keys(theData.historical);

			let timeChart = document.createElement('canvas');
			timeChart.width = window.innerWidth / 2;
			timeChart.height = window.innerWidth / 4;
			timeChart.classList.add(styles.chart)
			let ctx = timeChart.getContext('2d');
			if (!ctx) {
				return;
			}
			let { historical } = theData;
			console.log(historical);
			let start = Date.now() - (60 * 60 * 1000 * historical.total_use_time[1]);
			new Chart(ctx, {
				type: 'line',
				data: {
					labels: historical.total_playtime[0].map((_e, i) => {
						return i;
					}),
					datasets: labels.slice(3).map((label, e) => {
						return {
							label: label.split('_').map(e => [e[0].toUpperCase(), ...e.slice(1)].join('')).join(' '),
							data: theData.historical[label][0].map((e, i) => {
								return {
									x: start + (i * 60 * 60 * 1000),
									y: Math.floor(e)
								}
							}),
							tooltip: {
								callbacks: {
									label: function(context: any) {
										var label = context.dataset.label || '';
				
										if (label) {
											label += ': ';
										}
										if (context.parsed.y !== null) {
											let x = (Math.floor((context.parsed.y/(60*60))*100)/100).toString();
											label += (
												x.split('.')[0] + '.' + x.split('.').slice(1).join('') + '0'.repeat(2 - x.split('.').slice(1).join('').length)
											) + ' hours';
										}
										return label;
									}
								}
							},
							borderWidth: 3,
							fill: false,
							borderColor: [
								'rgb(255, 99, 132)',
								'rgb(54, 162, 235)'
							][e],
							pointRadius: 0,
						}
					})
				},
				options: {
					layout: {
						padding: 20
					},
					spanGaps: true,
					parsing: false,
					interaction: {
						mode: 'nearest',
						axis: 'x',
						intersect: false
					},
					indexAxis: 'x',
					animation: false,
					plugins: {
						decimation: {
							enabled: true,
							algorithm: 'min-max',
						},
						zoom: {
							pan: {
								enabled: true,
								mode: 'xy'
							},
							limits: {
								x: {
									min: start - 3600000,
									max: Date.now() + 36000000,
								},
								y: {
									min: 'original',
									max: 'original'
								}
							},
							zoom: {
								wheel: {
									enabled: true
								},
								pinch: {
									enabled: true
								}
							}
						}
					},
					scales: {
						y: {
							type: 'linear',
							ticks: {
								callback: (str => Math.floor(Number(str) / 3600) + ' hours'),
								autoSkip: true
							}
						},
						x: {
							adapters: {
								date: {
									locale: en
								}
							},
							type: 'time',
							min: start,
							max: Date.now(),
							ticks: {
								source: 'auto',
								// Disabled rotation for performance
								maxRotation: 0,
								autoSkip: true,
							}
						}
					}
				}
			});
			let usersChart = document.createElement('canvas');
			usersChart.width = window.innerWidth / 2;
			usersChart.height = window.innerWidth / 4;
			usersChart.classList.add(styles.chart)
			let ctx2 = usersChart.getContext('2d');
			if (!ctx2) {
				return;
			}

			new Chart(ctx2, {
				type: 'line',
				data: {
					labels: historical.total_playtime[0].map((_e, i) => {
						return i;
					}),
					datasets: labels.slice(0, 3).map((label, e) => {
						return {
							label: label.split('_').map(e => [e[0].toUpperCase(), ...e.slice(1)].join('')).join(' '),
							data: theData.historical[label][0].map((e, i) => {
								return {
									x: start + (i * 60 * 60 * 1000),
									y: Math.floor(e)
								}
							}),
							tooltip: {
								callbacks: {
									label: function(context: any) {
										var label = context.dataset.label || '';
				
										if (label) {
											label += ': ';
										}
										if (context.parsed.y !== null) {
											label += context.parsed.y + ' users';
										}
										return label;
									}
								}
							},
							borderWidth: 2,
							fill: false,
							tension: 0.1,
							borderColor: [
								'rgb(255, 99, 132)',
								'rgb(54, 162, 235)',
								'rgb(153, 102, 255)'
							][e],
							pointRadius: 0,
						}
					})
				},
				options: {
					layout: {
						padding: 20
					},
					spanGaps: true,
					parsing: false,
					interaction: {
						mode: 'nearest',
						axis: 'x',
						intersect: false
					},
					indexAxis: 'x',
					animation: false,
					plugins: {
						decimation: {
							enabled: true,
							algorithm: 'min-max'
						},
						zoom: {
							pan: {
								enabled: true,
								mode: 'xy'
							},
							limits: {
								x: {
									min: start - 3600000,
									max: Date.now() + 36000000,
								},
								y: {
									min: 'original',
									max: 'original'
								}
							},
							zoom: {
								wheel: {
									enabled: true
								},
								pinch: {
									enabled: true
								}
							}
						}
					},
					scales: {
						y: {
							type: 'linear',
							ticks: {
								callback: (str => str + ' users'),
								autoSkip: true
							}
						},
						x: {
							adapters: {
								date: {
									locale: en
								}
							},
							type: 'time',
							min: start,
							max: Date.now(),
							ticks: {
								source: 'auto',
								// Disabled rotation for performance
								maxRotation: 0,
								autoSkip: true,
							}
						}
					}
				}
			});

			setMyChart([
				timeChart,
				usersChart
			]);
		})()
	}, [])
	useEffect(() => {
		if (!parentRef.current || !myChart || myChart.length === 0) {
			return;
		}
		myChart.forEach(e => {
			if (parentRef.current) {
				parentRef.current.appendChild(e)
			}
		})
	}, [parentRef, myChart])
	return (
		<div className={styles.vcenter}>
			<div className={styles.hcenter}>
				<div className={styles.group}>
					<div style={{paddingTop: '25px'}}>MP Insights</div>
					<div className={styles.chartholder} ref={parentRef} />
				</div>
			</div>
		</div>
	)
}