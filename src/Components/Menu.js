import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends React.Component {
	render() {
		return (
			<div id="menu">
				<ul>
					<li>
						<NavLink to="/jornais" activeClassName="active" onlyActiveOnIndex>Ver jornais</NavLink>
					</li>
					<li>
						<NavLink to="/noticia" activeClassName="active" onlyActiveOnIndex>Criar notícia</NavLink>
					</li>
					<li>
						<NavLink to="/redacao" activeClassName="active" onlyActiveOnIndex>Redação</NavLink>
					</li>
				</ul>
			</div>
		);
	}
}