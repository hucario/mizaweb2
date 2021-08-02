import React, {  useRef, useState } from "react";
import { Redirect } from 'react-router-dom'
import CodeBlock from "../../components/DiscordMessage/markdown/components/codeblock";

import sty from './fileupload.module.css'

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



export default function FileDetails() {
	const [details, setDetails] = useState<{
		id: string /* numberlike */,
		filename: string /* includes ext */,
		size: number, /* in bytes */
		mimetype: string,
		data: File,
		url: string
	} | null>(null)
	const [previewTxt, setPVT] = useState<string | null>(null)
	const [forceLang, sFL] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);
	const [redirecteyboi, sR] = useState<null | string>(null);
	const [loading, sL] = useState(false);
	const fiRef = useRef<HTMLInputElement | null>(null);

	const upload = () => {
		let file = fiRef.current?.files?.[0];
		if (!file) {
			return;
		}
		sL(true);
		let xhr = new XMLHttpRequest();
		xhr.upload.onprogress = function(e) {
			setProgress((e.loaded / e.total) * 100);
		};
		xhr.onreadystatechange = function(e) {
			if(this.readyState === 4) {
				merge(file);
			}
		};
		xhr.open('POST', 'http://i.mizabot.xyz/upload_chunk', true);
		
		xhr.setRequestHeader("X-File-Name", file.name);             // custom header with filename and full size
		xhr.setRequestHeader("X-File-Size", file.size + '');
		xhr.send(file);
	}
	const merge = (file?: File) => {
		if (!file) {
			return;
		}
		let xhr = new XMLHttpRequest();
		let fd = new FormData();
	
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				sR(xhr.responseText.replace('/p/', '/file/'))
			}
		}
	
		fd.append("name", file.name);
		fd.append("index", '0');
	
		xhr.open("POST", "http://i.mizabot.xyz/merge", true);
		xhr.send(fd);
	}
	if (redirecteyboi) {
		return (
			<Redirect to={redirecteyboi} />
		)
	}

	let radius = 50;
	let circumference = radius * 2 * Math.PI;
	
	if (loading) {
		return (
			<div className={sty.vcenter}>
				<div className={sty.hcenter}>
					Uploading
					<div className={sty.rel}>
						<span className={sty.prog}>{Math.floor(progress)}%</span>
						<svg
							width="120"
							height="120"
						>
							<circle
								className={sty.ring2}
								style={{
									strokeDasharray: `${circumference} ${circumference}`,
									strokeDashoffset: circumference - (progress / 100) * circumference
								}}
								stroke="white"
								stroke-width="4"
								fill="transparent"
								r="50"
								cx="60"
								cy="60"	
							/>
						</svg>
					</div>
				</div>
			</div>
		)
	}
	if (!details) {
		return (
			<div className={sty.vcenter}>
				<div className={sty.hcenter}>
					<div className={sty.fileInputHolder}>
						<h1 className={sty.up}>Upload file</h1>
						<label className={sty.file}>
							<input
								type="file"
								className={sty.fileInput}
								onChange={(fileInput) => {
									if (!fileInput) {
										return;
									}
									fiRef.current = fileInput.currentTarget;

									let file = fileInput.currentTarget.files?.[0];
									console.log(file);
									if (!file) {
										return;
									}
									setDetails({
										filename: file.name,
										mimetype: file.type,
										id: file.name,
										size: file.size,
										data: file,
										url: URL.createObjectURL(file)
									});
									if (file.type.includes('text') || file.type.includes('script') || file.type === 'application/json') {
										file.text().then((pvtt: string) => {
											setPVT(pvtt)
											if (pvtt.startsWith('<svg')) {
												sFL('xml');
											}
										})
									}
								}}
							/>
							<span className={sty.fileCustom}></span>
						</label>
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
				{details.mimetype.includes('image') &&
					<div className={sty.imggroup}>
						<img src={details.url} className={sty.previewImg} alt={details.filename} />
					</div>
				}
				{details.mimetype.includes('video') &&
					<div className={sty.videogroup}>
						<video controls autoPlay muted loop className={sty.previewVideo}>
							<source src={details.url}
									type={details.mimetype} />
							Sorry, your browser doesn't support this type of file.
						</video>
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
				<div className={sty.group}>
					<button
						onClick={() => {
							console.log('hi');
							upload();
						}}
						className={sty.uploadButton}
					>
						upload
					</button>
				</div>
			</div>
		</div>
	)
}