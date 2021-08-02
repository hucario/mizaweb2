import { MouseEvent, MouseEventHandler } from "react";

import embedStyles from '../messagestyles.module.css'

const prevent: MouseEventHandler = (e: MouseEvent) => {
	e.preventDefault();
}


const range = (start: number, end?: number, step = 1) => {
	if (typeof end === 'undefined') {
		end = start;
		start = 0;
	}
	end = end as number;
	let therange = end - start;
	let output = [];
	for (let i = 0; i <= therange; i += step) {
		output.push(i - Math.abs(start))
	}
	return output;
}

export default function EmbedGallery(props: {
	imgs?: Array<{
		url?: string,
		image: {
			url: string
		}
	}>
}) {
	if (!props.imgs || props.imgs.length === 0) {
		return <></>
	}
	let imgs = props.imgs.slice(0, 3);

	if (imgs.length === 2 || imgs.length === 3 || imgs.length === 4) {
		return (<div 
			className={embedStyles.galleryImagesWrapper}
			style={{
				height: "300px"	
			}}
			onClick={prevent}
		>
			{range(Math.floor(imgs.length / 2) - 1).map(e => {
				return (
					<div className={embedStyles.gallerySide} >
						{range(imgs.length === 3 ? e : 1).map((i) => {
							return (
								<a
									className={[
										embedStyles.anchor,
										embedStyles.anchorUnderlineOnHover,
										embedStyles.imageWrapper,
										embedStyles.imageZoom,
										embedStyles.clickable,
										embedStyles.embedWrapper
									].join(' ')}
									tabIndex={0}
									href={imgs[(e * (imgs.length-2)) + i].url} 
									rel="noreferrer noopener" 
									target="_blank" 
									role="button" 
									style={{
										width: "221px",
										height: "221px"
									}}
								>
									<img 
										className={embedStyles.galleryImageElement} 
										alt="" 
										src={imgs[(e * (imgs.length-2)) + i].image.url}
									/>
								</a>
							)
						})}
					</div>
				)
			})}
		</div>)
	}
	if (imgs.length === 1) {
		return (<a 
			onClick={prevent}
			className={[
				embedStyles.anchor,
				embedStyles.anchorUnderlineOnHover,
				embedStyles.imageWrapper,
				embedStyles.imageZoom,
				embedStyles.clickable,
				embedStyles.embedWrapper
			].join(' ')}
			tabIndex={0}
			href={imgs[0].url} 
			rel="noreferrer noopener" 
			target="_blank" 
			role="button" 
			style={{
				width: "221px",
				height: "221px"
			}}
		><img 
			className={embedStyles.galleryImageElement}
			alt="" 
			src={imgs[0].image.url}
		/></a>)
	}

	// Should never happen, but to make ts not bug out:
	return <div />
}