import embedStyles from '../messagestyles.module.css'
export default function EmbedHeader(props: {
	icon?: string,
	link?: string,
	name?: string
}) {
	return (
		<div 
			className={[embedStyles.author, embedStyles.margin].join(' ')}
		>
			{props.icon && 
				<img 
					alt="" 
					className={embedStyles.authorIcon} 
					src={props.icon}
				/>
			}
			{props.link && 
				<a 
					className={[
						embedStyles.anchor,
						embedStyles.anchorUnderlineOnHover,
						embedStyles.authorNameLink,
						embedStyles.link,
						embedStyles.authorName
					].join(' ')} 
					tabIndex={0} 
					href={props.link}
					rel="noreferrer noopener" 
					target="_blank" 
					role="button"
				>
					{props.name}
				</a>
			}
			{!props.link && 
				<span className={embedStyles.authorName}>
					{props.name}
				</span>
			}
		</div>
	)
}