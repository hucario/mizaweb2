import { useEffect, useState } from "react";
import CodeBlock from "../../components/DiscordMessage/markdown/components/codeblock";

import sty from './filedetails.module.css'

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function FileDetails(props: {
	match: any
}) {
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState<{
		id: string /* numberlike */,
		filename: string /* includes ext */,
		ttl: number /* in seconds */,
		size: number, /* in bytes */
		mimetype: string,
		raw: string,
		dl: string
	} | null>(null)
	const [previewTxt, setPVT] = useState<string | null>(null)
	const [forceLang, sFL] = useState<string | null>(null);

	useEffect(() => {
		(async() => {
			let res = await fetch('http://i.mizabot.xyz/fileinfo/' + props.match.params.id)
			let data = await res.json();
			setDetails(data);
			setLoading(false);
			if (data.mimetype.includes('text') || data.mimetype.includes('script')) {
				let pvt = await fetch(data.dl);
				let pvtt = await pvt.text();
				setPVT(pvtt)
				if (pvtt.startsWith('<svg')) {
					sFL('xml');
				}
			}
		})()
	}, [props.match.params.id])
	
	if (loading) {
		return (
			<div className={sty.vcenter}>
				<div className={sty.hcenter}>
					<div className={sty.group}>
						<h1 className={sty.errorCode}>
							Loading...
						</h1>
					</div>
				</div>
			</div>
		)
	}

	if (!details) {
		return (
			<div className={sty.vcenter}>
				<div className={sty.hcenter}>
					<div className={sty.group}>
						<h1 className={sty.errorCode}>
							File not found
						</h1>
						<p className={sty.desc}>
							The file you're looking for either never existed (you entered the wrong id) or has expired (which is unlikely).
						</p>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div className={sty.vcenter}>
			<div className={sty.hcenter}>
				<div className={sty.group}>
					<h1 className={sty.filename}>
						{details.filename}
					</h1>
					<h4 className={sty.size}>
						{formatBytes(details.size)}
					</h4>
					<h5 className={sty.mime}>
						{details.mimetype}
					</h5>
				</div>
				{details.mimetype.includes('image') && details.size < 10485760 /* 10mb */ &&
					<div className={sty.imggroup}>
						<img src={details.raw} className={sty.previewImg} alt={details.filename} />
						<h6 className={sty.id}>
							[[ {details.id} ]]
						</h6>
					</div>
				}
				{details.mimetype.includes('video') &&
					<div className={sty.videogroup}>
						<video controls autoPlay muted loop className={sty.previewVideo}>
							<source src={details.raw}
									type={details.mimetype} />
							Sorry, your browser doesn't support this type of file.
						</video>
						<h6 className={sty.id}>
							[[ {details.id} ]]
						</h6>
					</div>
				}
				{previewTxt &&
					<CodeBlock
						className={[
							sty.previewTxt,
							'hljs-' + forceLang ?? (
								details.filename.split('.')[details.filename.split('.').length-1]
							)
						].join(' ')}
						preCN={sty.preCN}
					>
						{previewTxt.substring(0, 10000) + (
							previewTxt.length > 10000 ? '...' : ''
						)}
					</CodeBlock>
				}
				<ul className={sty.group}>
					<li>
						<a href={details.dl} download className={sty.link + ' hideext'}>download</a>
					</li>
					{(details.mimetype.includes('image') || details.mimetype.includes('text') || details.mimetype.includes('video')) && 
						<li>
							<a href={details.raw} className={sty.link + ' hideext'}>view raw</a>
						</li>
					}
				</ul>
			</div>
		</div>
	)
}