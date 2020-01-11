import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Notificacao from './Notificacao';
import Perfil from '../images_app/perfil.png'
import Pesquisa from '../images_app/lupa_azul.png'
export default class Jornais extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jornaishasusers: null,
            display: 'none',
            user_id: 1,
            jornaishasusersAtual:null
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

        axios.get('http://noticiarte.ddns.net/api/userjornais/'+this.state.user_id) //CRIAR JORNAIS DO USER PARA OS MEUS JORNAIS
            .then((response) => {
                this.setState({
                    jornaishasusersAtual: response.data
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
                display: 'block'
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

    render() {
        if (this.state.jornaishasusers == null || !this.state.jornaishasusersAtual) {
            return (
                <div>
                    <p className="p_registate">Carregando...</p>
                </div>
            );
        } else if (this.state.jornaishasusers != null && this.state.jornaishasusersAtual != null) {
            var jornaisDoUser = this.state.jornaishasusersAtual;
            let listadosmeusjornais = jornaisDoUser.map((data, index) => {
                    return (
                        <div className="card-jornal">
                            <div id="outrosJornais" style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${jornaisDoUser[index].jornal.imagem_jornal})` }}></div>
                            <div className="infosJornal">
                                <h4 key={'h4' + index}>{jornaisDoUser[index].jornal.nome_jornal}</h4>
                                <p key={'pdescr' + index}>{jornaisDoUser[index].jornal.descricao}</p>
                            </div>
                            <div className="botoesJornais">
                                <Link key={'link' + index} to={{
                                    pathname: '/verjornal/' + jornaisDoUser[index].jornal.id,
                                    state: { jornal_id: jornaisDoUser[index].jornal.id }
                                }}><button className="ver" key={'btn' + index} onClick={this.login}>Ver</button></Link>
                            </div>
                        </div>
                    );
            });


            var jornaisHasUsers = this.state.jornaishasusers;
            let listItems = jornaisHasUsers.map((data, index) => {
                if (jornaisHasUsers[index].role_id == 2)
                    return (
                        <div className="card-jornal">
                            <div id="outrosJornais" style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${jornaisHasUsers[index].jornal.imagem_jornal})` }}></div>
                            <div className="infosJornal">
                                <h4 key={'h4' + index}>{jornaisHasUsers[index].jornal.nome_jornal}</h4>
                                <p key={'pdescr' + index}>{jornaisHasUsers[index].jornal.descricao}</p>
                                {/* <p key={'puser' + index}>Editor: {jornaisHasUsers[index].user.username}</p> */}
                            </div>
                            <div className="botoesJornais">
                                <Link key={'link' + index} to={{
                                    pathname: '/verjornal/' + jornaisHasUsers[index].jornal.id,
                                    state: { jornal_id: jornaisHasUsers[index].jornal.id }
                                }}><button className="ver" key={'btn' + index} onClick={this.login}>Ver</button></Link>
                                <button className="aderir" key={'aderir' + index}
                                    onClick={() => this.enviarPedido(jornaisHasUsers[index].jornal.id, jornaisHasUsers[index].user.id)}>Aderir</button>
                            </div>
                        </div>
                    );
            });

            return (
                <div className="feedJornal">

                    <h1>Jornal</h1>
                    <Link to="/pesquisa">
                        <button onClick={this.notificacaobtn} className="pesquisa">
                            <img src={Pesquisa} />
                        </button>
                    </Link>
                    <Notificacao />
                    <Link to="/perfil">
                        <button onClick={this.notificacaobtn} className="perfil">
                            <img src={Perfil} />
                        </button>
                    </Link>
                    

                    <div>
                        <h4>Os teus jornais</h4>
                        {listadosmeusjornais}
                    </div>

                    <div id="card-outros-jornais">
                        <h4>Outros jornais</h4>
                        {listItems}
                    </div>

                    <div id="modal" style={{ display: this.state.display }}>
                        <p className="p_modal">Enviaste pedido fica atento às notificações!</p>
                        <button className="btn_deletesearch" onClick={this.fechar}>
                            Fechar
                        </button>
                    </div>
                </div>
            );
        }
    }
}