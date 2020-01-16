import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import BotoesJornal from '../Containers/BotoesJornal';

export default class Editoria extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seccoes: null,
            users: null,
            idjornal: this.props.match.params.idjornal,
            user_id: sessionStorage.getItem('id_user'),
            display: 'none'
        }
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/jornaisseccoes/' + this.state.idjornal)
            .then((response) => {
                this.setState({
                    seccoes: response.data
                })
                console.log(response.data);
            });

        axios.get('http://noticiarte.ddns.net/api/utilizadores/' + this.state.idjornal)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    users: response.data
                })
            });
    }

    associaMembro = (id_seccao) => {
        this.setState({
            display: 'block',
            id_seccao: id_seccao
        })
    }

    membro = (id) => {
        alert(id)
        var seccaoUSer = new FormData();
        seccaoUSer.set('user_id', this.state.id);
        seccaoUSer.set('jornal_id', this.state.idjornal);
        seccaoUSer.set('seccao_id', this.state.id_seccao);

        const options = {
            method: 'post',
            url: 'http://noticiarte.ddns.net/api/seccaouser',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: seccaoUSer
        };

        axios(options).then((res) => {
            console.log(res);
            /* window.location.reload(); */
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        if (!this.state.seccoes || !this.state.users) {
            return (
                <div id="jornalNot">
                    <h2>Diário da Verdade</h2>

                    <BotoesJornal jornal={this.state.idjornal} />

                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            const seccoes = this.state.seccoes.map((seccao, index) => {
                return (
                    <div key={'div' + index} className="seccoes">
                        <h5 key={'h5' + index}>{seccao.seccao.nome_seccao}</h5>
                        <button key={'btn' + index} onClick={() => this.associaMembro(seccao.seccao_id)}>Associar membro</button>
                    </div>
                );
            });

            if (this.state.users.length > 1) {
                const users = this.state.users.map((user, index) => {
                    return (
                        <div key={'div' + index} className="equipa">
                            <div className="divImage" style={{
                                backgroundImage: `url(http://noticiarte.ddns.net${user.user.image})`
                            }}></div>
                            <p>{user.user.nome}</p>
                        </div>
                    );
                });

                const equipaUsers = this.state.users.map((user, index) => {
                    return (
                        <div key={'div' + index} className="individual" onClick={() => this.membro(user.user.id)}>
                            <div className="divImage" style={{
                                backgroundImage: `url(http://noticiarte.ddns.net${user.user.image})`
                            }}></div>
                            <p>{user.user.nome}</p>
                        </div>
                    );
                });

                return (
                    <div>
                        <div id="jornalNot">
                            <h2>Diário da Verdade</h2>

                            <BotoesJornal jornal={this.state.idjornal} />

                            <div id="editoria">
                                <div id="todasSeccoes">
                                    <h4>Secções</h4>
                                    {seccoes}
                                </div>

                                <div id="todaEquipa">
                                    <h4>Equipa</h4>
                                    <button>Convidar</button>
                                    {users}
                                </div>
                            </div>
                        </div>

                        <div id="listaUsers" style={{ display: this.state.display }}>
                            <div id="editoriaUsers">{equipaUsers}</div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div id="jornalNot">
                        <h2>Diário da Verdade</h2>

                        <BotoesJornal jornal={this.state.idjornal} />

                        <div id="editoria">
                            <div id="todasSeccoes">
                                <h4>Secções</h4>
                                {seccoes}
                            </div>

                            <div id="todaEquipa">
                                <h4>Equipa</h4>
                                <p className="semNada">Ainda não tem equipa.</p>
                                <button>Convidar</button>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}