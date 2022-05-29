export type numberStoredAsString = string;

export type mizaCommand = {
	aliases: string[],
	description: string,
	usage: string,
	level: numberStoredAsString,
	rate_limit: numberStoredAsString,
	timeout: numberStoredAsString
}

export type helpJSONStruc = {
	[category: string]: {
		[commandName: string]: mizaCommand
	}
}

export type commandsRefKinda = {
	current: helpJSONStruc | null,
	effects: ((current?: commandsRefKinda['current']) => any)[],
	setEffectCB: (cb: (current?: commandsRefKinda['current']) => any) => void,
	set: (to: helpJSONStruc | null) => void
}

const commands: commandsRefKinda = {
	current: null,
	effects: [],
	setEffectCB(cb) {
		this.effects.push(cb);
	},
	set(to) {
		this.current = to;
		this.effects.forEach((e) => {
			e(this.current);
		})
	}
}

fetch('https://mizabot.xyz/static/HELP.json').then(e => e.json()).then((e: helpJSONStruc) => {
	commands.set(e);
})

export default commands;