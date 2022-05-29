import { IOptions, RecursivePartial } from "tsparticles";

const particlesConfig = {
	"fullScreen": {
		"enable": true,
		"zIndex": 1
	},
	"particles": {
		"number": {
			"value": 72,
			"density": {
				"enable": false,
				"value_area": 1341.5509907748635
			}
		},
		"color": {
			"value": "#7087f0"
		},
		"shape": {
			"type": "circle"
		},
		"opacity": {
			"value": 1,
			"random": true,
			"anim": {
				"enable": true,
				"speed": 1.5,
				"opacity_min": 0,
				"sync": false
			}
		},
		"size": {
			"value": 2.6,
			"random": true,
			"anim": {
				"enable": false,
				"speed": 4,
				"size_min": 0.3,
				"sync": false
			}
		},
		"move": {
			"enable": true,
			"speed": 0.5,
			"direction": "none",
			"random": true,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": false,
				"rotateX": 600,
				"rotateY": 600
			}
		}
	},
	"interactivity": {
		"detect_on": "window",
		"events": {
			"resize": true
		}
	},
	"retina_detect": true
} as RecursivePartial<IOptions>

export default particlesConfig;