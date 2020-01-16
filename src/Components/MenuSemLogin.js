import React from 'react';
import { NavLink } from 'react-router-dom';

export default class MenuSemLogin extends React.Component {
	render() {
		return (
			<div id="menu">
				<ul>
					<li>
						<NavLink to="/jornais" activeClassName="active" onlyActiveOnIndex>Jornais</NavLink>
					</li>
				</ul>
			</div>
		);
	}
}