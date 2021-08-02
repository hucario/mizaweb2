import React from 'react'
import embedStyles from '../messagestyles.module.css'

export default function EmbedFooter(props: {
	icon?: string,
	text?: string,
	time?: string
}) {
	return (<div 
			className={[embedStyles.footer, embedStyles.margin].join(' ')}
		>
			{ props.icon && 
				<img 
					alt="" 
					className={embedStyles.footerIcon} 
					src={props.icon}
				/>
			}
		<span 
			className={embedStyles.footerText}
		>
			{props.text}
			{props.text && props.time && 
				<span 
					className={embedStyles.footerSeparator}
				>•</span>
			}
			{props.time}
		</span>
	</div>)
}