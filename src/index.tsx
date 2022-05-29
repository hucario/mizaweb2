import React from 'react';
import ReactDOM from 'react-dom'

import App from './app';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

(async () => {
	let loader = document.getElementById('loader');
	const SIM_LOAD_TIME = 500;
	if (loader) {
		// @ts-expect-error TS can't find this - it's set in the HTML file
		let LOAD_START_TIME = (window.LOAD_START_TIME ?? Date.now()) as number;

		console.log(`Took ${Date.now() - LOAD_START_TIME}ms to load scripts. Starting render...`)

		if ((LOAD_START_TIME + SIM_LOAD_TIME >= Date.now())) {
			await new Promise(res => setTimeout(res, LOAD_START_TIME + SIM_LOAD_TIME  - (Date.now())))
		}
		loader.addEventListener('transitionend', () => {
			if (!loader) {
				// this should never happen, but typescript doesn't like me
				return;
			}
			loader.style.display = 'none';
		})
		setTimeout(() => {
			if (!loader) {
				return;
			}
			loader.style.display = 'none'; // for some reason, sometimes transitionend doesn't work
		}, 250)
		loader.style.opacity = '0';
	}
})()