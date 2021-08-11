import { IOptions, RecursivePartial } from "tsparticles";

const cogsconfig = {
	background: {
	  color: {
		value: "#323031"
	  },
	  size: "cover",
	  opacity: 0
	},
	fullScreen: {
	  enable: true,
	  zIndex: 1
	},
	particles: {
	  move: {
		angle: {
		  offset: -20,
		  value: -20
		},
		attract: {
		  rotate: {
			x: 600,
			y: 1200
		  }
		},
		direction: "right",
		enable: true,
		path: {},
		outModes: {
		  bottom: "out",
		  left: "out",
		  right: "out",
		  top: "out",
		  default: "out"
		},
		speed: 1,
		spin: {}
	  },
	  number: {
		value: 10
	  },
	  opacity: {
		animation: {
		  speed: 1,
		  minimumValue: 0.1
		}
	  },
	  rotate: {
		random: {
		  enable: true,
		  minimumValue: 30
		},
		value: {
		  min: 10,
		  max: 30
		},
		animation: {
		  enable: true,
		  speed: 10
		}
	  },
	  shape: {
		options: {
		  image: {
			height: 32,
			replace_color: true,
			src: "https://cdn.discordapp.com/attachments/751992387684794512/873356413219520562/gear2.png",
			width: 32
		  },
		  images: {
			height: 32,
			replace_color: true,
			src: "https://cdn.discordapp.com/attachments/751992387684794512/873356413219520562/gear2.png",
			width: 32
		  }
		},
		type: ["image", "images"]
	  },
	  size: {
		random: {
		  enable: true,
		  minimumValue: 20
		},
		value: {
		  min: 15,
		  max: 20
		}
	  }
	},
	pauseOnBlur: true,
	pauseOnOutsideViewport: true,
}  as RecursivePartial<IOptions>

export default cogsconfig;