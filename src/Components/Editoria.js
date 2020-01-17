import React from 'react';
import { Link } from 'react-router-dom';
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
            display: 'none',
            userseccoes: null,
            nome_jornal: null
        }
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/jornais/' + this.state.idjornal)
            .then((response) => {
                this.setState({
                    nome_jornal: response.data.nome_jornal
                })
                console.log(response.data.nome_jornal);
            });

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

        axios.get('http://noticiarte.ddns.net/api/usersjornais/' + this.state.idjornal)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    userseccoes: response.data
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
        var seccaoUSer = new FormData();
        seccaoUSer.set('user_id', id);
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
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
    }


    render() {
        if (!this.state.nome_jornal) {
            return (
                <div id="jornalNot">
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            if (!this.state.seccoes || !this.state.users || !this.state.userseccoes) {
                return (
                    <div id="jornalNot">
                        <h2>{this.state.nome_jornal}</h2>

                        <BotoesJornal jornal={this.state.idjornal} />

                        <div id="carrega">A carregar...</div>
                    </div>
                );
            } else {
                const seccoes = this.state.seccoes.map((seccao, index) => {
                    const userseccoes = this.state.userseccoes.map((usersec, index1) => {
                        if (usersec.seccao_id == seccao.seccao_id) {
                            return (
                                <div key={'img' + index1} className="divImage" style={{
                                    backgroundImage: `url(http://noticiarte.ddns.net/uploads/${usersec.image})`
                                }}></div>
                            );
                        } else {
                            console.log('nada');
                        }
                    });
                    return (
                        <div key={'div' + index} className="seccoes">
                            <h5 key={'h5' + index}>{seccao.seccao.nome_seccao}</h5>
                            {this.state.userseccoes.length > 0 ? userseccoes : console.log('nada')}
                            <button key={'btn' + index} onClick={() => this.associaMembro(seccao.seccao_id)}>Associar membro</button>
                        </div>
                    );
                });



                if (this.state.users.length > 1) {
                    const users = this.state.users.map((user, index) => {
                        return (
                            <div key={'div' + index} className="equipa">
                                <div className="divImage" style={{
                                    backgroundImage: `url(http://noticiarte.ddns.net/uploads/${user.user.image})`
                                }}></div>
                                <p>{user.user.nome}</p>
                            </div>
                        );
                    });

                    const equipaUsers = this.state.users.map((user, index) => {
                        return (
                            <div key={'div' + index} className="individual" onClick={() => this.membro(user.user.id)}>
                                <div className="divImage" style={{
                                    backgroundImage: `url(http://noticiarte.ddns.net/uploads/${user.user.image})`
                                }}></div>
                                <p>{user.user.nome}</p>
                            </div>
                        );
                    });

                    return (
                        <div>
                            <div id="jornalNot">
                                <h2>{this.state.nome_jornal}</h2>

                                <BotoesJornal jornal={this.state.idjornal} />

                                <div id="editoria">
                                    <div id="todasSeccoes">
                                        <h4>Secções</h4>
                                        {seccoes}
                                    </div>

                                    <div id="todaEquipa">
                                        <h4>Equipa</h4>
                                        <Link to="conviterecebido"><button>Convidar</button></Link>
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
                            <h2>{this.state.nome_jornal}</h2>

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
}