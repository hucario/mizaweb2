import React, { useEffect, useRef } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useLocation
} from "react-router-dom";

import HomePage from './pages/home/'
import AtlasPage from './pages/atlas/'
import TesterPage from './pages/tester/'
import FileUploadPage from './pages/fileupload/'
import FileDetailsPage from './pages/filedetails/'
import CRedirPage from './pages/createredirect/'
import TimePage from './pages/time/'

import './appstyles.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function MizaApp() {
	const location = useLocation();
	const prevLoc = useRef(location.pathname);
	useEffect(() => {
		let pL = prevLoc.current;
		document.body.classList.add(
			'page' + (
				location.pathname === '/' ? '/landing' : location.pathname
			).replaceAll('/', '-').split('-').slice(0, 2).join('-')
		)
		setTimeout(() => {
			document.body.classList.remove(
				'page' + (
					pL === '/' ? '/landing' : prevLoc.current
				).replaceAll('/', '-').split('-').slice(0, 2).join('-')
			)
			prevLoc.current = location.pathname;
		}, 300)
	}, [location.pathname])
	return (
		<TransitionGroup>
			<CSSTransition
				key={location.key}
				classNames="navigation"
				timeout={600}
			>
				{() => {
					return (
						<section
							className={
								'will-navigate page' + (
									location.pathname === '/' ? '/landing' : location.pathname
								).replaceAll('/', '-').split('-').slice(0, 2).join('-')
							}
						>
							<base target="_blank" />
							<nav>
								<NavLink exact activeClassName="activeNav" className="hideext" to="/">Home</NavLink>
								<NavLink activeClassName="activeNav" className="hideext" to="/atlas">Atlas</NavLink>
								<NavLink activeClassName="activeNav" className="hideext" to="/tester">Tester</NavLink>
								<NavLink activeClassName="activeNav" className="hideext" to="/files">Files</NavLink>
								<a href="https://www.github.com/thomas-xin/miza">Code</a>
								<a href="https://discord.gg/cbKQKAr">Support</a>
							</nav>
							<Switch location={location}>
								<Route exact path="/" component={HomePage} />
								<Route path="/files" component={FileUploadPage} />
								<Route path="/file/:id" component={FileDetailsPage} />
								<Route path="/createredirect" component={CRedirPage} />
								<Route path="/atlas/:command?" component={AtlasPage} />
								<Route path="/tester" component={TesterPage} />
								<Route path="/time" component={TimePage} />
								<Route path=""><div>404 page</div></Route>
							</Switch>
							<footer>
								<div>
									miza.web 2
									<span className="sep" />
									made with ♥ and 🍝
									<span className="sep" />
									by <a href="https://github.com/hucario">hucario</a>
								</div>
							</footer>
						</section>
					)
				}}
			</CSSTransition>
		</TransitionGroup>
	)
}
export default function App() {
	return (<React.StrictMode>
		<Router>
			<MizaApp />
		</Router>
	</React.StrictMode>)
}