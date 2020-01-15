import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Noticia extends React.Component {
    constructor() {
        super();
        this.state = {
            id_user: sessionStorage.getItem('id_user'),
            jornais: null
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/userjornais/' + this.state.id_user)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    jornais: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {

        if (!this.state.jornais) {
            return (
                <div>
                    <h1>Notícia</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            )
        } else {
            if (this.state.jornais.length > 0) {
                const jornal = this.state.jornais.map((jornal, i) => {
                    return (
                        <Link key={'link' + i} to={{
                            pathname: "/escolhertiponot", state: {
                                idjornal: jornal.id
                            }
                        }} className="escolheJornal">
                            <div key={'content' + i} className="content">
                                <h3 key={'titulo' + i}>{jornal.jornal.nome_jornal}</h3>
                                <p key={'p' + i}>{jornal.jornal.descricao}</p>
                            </div>
                        </Link>
                    );
                });

                return (
                    <div>
                        <h1>Notícia</h1>
                        <div id="notDiv">
                            <h4>Criar notícia</h4>
                            <p>Seleciona o jornal para o qual pretendes escrever uma notícia.</p>
                        </div>
                        <div id="todosJornais">
                            {jornal}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h1>Notícia</h1>
                        <div>
                            <p>Ainda não tem jornais.</p>
                            <Link to="/jornal">
                                <button>Criar Jornal</button>
                            </Link>
                        </div>
                    </div>
                );
            }
        }
    }
}