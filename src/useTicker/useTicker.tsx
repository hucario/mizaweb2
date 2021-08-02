import { useEffect, useRef, useState } from "react";
// Uses code from https://stackoverflow.com/a/16994725/11726576
const useTicker = ({
	start,
	end,
	duration,
	started
}: {
	start: number,
	end: number,
	duration: number,
	started?: boolean
}) => {

	let [startedE, doStartF] = useState<boolean>(started ?? false);
	let [curr, setCurr] = useState<number>(start);
	const timer = useRef<number | null>(null);

	useEffect(() => {
		if (startedE && !timer.current) {
			let range = end - start;
			let minTimer = 1;
			let stepTime = Math.abs(Math.floor(duration / range));
			
			stepTime = Math.max(stepTime, minTimer);
			
			let startTime = Date.now();
			let endTime = startTime + duration;

			timer.current = window.setInterval(() => {
				let now = Date.now();
				let remaining = Math.max((endTime - now) / duration, 0);
				let value = Math.round(end - (remaining * range));

				setCurr(value);

				if (value >= end && timer.current) {
					clearInterval(timer.current);
				}
			}, stepTime);
		} else if (!startedE && timer.current) {
			window.clearInterval(timer.current);
			timer.current = null;
		}
	}, [startedE, end, duration, start])

	const pause = () => {
		doStartF(false);
	}
	const stop = () => {
		pause();
		setCurr(start);
	}

	return {
		curr,
		set: setCurr,
		pause,
		stop,
		start: () => { doStartF(true) }
	}
};

export default useTicker;