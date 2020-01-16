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
                <div>
                    <h4>Perfil</h4>
                    <img src={'http://noticiarte.ddns.net/' + this.state.data.user[0].image} />


                    <div className="inputs">
                        <div className="labelInput">Nome</div>
                        <input className="input_text_perfil"
                            type="text"
                            disabled
                            value={this.state.data.user[0].nome}
                        />
                    </div>
                    <div className="inputs">
                        <div className="labelInput">Username</div>
                        <input className="input_text_perfil"
                            type="text"
                            placeholder="username"
                            value={this.state.data.user[0].username}
                            disabled
                        />
                    </div>

                    <div className="inputs">
                        <div className="labelInput">Email</div>
                        <input className="input_text_perfil"
                            type="email"
                            placeholder="email"
                            value={this.state.data.user[0].email}
                            disabled
                        />
                    </div>

                    <div className="inputs">
                        <div className="labelInput bio">Biografia</div>
                        <textarea className="input_text_perfil"
                            disabled
                            value={this.state.data.user[0].biografia}
                        />
                    </div>
                    <div className="inputs">

                        <div className="labelInput">Data de nascimento</div>
                        <input className="input_text_perfil data"
                            type="date"
                            value={this.state.data.user[0].data_nascimento}
                            disabled
                        />
                    </div>
                   
                </div >
            )
        }

    }
}
