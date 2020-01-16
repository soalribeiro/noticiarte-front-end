import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
export default class VerPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.match.params.id,
            data: null,
            redirect: false
        };
    }
    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/user/' + this.state.user_id)
            .then((response) => {
                this.setState({
                    data: response.data
                })
                console.log(response.data)
            });
    }
    render() {
        if (!this.state.data) {
            return (
                <div>
                    A carregar informação
              </div>
            );
        } else {
            let userprofi = this.state.data.user[0].profissao_id;
            console.log(userprofi)
            const profis_certa = this.state.data.profissao.map((prof, i) => {
                if (userprofi == prof.id) {
                    console.log(userprofi)
                    console.log(prof.id)
                    return (
                        <p>
                            {prof.nome_profissao}
                        </p>
                    )
                }
            });
            return (
                <div id="vePerf">
                    <h1>Perfil </h1>
                    <Link to={'/jornais'}>
                        <button className="btn_back" onClick={this.changePage}>Voltar</button>
                    </Link>

                    <img id="fotoPerfil" src={'http://noticiarte.ddns.net/uploads/' + this.state.data.user[0].image} />

                    <div className="div_perfil">
                        <p id="nomePerfil">{this.state.data.user[0].nome}</p>
                        <h5>Username</h5>
                        <p>{this.state.data.user[0].username}</p>
                        <h5>Email</h5>
                        <p>{this.state.data.user[0].email}</p>
                        <h5>Biografia</h5>
                        {this.state.data.user[0].biografia == null ? '' : <p>{this.state.data.user[0].biografia}</p>}
                        <h5>Data de nascimento</h5>
                        {this.state.data.user[0].data_nascimento == null ? '' : <p>{this.state.data.user[0].data_nascimento}</p>}
                    </div>
                </div>
            )
        }
    }
}