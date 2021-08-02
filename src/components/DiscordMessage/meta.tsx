import messageStyles from './messagestyles.module.css'

export default function MessageMeta(props: {
	avatar: string,
	name: string,
	bot: boolean,
	time: string,
	color?: React.CSSProperties['color']
}) {
	return (<>
		<img 
			src={props.avatar} 
			aria-hidden="true" 
			className={[
				messageStyles.avatar,
				messageStyles.clickable
			].join(' ')} 
			alt=""
		/>
		<h2 
			className={messageStyles.header}
		>
			<span 
				className={messageStyles.headerText}
			>
				<span 
					className={[
						messageStyles.username,
						messageStyles.clickable
					].join(' ')}
					style={{color: props.color}}
					aria-expanded="false" 
					role="button" 
					tabIndex={0}
				>
					{props.name}
				</span>
				{props.bot && (
					<span 
						className={[
							messageStyles.botTagCozy,
							messageStyles.botTag,
							messageStyles.botTagRegular,
							messageStyles.botTag,
							messageStyles.rem
						].join(' ')}
					>
						<span className="botText">BOT</span>
					</span>)
				}
			</span>
			<span className={messageStyles.timestamp}>
				<span aria-label={props.time}>
					{props.time}
				</span>
			</span>
		</h2>
	</>)
}