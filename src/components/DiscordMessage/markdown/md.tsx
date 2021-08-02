import SimpleMarkdown from 'simple-markdown'
import codeBlock from './rules/codeblock'
// @ts-ignore
import Twemoji from 'react-twemoji'
import React from 'react'
const rules = {
	...SimpleMarkdown.defaultRules,
	fence: codeBlock,
	codeBlock: codeBlock
}

const rawBuiltParser = SimpleMarkdown.parserFor(rules);

const parse2 = (source: string) => {
	var blockSource = source + "\n\n";
	return rawBuiltParser(blockSource, {inline: false});
};

const output = SimpleMarkdown.outputFor(rules, 'react')


export default function render(str: string, twopts: Twemoji.twprops = {}) {
	if (!str || str.length === 0) {
		return <></>
	}
	return <Twemoji {...twopts}>
		{output(parse2(str))}
	</Twemoji>
}