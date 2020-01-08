import React from 'react';
import { NavLink } from 'react-router-dom';

const isActive = (path, match, location) => !!(match || path === location.pathname);

export default class Menu extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		return (
			<div id="menu">
				<ul>
					<li>
						<NavLink to="/jornais" activeClassName="active" onlyActiveOnIndex>Jornal</NavLink>
					</li>
					<li>
						<NavLink to="/noticia" activeClassName="active" onlyActiveOnIndex>Notícia</NavLink>
					</li>
					<li>
						<NavLink to="/redacao" activeClassName="active" onlyActiveOnIndex>Redação</NavLink>
					</li>
				</ul>
			</div>
		);
	}
}