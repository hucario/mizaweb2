import { useEffect, useState } from "react";
import { CodeBlock } from "../../components/DiscordMessage/markdown/code/CodeBlock";

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
		dl: string,
		type: "FILE" | "LINK",
		original_url?: string
	} | null>(null)
	const [previewTxt, setPVT] = useState<string | null>(null)
	const [forceLang, sFL] = useState<string | null>(null);

	useEffect(() => {
		(async() => {
			let res = await fetch('https://mizabot.xyz/fileinfo/' + props.match.params.id)
			let data = await res.json();
			data.type = 'FILE';

			if (data.original_url) {
				data.type = "LINK";
			}

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
	useEffect(() => {
		if (details) {
			if (details.type === 'LINK') {
				document.title = 'Miza: URL';
			} else {
				document.title = "Miza: " + details?.filename
			}
		} else {
			document.title = "Miza: Files"
		}
		return () => {
			document.title = "Miza";
		}
	}, [details])
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
	if (details.type === 'LINK') {
		return (
			<div className={sty.vcenter}>
				<div className={sty.hcenter}>
					<div className={sty.group}>
						<h1 className={sty.filename}>
						<a target="_self" href={details.raw}>{details.raw}</a>
						</h1>
						<h2 className={sty.mime} style={{
							fontSize: '1.2rem'
						}}>
							<a target="_self" href={details.original_url}>{details.original_url}</a>
						</h2>
						<h4 className={sty.size}>
							[[ redirect: {Number(details.id).toString(16)} ]]
						</h4>
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
					<h2 className={sty.size}>
						{document.URL.split('?', 1)[0]}
					</h2>
					<h4 className={sty.size}>
						{formatBytes(details.size)}
					</h4>
					<h5 className={sty.mime}>
						{details.mimetype}
					</h5>
				</div>
				{details.mimetype.includes('image') && details.size < 268435456 /* 10mb */ &&
					<div className={sty.imggroup}>
						<img src={details.raw} className={sty.previewImg} alt={details.filename} />
						<h6 className={sty.id}>
							[[ {details.id} ]]
						</h6>
					</div>
				}
				{details.mimetype.includes('video') &&
					<div className={sty.videogroup}>
						<video controls autoPlay loop className={sty.previewVideo}>
							<source src={details.dl}
									type={details.mimetype} />
							Sorry, your browser doesn't support this type of file.
						</video>
						<h6 className={sty.id}>
							[[ {details.id} ]]
						</h6>
					</div>
				}
				{details.mimetype.includes('audio') &&
					<div className={sty.audiogroup}>
						<audio controls autoPlay loop className={sty.previewAudio}>
							<source src={details.dl}
									type={details.mimetype} />
							Sorry, your browser doesn't support this type of file.
						</audio>
						<h6 className={sty.id}>
							[[ {details.id} ]]
						</h6>
					</div>
				}
				{previewTxt &&
					<CodeBlock
						language={forceLang ?? (
							details.filename.split('.')[details.filename.split('.').length-1]
						)}
						content={previewTxt.substring(0, 10000) + (
							previewTxt.length > 10000 ? '...' : ''
						)} 
					/>
				}
				<ul className={sty.group}>
					<li>
						<a href={details.dl} download className={sty.link + ' hideext'}>Download</a>
					</li>
					<li>
						<a href={details.raw} className={sty.link + ' hideext'}>View</a>
					</li>
					{document.URL.split('?', 2)[1] &&
						<li>
							<a href={'/files/' + details.raw.split('/f/', 2)[1] + "?" + document.URL.split('?', 2)[1]} className={sty.link + ' hideext'}>Edit</a>
						</li>
						// <>
							// <li>
								// <form id="editor" action={'/edit/' + details.raw.split('/f/', 2)[1] + "?" + document.URL.split('?', 2)[1]}>
									// <label htmlFor="uploader" style={{textDecoration:'underline'}}>Edit</label>
									// <input id="uploader" type="file" name="file" onChange={e => e!.target!.form!.submit()} hidden></input>
								// </form>
							// </li>
							// <li>
								// <a href={'/delete/' + details.raw.split('/f/', 2)[1] + "?" + document.URL.split('?', 2)[1]} className={sty.link + ' hideext'}>Delete</a>
							// </li>
						// </>
					}
				</ul>
			</div>
		</div>
	)
}