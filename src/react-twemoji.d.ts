import twemoji from 'twemoji'
declare module 'react-twemoji' {
	export default function Twemoji(twprops: twprops): JSX.Element;
	export type twprops = {
		options: twemoji.ParseObject,
		noWrapper: boolean,
		tag: string
	}
}
