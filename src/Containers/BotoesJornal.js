import React from 'react';
import { NavLink } from 'react-router-dom';

export default class BotoesJornal extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div id="botoesJornal">
                <NavLink to="/ativrecente" activeClassName="activeBotaoJornal" onlyActiveOnIndex>Atividade Recente</NavLink>
                <NavLink to="/jornalnot" activeClassName="activeBotaoJornal" onlyActiveOnIndex>Notícias</NavLink>
                <NavLink to="/editoria" activeClassName="activeBotaoJornal" onlyActiveOnIndex>Editoria</NavLink>
                <NavLink to="/convites" activeClassName="activeBotaoJornal" onlyActiveOnIndex>Convites</NavLink>
            </div>
        );
    }
}