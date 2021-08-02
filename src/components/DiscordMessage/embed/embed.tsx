import React from 'react'
import EmbedHeader from './header'
import EmbedGallery from './gallery'
import EmbedFooter from './footer'
import md from '../markdown/md'
import embedStyles from '../messagestyles.module.css'

function toHexColor(num: number) {
    let x = Number(num).toString(16);
    while (x.length < 6) {
        x = "0" + x;
    }
    return "#" + x;
}

export type EmbedData = {
	color?: number,
	thumbnail?: {
		url: string
	},
	fields?: {
		name: string,
		value: string
	}[],
	author?: {
		name: string,
		url?: string,
		icon_url?: string
	},
	title?: string,
	url?: string,
	description?: string,
	images?: {
		url?: string,
		image: {
			url: string
		}
	}[],
	image?: {
		url: string
	}
	footer?: {
		text?: string,
		icon_url?: string
	},
	timestamp?: string
};

export default function Embed(props: {
	data: EmbedData
}) {
	let fields = [];
	if (props.data.fields) {
		let df = props.data.fields;
		let fkeys = 0;
		for (let i = 0; i < df.length; i++) {
			fields.push(
				<div key={fkeys++}
					className={embedStyles.field} 
				>
					<div 
						key={fkeys++}
						className="embedFieldName"
					>
						{df[i].name}
					</div>
					<div
						key={fkeys++}
						className="embedFieldValue"
					>
						{md(df[i].value)}
					</div>
				</div>
			)
		}
	}
	return (
		<div 
			className={[
				embedStyles.embWrapper,
				embedStyles.full,
				embedStyles.embed,
				embedStyles.markup
			].join(' ')} 
			aria-hidden="false" 
			style={{
				borderColor: (
					props.data.color ? toHexColor(props.data.color): "#FFFFFF"
				)
			}}
		>
			<div 
				className={[
					embedStyles.grid,
					props.data.thumbnail && embedStyles.hasThumbnail
				].join(' ')}
			>
				{props.data.author &&
					<EmbedHeader
						name={props.data.author?.name}
						link={props.data.author?.url}
						icon={props.data.author?.icon_url}
					/>
				}
				{props.data.title && 
					<div 
						className={[
							embedStyles.title,
							embedStyles.margin
						].join(' ')}
					>
						{props.data.url && 
							<a 
								className={[
									embedStyles.anchor,
									embedStyles.anchorUnderlineOnHover,
									embedStyles.titleLink,
									embedStyles.link,
									embedStyles.title
								].join(' ')} 
								tabIndex={0}
								href={props.data.url}
								rel="noreferrer noopener"
								target="_blank"
								role="button"
							>
								{props.data.title}
							</a>
						}
						{!props.data.url && props.data.title}
					</div>
				}
				{props.data.description && 
					<div 
						className={[
							embedStyles.description,
							embedStyles.margin
						].join(' ')}
					>
						{md(props.data.description)}
					</div>
				}
				<div 
					className={embedStyles.fields}
				>
					{fields}
				</div>
				<EmbedGallery
					imgs={props.data.image ? [{
						url: props.data.image.url,
						image: {
							url: props.data.image.url
						}
					}] : props.data.images}
				/>
				{props.data.thumbnail && 
					<a 
						className={[
							embedStyles.anchor,
							embedStyles.anchorUnderlineOnHover,
							embedStyles.imageWrapper,
							embedStyles.imageZoom,
							embedStyles.clickable,
							embedStyles.thumbnail
						].join(' ')} 
						tabIndex={0}
						href={props.data.thumbnail.url}
						rel="noreferrer noopener" 
						target="_blank" 
						role="button" 
						style={{
							width: "80px",
							height: "80px"
						}}
					>
						<img 
							alt="" 
							src={props.data.thumbnail.url} 
							style={{
								width: "80px",
								height: "80px"
							}}
						/>
					</a>
				}
				<EmbedFooter 
					text={props.data.footer?.text}
					icon={props.data.footer?.icon_url}
					time={props.data.timestamp}
				/>
			</div>
		</div>
	)
}