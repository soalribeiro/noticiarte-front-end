import React from 'react';
import { NavLink } from 'react-router-dom';

export default class BotoesJornal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idjornal: this.props.jornal
        };
    }

    render() {
        return (
            <div id="botoesJornal">
                <NavLink to={"/ativrecente/" + this.state.idjornal} activeClassName="activeBotaoJornal" onlyActiveOnIndex>Atividade Recente</NavLink>
                <NavLink to={"/jornalnot/" + this.state.idjornal} activeClassName="activeBotaoJornal" onlyActiveOnIndex>Notícias</NavLink>
                <NavLink to={"/editoria/" + this.state.idjornal} activeClassName="activeBotaoJornal" onlyActiveOnIndex>Editoria</NavLink>
                <NavLink to={"/conviterecebido/" + this.state.idjornal} activeClassName="activeBotaoJornal" onlyActiveOnIndex>Convites</NavLink>
            </div>
        );
    }
}