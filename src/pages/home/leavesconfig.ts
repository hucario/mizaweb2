import { IOptions, RecursivePartial } from 'tsparticles'

const leavesConfig = {
	"autoPlay": true,
	"background": {
	"color": {
		"value": "#ffffff00"
	},
	"image": "",
	"position": "",
	"repeat": "",
	"size": "",
	"opacity": 0
	},
	"backgroundMask": {
	"composite": "destination-out",
	"cover": {
		"color": {
		"value": "#fff"
		},
		"opacity": 1
	},
	"enable": false
	},
	"fullScreen": {
		"enable": true,
		"zIndex": 1
	},
	"detectRetina": true,
	"duration": 0,
	"fpsLimit": 60,
	"interactivity": {
	"detectsOn": "window",
	"events": {
		"onClick": {
		"enable": false,
		"mode": "push"
		},
		"onDiv": {
		"selectors": [],
		"enable": false,
		"mode": [],
		"type": "circle"
		},
		"onHover": {
		"enable": true,
		"mode": "attract",
		"parallax": {
			"enable": false,
			"force": 60,
			"smooth": 10
		}
		},
		"resize": true
	},
	"modes": {
		"attract": {
			"distance": 100,
			"duration": 1,
			"easing": "ease-out-quad",
			"factor": 5,
			"maxSpeed": 5,
			"speed": 1
		},
	}
	},
	"manualParticles": [],
	"motion": {
	"disable": false,
	"reduce": {
		"factor": 4,
		"value": true
	}
	},
	"particles": {
	"bounce": {
		"horizontal": {
		"random": {
			"enable": false,
			"minimumValue": 0.1
		},
		"value": 1
		},
		"vertical": {
		"random": {
			"enable": false,
			"minimumValue": 0.1
		},
		"value": 1
		}
	},
	"collisions": {
		"bounce": {
		"horizontal": {
			"random": {
			"enable": false,
			"minimumValue": 0.1
			},
			"value": 1
		},
		"vertical": {
			"random": {
			"enable": false,
			"minimumValue": 0.1
			},
			"value": 1
		}
		},
		"enable": false,
		"mode": "bounce",
		"overlap": {
		"enable": true,
		"retries": 0
		}
	},
	"color": {
		"value": "#ffffff",
		"animation": {
		"h": {
			"count": 0,
			"enable": false,
			"offset": 0,
			"speed": 1,
			"sync": true
		},
		"s": {
			"count": 0,
			"enable": false,
			"offset": 0,
			"speed": 1,
			"sync": true
		},
		"l": {
			"count": 0,
			"enable": false,
			"offset": 0,
			"speed": 1,
			"sync": true
		}
		}
	},
	"destroy": {
		"mode": "none",
		"split": {
		"count": 1,
		"factor": {
			"random": {
			"enable": false,
			"minimumValue": 0
			},
			"value": 3
		},
		"rate": {
			"random": {
			"enable": false,
			"minimumValue": 0
			},
			"value": {
			"min": 4,
			"max": 9
			}
		},
		"sizeOffset": true
		}
	},
	"groups": {},
	"life": {
		"count": 0,
		"delay": {
		"random": {
			"enable": false,
			"minimumValue": 0
		},
		"value": 0,
		"sync": false
		},
		"duration": {
		"random": {
			"enable": false,
			"minimumValue": 0.0001
		},
		"value": 0,
		"sync": false
		}
	},
	"links": {
		"blink": false,
		"color": {
		"value": "#323031"
		},
		"consent": false,
		"distance": 150,
		"enable": false,
		"frequency": 1,
		"opacity": 0.4,
		"shadow": {
		"blur": 5,
		"color": {
			"value": "#00ff00"
		},
		"enable": false
		},
		"triangles": {
		"enable": false,
		"frequency": 1
		},
		"width": 1,
		"warp": false
	},
	"move": {
		"angle": {
		"offset": 30,
		"value": 0
		},
		"attract": {
		"distance": 200,
		"enable": false,
		"rotate": {
			"x": 600,
			"y": 1200
		}
		},
		"decay": 0,
		"distance": {},
		"direction": "right",
		"drift": 0,
		"enable": true,
		"gravity": {
		"acceleration": 9.81,
		"enable": false,
		"inverse": false,
		"maxSpeed": 50
		},
		"path": {
		"clamp": true,
		"delay": {
			"random": {
			"enable": false,
			"minimumValue": 0
			},
			"value": 0
		},
		"enable": false
		},
		"outModes": {
		"default": "out",
		"bottom": "out",
		"left": "out",
		"right": "out",
		"top": "out"
		},
		"random": false,
		"size": false,
		"speed": 2,
		"straight": false,
		"trail": {
		"enable": false,
		"length": 10,
		"fillColor": {
			"value": "#000000"
		}
		},
		"vibrate": false,
		"warp": false
	},
	"number": {
		"density": {
		"enable": false,
		"area": 1000,
		"factor": 100
		},
		"limit": 0,
		"value": 60
	},
	"opacity": {
		"random": {
		"enable": true,
		"minimumValue": 0.2
		},
		"value": 1,
		"animation": {
		"count": 0,
		"enable": false,
		"speed": 1,
		"sync": false,
		"destroy": "none",
		"minimumValue": 0.1,
		"startValue": "random"
		}
	},
	"orbit": {
		"animation": {
		"count": 0,
		"enable": false,
		"speed": 1,
		"sync": false
		},
		"enable": false,
		"opacity": 1,
		"rotation": {
		"random": {
			"enable": false,
			"minimumValue": 0
		},
		"value": 45
		},
		"width": 1
	},
	"reduceDuplicates": false,
	"repulse": {
		"random": {
		"enable": false,
		"minimumValue": 0
		},
		"value": 0,
		"enabled": false,
		"distance": 1,
		"duration": 1,
		"factor": 1,
		"speed": 1
	},
	"roll": {
		"darken": {
		"enable": false,
		"value": 0
		},
		"enable": false,
		"enlighten": {
		"enable": false,
		"value": 0
		},
		"speed": 25
	},
	"rotate": {
		"random": {
		"enable": true,
		"minimumValue": 20
		},
		"value": 0,
		"animation": {
		"enable": true,
		"speed": 0.2,
		"sync": false
		},
		"direction": "clockwise",
		"path": false
	},
	"shadow": {
		"blur": 0,
		"color": {
		"value": "#000000"
		},
		"enable": false,
		"offset": {
		"x": 0,
		"y": 0
		}
	},
	"shape": {
		"options": {
		"character": {
			"fill": false,
			"font": "Verdana",
			"style": "",
			"value": "*",
			"weight": "400"
		},
		"char": {
			"fill": false,
			"font": "Verdana",
			"style": "",
			"value": "*",
			"weight": "400"
		},
		"polygon": {
			"nb_sides": 5
		},
		"star": {
			"nb_sides": 5
		},
		"image": {
			"height": 32,
			"replace_color": true,
			"src": "/leaf.png",
			"width": 32
		},
		"images": {
			"height": 32,
			"replace_color": true,
			"src": "/leaf.png",
			"width": 32
		}
		},
		"type": "image"
	},
	"size": {
		"random": {
		"enable": false,
		"minimumValue": 1
		},
		"value": 16,
		"animation": {
		"count": 0,
		"enable": false,
		"speed": 40,
		"sync": false,
		"destroy": "none",
		"minimumValue": 0.1,
		"startValue": "random"
		}
	},
	"stroke": {
		"width": 0,
		"color": {
		"value": "#000000",
		"animation": {
			"h": {
			"count": 0,
			"enable": false,
			"offset": 0,
			"speed": 1,
			"sync": true
			},
			"s": {
			"count": 0,
			"enable": false,
			"offset": 0,
			"speed": 1,
			"sync": true
			},
			"l": {
			"count": 0,
			"enable": false,
			"offset": 0,
			"speed": 1,
			"sync": true
			}
		}
		}
	},
	"tilt": {
		"random": {
		"enable": false,
		"minimumValue": 30
		},
		"value": 0,
		"animation": {
		"enable": false,
		"speed": 0.2,
		"sync": false
		},
		"direction": "clockwise",
		"enable": false
	},
	"twinkle": {
		"lines": {
		"enable": false,
		"frequency": 0.05,
		"opacity": 1
		},
		"particles": {
		"enable": false,
		"frequency": 0.05,
		"opacity": 1
		}
	},
	"wobble": {
		"distance": 5,
		"enable": false,
		"speed": 50
	},
	"zIndex": {
		"random": {
		"enable": false,
		"minimumValue": 0
		},
		"value": 0,
		"opacityRate": 1,
		"sizeRate": 1,
		"velocityRate": 1
	}
	},
	"pauseOnBlur": false,
	"pauseOnOutsideViewport": false,
	"responsive": [],
	"themes": []
} as RecursivePartial<IOptions>

export default leavesConfig;