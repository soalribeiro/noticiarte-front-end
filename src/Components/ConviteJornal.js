import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import BotoesJornal from '../Containers/BotoesJornal';
export default class ConviteJornal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jornal_id: this.props.match.params.idjornal,
            data: null,
            titulojornal: 'Jornal',
            redirect: false,
            nome_jornal: null
        };
    }
    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/jornais/' + this.state.jornal_id)
            .then((response) => {
                this.setState({
                    nome_jornal: response.data.nome_jornal
                })
            });

        axios.get('http://noticiarte.ddns.net/api/convEnviados/' + this.state.jornal_id)
            .then((response) => {
                this.setState({
                    data: response.data
                })
                console.log(response.data)
            });
    }
    sendConvite = (texto, conviteid, user_id) => {
        if (texto == 'sim') {
            axios.put('http://noticiarte.ddns.net/api/convitejornal/' + conviteid, {
                estadoconvitejornal_id: 4
            }).then((res) => {
                console.log(res);
                var bodyFormData = new FormData();
                bodyFormData.set('role_id', 3);
                bodyFormData.set('user_id', user_id);
                bodyFormData.set('jornal_id', this.state.jornal_id);
                const options2 = {
                    method: 'post',
                    url: 'http://noticiarte.ddns.net/api/userjornais',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: bodyFormData
                };
                axios(options2).then((response) => {
                    window.location.reload();
                }).catch((erro) => {
                    console.log(erro)
                })
            }).catch((err) => {
                console.log(err);
            })
        } else if (texto == 'nao') {
            axios.put('http://noticiarte.ddns.net/api/convitejornal/' + conviteid, {
                estadoconvitejornal_id: 1
            }).then((res) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    render() {

        if (!this.state.nome_jornal) {
            return (
                <div id="jornalNot">
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            if (!this.state.data) {
                return (
                    <div id="jornalNot">
                        <h2>{this.state.nome_jornal}</h2>

                        <BotoesJornal jornal={this.state.idjornal} />

                        <div id="carrega">A carregar...</div>
                    </div>
                );
            } else {
                const convites = this.state.data.map((convitejornal, i) => {
                    if (convitejornal.estadoconvitejornal_id == 2) {
                        console.log(true)
                        return (
                            <div>
                                <div className="div_user">
                                    <Link to={'/verperfil/' + convitejornal.user_convidado.id}>
                                        <div className="image_jornal_convite" style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${convitejornal.user_convidado.image})` }}></div>
                                        <p key={'option' + i} value={convitejornal.id}>{convitejornal.user_convidado.nome} enviou pedido</p>
                                    </Link>
                                </div>
                                <div className="divs_btn">
                                    <button className="btn_aceitar" onClick={() => this.sendConvite('sim', convitejornal.id, convitejornal.user_convidado.id)}>Aceitar</button>
                                    <button className="btn_rejeitar" onClick={() => this.sendConvite('nao', convitejornal.id, convitejornal.user_convidado.id)}>Rejeitar</button>
                                </div>
                            </div>
                        )
                    } else if (convitejornal.estadoconvitejornal_id == 4) {
                        return (
                            <div className="div_user">
                                <Link to={'/verperfil/' + convitejornal.user_convidado.id}>
                                    <div className="image_jornal_convite" style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${convitejornal.user_convidado.image})` }}></div>
                                    <p key={'option' + i} value={convitejornal.id}>{convitejornal.user_convidado.nome} já foi aceite.</p>
                                </Link>
                            </div>
                        )
                    }
                });

                return (
                    <div id="pedidosRecebidos" >
                        <h2>{this.state.nome_jornal}</h2>

                        <BotoesJornal jornal={this.state.idjornal} />

                        <h4>Pedidos Recebidos</h4>
                        {this.state.data.length > 0 ?
                            convites : <p style={{ textAlign: 'center' }}>Não recebeu pedidos para aderir ao seu jornal.</p>
                        }

                    </div>
                );
            }
        }
    }
}