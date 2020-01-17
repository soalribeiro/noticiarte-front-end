import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Jornais extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jornaishasusers: null,
            display: 'none',
            user_id: 1,
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