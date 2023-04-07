import React, {  useEffect, useRef, useState } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'
import { CodeBlock } from "../../components/DiscordMessage/markdown/code/CodeBlock";

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
	useEffect(() => {
		document.title = "Miza: File Upload"
		return () => {
			document.title = "Miza";
		}
	})
	const [previewTxt, setPVT] = useState<string | null>(null)
	const [forceLang, sFL] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);
	const [redirecteyboi, sR] = useState<null | string>(null);
	const [loading, sL] = useState(false);
	const [errored, sE] = useState(false);
	const fileRef = useRef<File | undefined>(undefined);
	const fiRef = useRef<HTMLInputElement | null>(null);
	const history = useHistory();
	var progs = [0];
	var progf = [false];
	const [launched, setL] = useState(false);

	const upload_chunk = (file: File, fname: string, i: number, start: number, end: number) => {
		let blob = file.slice(start, end);
		let xhr = new XMLHttpRequest();
		let size = end - start;
		xhr.upload.onprogress = ((e) => {
			progs[i] = e.loaded;
			let loaded = 0;
			for (let n of progs) {
				loaded += n;
			}
			setProgress(loaded / file.size * 100);
		});
		xhr.onreadystatechange = function() {
			if(this.readyState === 4 && launched) {
				progs[i] = size;
				progf[i] = true;
				let finished = true;
				for (let n of progf) {
					if (!n) {
						finished = false;
						break;
					}
				}
				if (finished) {
					merge(file, progs.length);
				}
			}
		};
		xhr.onerror = () => {
			progs[i] = 0;
			progf[i] = false;
			console.log("Retrying chunk " + i);
			upload_chunk(file, fname, i, start, end);
			// sE(true);
		}
		xhr.open('POST', 'https://mizabot.xyz/upload_chunk', true);

		xhr.setRequestHeader("X-File-Name", fname);             // custom header with filename and full size
		xhr.setRequestHeader("X-File-Size", size + '');
		xhr.setRequestHeader("X-Total", file.size + '');
		xhr.setRequestHeader("X-Index", i + '');
		xhr.send(blob);
		return xhr;
	}
	const upload = () => {
		let file = fileRef.current;
		if (!file || typeof file === 'undefined') {
			return;
		}
		sL(true);
		sE(false);
		setL(false);
		const chunk = 83886080;
		progs.length = 0;
		progf.length = 0;
		var fname = encodeURIComponent(file.name);
		(function split_file(i) {
			if (i >= 8 && progs[i - 8] < chunk) {
				setTimeout(function() {
					split_file(i);
				}, 4000);
				return;
			}
			let start = i * chunk;
			let end = start + chunk;
			if (end > file.size) end = file.size;
			progs.push(0);
			progf.push(false);
			console.log("Sending chunk " + i);
			upload_chunk(file, fname, i, start, end);
			if (end < file.size) {
				setTimeout(function() {
					split_file(i + 1);
				}, 250);
			}
			else {
				setL(true);
			}
		})(0);
	}
	const merge = (file: File, index: number) => {
		if (!file) return;
		if (!progf.length) return;
		progs.length = 0;
		progf.length = 0;
		let xhr = new XMLHttpRequest();
		let fd = new FormData();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				history.push(xhr.responseText.replace('/p/', '/file/'));
				// sR(xhr.responseText.replace('/p/', '/file/'))
				window.location.reload();
			}
		}
		xhr.onerror = () => {
			sE(true);
		}

		fd.append("Name", file.name);
		fd.append("X-File-Name", encodeURIComponent(file.name));
		fd.append("Total", file.size + '');
		fd.append("Index", index + '');

		if (document.URL.split("?", 2)[1]) {
			xhr.open("PATCH", "https://mizabot.xyz/edit/" + document.URL.split("/files/", 2)[1], true);
		}
		else {
			xhr.open("POST", "https://mizabot.xyz/merge", true);
		}
		xhr.send(fd);
	}
	const deleteFile = () => {
		if (!window.confirm("This action will irreversibly delete the file, and all links will become obsolete.")) {
			return;
		}
		history.push('/delete/' + document.URL.split("/files/", 2)[1]);
		window.location.reload();
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
						<span
							className={sty.prog}
							style={{
								color: errored ? 'red' : 'white'
							}}
						>
							{errored ? "Error" : Math.floor(progress) + '%'}
						</span>
						<svg
							width="120"
							height="120"
						>
							<circle
								className={sty.ring2}
								style={{
									strokeDasharray: `${circumference} ${circumference}`,
									strokeDashoffset: circumference - ((errored ? 100 : progress) / 100) * circumference
								}}
								stroke={errored ? "red" : "white"}
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
			<div
				className={sty.vcenter}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(ev) => {
					ev.preventDefault();
					let file;
					if (ev.dataTransfer.items) {
						for (let i = 0; i < ev.dataTransfer.items.length; i++) {
							if (ev.dataTransfer.items[i].kind === 'file') {
								let f = ev.dataTransfer.items[i].getAsFile();
								if (f) {
									file = f;
									break;	
								}
							}
						}
					} else {
						// Use DataTransfer interface to access the file(s)
						file = ev.dataTransfer.files[0];
					}
					if (!file) {
						return;
					}
					fileRef.current = file;
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
			>
				<div className={sty.hcenter}>
					<div className={sty.fileInputHolder}>
						{document.URL.split("?", 2)[1]?.split("=", 1)[0] == "key" ?
							<>
								<h2>
									*You are about to edit the file {document.URL.split('/files/', 2)[1].split('?', 1)[0]}. This edit will be immediate and permanent.
								</h2>
								<h1 className={sty.up}>
									Upload file, <Link to={'/createredirect/' + document.URL.split('/files/', 2)[1]}>create redirect</Link>
									, or <a style={{textDecoration:'underline'}} onClick={() => {console.log('bye');deleteFile()}}>delete</a>
								</h1>
							</> :
							<h1 className={sty.up}>
								Upload file or <Link to="/createredirect/">create redirect</Link>
							</h1>
						}
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
									fileRef.current = file;
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
						<video controls loop className={sty.previewVideo}>
							<source src={details.url}
									type={details.mimetype} />
							Sorry, your browser doesn't support this type of file.
						</video>
					</div>
				}
				{details.mimetype.includes('audio') &&
					<div className={sty.audiogroup}>
						<audio controls loop className={sty.previewAudio}>
							<source src={details.url}
									type={details.mimetype} />
							Sorry, your browser doesn't support this type of file.
						</audio>
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
				<div className={sty.group}>
					<button
						onClick={() => {
							console.log('hi');
							upload();
						}}
						className={sty.uploadButton}
					>
						Upload
					</button>
				</div>
			</div>
		</div>
	)
}