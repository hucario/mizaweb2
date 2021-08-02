import React from "react";

import Embed, { EmbedData } from './embed/embed'
import MessageMeta from './meta'
import md from './markdown/md'
import messageStyles from './messagestyles.module.css'

export type MessageData = {
	content: string,
	embed?: EmbedData,
	embeds?: Array<EmbedData>
}

export default function Message(props: {
	data: MessageData,
	style?: React.CSSProperties
}) {
	let data = props.data

	if (!data || !(data instanceof Object) || (!data.content && !data.embed && !data.embeds)) {
		return <></>
	}

	data.content = data.content ?? "";

	let currDate = new Date()
	let dateStr = `Today at ${
		currDate.getHours()%12 === 0 ? 12 : currDate.getHours()%12 
	}:${
		(
			currDate.getMinutes().toString().length < 2 ?
			"0" + currDate.getMinutes() :
			currDate.getMinutes()
		)
	} ${
		currDate.getHours()<12?"AM":"PM"
	}`
	
	let embeds: EmbedData[];

	embeds = data.embeds ?? (
		data.embed ? [data.embed] : undefined
	) ?? []
	
	for (let i = 0; i < embeds.length; i++) {
		let embed = embeds[i];
		if (!embed) {
			continue;
		}
		let keys = Object.keys(embed);
		if (keys.length === 2 && keys.includes('url') && keys.includes('image') && embed.image?.url) {
			// is just an image
			embeds[i] = {
				images: [
					{
						url: embed.url,
						image: {
							url: embed.image.url
						}
					}
				]
			}
		}
	}

	let embedElems = [];
	for (let embed of embeds) {
		embedElems.push(
			<Embed
				data={embed}
			/>
		)
	}

	return (
		<div
			className={[
				'hideext',
				messageStyles.message,
				messageStyles.cozyMessage,
				messageStyles.groupStart,
				messageStyles.wrapper,
				messageStyles.cozy,
				messageStyles.zalgo
			].join(' ')} 
			role="listitem" 
			tabIndex={-1}
			style={props.style}
		>
			<MessageMeta
				avatar="/logo256.png"
				name="Miza"
				color="#cfb2dc"
				bot={true}
				time={dateStr}
			/>
			<div 
				className={messageStyles.contents} 
				role="document"
			>
				<div
					className={[messageStyles.markup, messageStyles.messageContent].join(' ')}
				>
					{md(data.content)}
				</div>
			</div>
			<div className={messageStyles.container} >
				{embedElems}
			</div>
		</div>
	)
}
