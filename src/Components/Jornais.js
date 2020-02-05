import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Jornais extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jornaishasusers: null,
            display: 'none',
            user_id: sessionStorage.getItem('id_user'),
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/userjornais')
            .then((response) => {
                this.setState({
                    jornaishasusers: response.data
                })
                console.log(response.data);
            });
    }

    enviarPedido = (jornal_id, user_id_jornal) => {
        var bodyFormData = new FormData();
        bodyFormData.set('userconvidado_id', this.state.user_id);
        bodyFormData.set('jornal_id', jornal_id);
        bodyFormData.set('user_id', user_id_jornal);

        const options = {
            method: 'post',
            url: 'http://noticiarte.ddns.net/api/convitejornal',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData
        };

        axios(options).then((response) => {
            console.log(response);
            this.setState({
                display: 'flex'
            })
            document.body.style.overflow = 'hidden';
        }).catch((erro) => {
            console.log(erro)
        })
    }

    fechar = () => {
        this.setState({
            display: 'none'
        })

        document.body.style.overflow = 'auto';
    }

    showConversa = () => {
        document.getElementById("chat_pop").style.display = "block";
    }

    fecharConversa = () => {
        document.getElementById("chat_pop").style.display = "none";
    }

    render() {
        if (!this.state.jornaishasusers) {
            return (
                <div>
                    <h1>Jornal</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            var jornaisHasUsers = this.state.jornaishasusers;
            let listItems = jornaisHasUsers.map((data, index) => {
                if (jornaisHasUsers[index].role_id == 2)
                    return (
                        <div className="card-jornal">
                            <div id="outrosJornais" style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${jornaisHasUsers[index].jornal.imagem_jornal})` }}></div>
                            <div className="infosJornal">
                                <h4 key={'h4' + index}>{jornaisHasUsers[index].jornal.nome_jornal}</h4>
                                <p key={'pdescr' + index}>{jornaisHasUsers[index].jornal.descricao}</p>
                                <Link to={'/verperfil/' + jornaisHasUsers[index].user.id}>
                                    <p key={'puser' + index} class="nomeRoleJornal">Editor: {jornaisHasUsers[index].user.username}</p>
                                </Link>
                            </div>
                            <div className="botoesJornais">
                                <Link key={'link' + index} to={{
                                    pathname: '/verjornal/' + jornaisHasUsers[index].jornal.id,
                                    state: { jornal_id: jornaisHasUsers[index].jornal.id }
                                }}><button className="ver" key={'btn' + index} onClick={this.login}>Ver</button></Link>


                                {sessionStorage.getItem('id_user') !== null ?
                                    <button className="aderir" key={'aderir' + index}
                                        onClick={() => this.enviarPedido(jornaisHasUsers[index].jornal.id, jornaisHasUsers[index].user.id)}>Aderir</button>
                                    : ''}
                            </div>
                        </div>
                    );
            });



            return (
                <div>
                    <h1>Jornais</h1>

                    <div id="card-outros-jornais">
                        <h4>Todos os jornais</h4>
                        <p style={{ marginLeft: '5%', marginBottom: '40px' }}>Explora os jornais criados na plataforma!</p>
                        {sessionStorage.getItem('id_user') !== null ?
                            <Link to={'/criarjornais'}>
                                <button id="criarJornal"> Criar jornal</button>
                            </Link> :
                            ''
                        }

                        {listItems}

                        <button className="bot_not" onClick={this.showConversa}>
                            <svg height="50" width="50" >
                                <circle cx="10" cy="20" r="5" fill="white" />
                                <circle cx="25" cy="20" r="5" fill="white" style={{ marginLeft: '20px' }} />
                            </svg>
                        </button>

                        <div id="chat_pop" class="chat-popup">
                            <label for="msg"><b>Chat de apoio</b></label>
                            <button type="button" class="btn_rejeitar" onClick={this.fecharConversa}>Fechar</button>



                            <div class="all_messa_user">
                                <p>Como crio notícias para o meu jornal? </p>
                                <span class="time-right">11:02</span>

                            </div>
                            <div class="all_messa">
                                <p>Através do botão <span>Criar Jornal </span> na página "Ver Jornais".</p>
                                <span class="time-right">11:05</span>

                            </div>
                            <input className="inputChat" type="text" placeholder="O que precisas de saber?" name="msg" required />

                            <button type="submit" class="btn_aceitar" style={{
                                padding: '8px 15px',
                                display: 'block',
                                margin: 'auto'
                            }}>Enviar</button>

                        </div>
                    </div>

                    <div id="modal" style={{ display: this.state.display }}>
                        <div id="modalInside">
                            <p className="p_modal">Enviaste pedido fica atento às notificações!</p>
                            <button className="btn_deletesearch" onClick={this.fechar}>
                                Fechar
                        </button>
                        </div>
                    </div>

                </div>
            );
        }
    }
}