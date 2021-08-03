// https://github.com/highlightjs/highlight.js/issues/925#issuecomment-471272598

import React, { useEffect } from 'react';
import hljs from 'highlight.js';

import embedStyles from '../../messagestyles.module.css'
import codeblockStyles from './codeblockstyles.module.css'

export default function CodeBlock(props: {
	language?: string,
	children: string | Node | Node[],
	[key: string]: any
}) {
	let codeNode = React.useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (codeNode.current) {
			hljs.highlightElement(codeNode.current);
		}
	}, [props.language, props.children])

	let pr = {
		...props
	}
	delete pr.className;
	delete pr.preCN;
	delete pr.ref;


	const { language, children } = props;
	return <pre className={props.preCN}>
		<code
			ref={codeNode}
			className={[(language || codeblockStyles.code), embedStyles.block, language, props.className].join(' ')}
			{...pr}
		>{children}</code>
	</pre>;
}