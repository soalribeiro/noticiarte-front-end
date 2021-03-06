import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotificacaoIcon from '../images_app/notificacao.png';

var count = 0;
export default class Notificacao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_user: sessionStorage.getItem('id_user'),
            //contagem: null,
            notifiNOT: null,
            notifiJOR: null,
            displaydiv: 'none'
        };
    }
    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/notificNot/' + this.state.id_user)
            .then((response) => {
                this.setState({
                    notifiNOT: response.data.noticias,
                    //contagem: response.data.contagem
                })
                console.log(response.data.noticias)

            });

        axios.get('http://noticiarte.ddns.net/api/notificJornal/' + this.state.id_user)
            .then((response) => {
                this.setState({
                    notifiJOR: response.data.convite,
                    //contagem: response.data.contagem + this.state.contagem
                })
                console.log(response.data.convite)
            });

        axios.get('https://www.publico.pt/api/list/ultimas?page=5000', {
            headers: { 'Access-Control-Allow-Origin': '*' }
        })
            .then((response) => {

                console.log(response.data)
            });

    }


    notificacaobtn = () => {
        if (this.state.displaydiv == 'block') {
            this.setState({
                displaydiv: 'none'
            })
        } else {
            this.setState({
                displaydiv: 'block'
            })
        }
    }

    publicarNoticia = (variavel, id_noti) => {
        if (variavel == 'sim') {
            axios.put('http://noticiarte.ddns.net/api/noticias/' + id_noti, {
                estadonoticia_id: 1
            }).then((res) => {
                console.log(res);
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    render() {
        if (!this.state.notifiNOT || !this.state.notifiJOR) {
            return (
                <div>
                    <button onClick={this.notificacaobtn} className="notificacao">
                        <img src={NotificacaoIcon} />
                    </button>
                    <div style={{ display: this.state.displaydiv }} className="corpoNotif"></div>
                </div>
            );
        } else {
            const notiNot = this.state.notifiNOT.map((notiNotic, i) => {
                if (notiNotic.estadonoticia_id == 3) {
                    count++;
                    return (
                        <div className="divnoti">
                            <Link to={{
                                pathname: '/validarnoticia/' + notiNotic.id
                            }}>
                                <p key={'option' + i} value={notiNotic.id}>A notícia <b>{notiNotic.titulo_noticia}</b> foi editada. Pretende publicar?</p>
                            </Link>
                        </div>
                    )
                } else if (notiNotic.estadonoticia_id == 1) {
                    count++;
                    return (
                        <div className="divnoti">
                            <p key={'option' + i} value={notiNotic.id}>A notícia <b>{notiNotic.titulo_noticia}</b> foi publicada.</p>
                        </div>
                    )
                } else if (notiNotic.estadonoticia_id == 2) {
                    count++;
                    return (
                        <div className="divnoti">
                            <p key={'option' + i} value={notiNotic.id}>A notícia <b>{notiNotic.titulo_noticia}</b> está aguardar revisão.</p>
                        </div>
                    )
                }

            });

            const notiJOR = this.state.notifiJOR.map((notiJornal, i) => {

                if (notiJornal.estadoconvitejornal_id == 4 && notiJornal.userconvidado_id == this.state.id_user) {
                    count++;
                    return (
                        <div className="divnoti">
                            <p key={'option' + i} value={notiJornal.id}>Foi aceite no jornal <b>{notiJornal.jornal.nome_jornal}</b>.</p>
                        </div>
                    )
                } else {
                    console.log('')
                }
            });

            return (
                <div id="allNotif">
                    <button onClick={this.notificacaobtn} className="notificacao">
                        {count > 0 ?
                            <div className="notif_red">{count}</div> :
                            console.log('sem notificações')}
                        <div style={{ display: 'none' }}>{count = 0}</div>
                        <img src={NotificacaoIcon} />
                    </button>
                    <div style={{ display: this.state.displaydiv }} className="corpoNotif">
                        <div className="textNotif">
                            {notiNot}
                            {notiJOR}
                        </div>
                    </div>
                </div>
            )
        }

    }
}
