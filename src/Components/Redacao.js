import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import redacao from '../images_app/redacao_vazia.png';

export default class Redacao extends React.Component {
    constructor() {
        super();
        this.state = {
            jornais: null,
            id_user: sessionStorage.getItem('id_user')
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/userjornais/' + this.state.id_user)
            .then((response) => {
                this.setState({
                    jornais: response.data
                })
                console.log(response.data);
            });
    }

    render() {
        if (!this.state.jornais) {
            return (
                <div>
                    <h1>Redação</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            if (this.state.jornais.length > 0) {
                let jornais = this.state.jornais.map((jornal, index) => {
                    return (
                        <div className="meusJornais">
                            <div id="outrosJornais" style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${jornal.jornal.imagem_jornal})` }}></div>
                            <div className="infosJornal">
                                <h4 key={'h4' + index}>{jornal.jornal.nome_jornal}</h4>
                                <p key={'pdescr' + index}>{jornal.jornal.descricao}</p>
                                <p key={'role' + index} class="nomeRoleJornal">{jornal.role.name}</p>
                            </div>
                            <div className="botoesJornais">
                                <Link key={'link' + index} to={'/ativrecente/' + jornal.jornal.id}>
                                    <button className="entrar" key={'btn' + index}>Entrar</button>
                                </Link>

                                <Link key={'link' + index} to={'/atualijornal/' + jornal.jornal.id}>
                                    <button id="editJornal">Editar</button>
                                </Link>
                            </div>
                        </div>
                    );
                });

                return (
                    <div id="redacao">
                        <h1>Redação</h1>
                        <h4>Os meus jornais</h4>
                        <p id="notP">Aqui, na redação, podes ver os teus jornais ou jornais dos quais fazes parte.</p>
                        {jornais}
                    </div>
                );
            } else {
                return (
                    <div id="redacao">
                        <h1>Redação</h1>
                        <h4>Os meus jornais</h4>
                        <img src={redacao} />

                        <Link to="/criarjornais">
                            <button id="btnCriaJornal">Criar novo jornal</button>
                        </Link>
                    </div>
                );
            }
        }
    }
}