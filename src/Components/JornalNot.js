import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BotoesJornal from '../Containers/BotoesJornal';
import semNoticia from '../images_app/semNoticias.png';

export default class JornalNot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noticias: null,
            editor: null,
            idjornal: this.props.match.params.idjornal,
            manchete: null,
            nome_jornal: null
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/jornais/' + this.state.idjornal)
            .then((response) => {
                this.setState({
                    nome_jornal: response.data.nome_jornal
                })
                console.log(response.data.nome_jornal);
            });

        axios.get('http://noticiarte.ddns.net/api/noticiasjornal/' + this.state.idjornal)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    noticias: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });


        axios.get('http://noticiarte.ddns.net/api/notjoredi/' + this.state.idjornal)
            .then((res) => {
                console.log(res.data);
                if (res.data.length > 0) {
                    this.setState({
                        editor: res.data[0].nome
                    })
                } else {
                    this.setState({
                        editor: 'nada'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    tornaManchete = (id) => {
        if (!this.state.manchete) {
            axios.put('http://noticiarte.ddns.net/api/atualizamanchete/' + id, {
                manchete: 1
            }).then((res) => {
                console.log(res);
                this.setState({
                    manchete: true
                })
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
            if (!this.state.editor || !this.state.noticias) {
                return (
                    <div id="jornalNot">
                        <h2>{this.state.nome_jornal}</h2>

                        <BotoesJornal jornal={this.state.idjornal} />

                        <div id="carrega">A carregar...</div>
                    </div>
                )
            } else {
                if (this.state.noticias.length > 0 || this.state.editor > 0) {
                    const noticias = this.state.noticias.map((noticia, i) => {
                        return (
                            <div key={i} className="noticias">
                                <div className="cols col1">
                                    <h3 key={'titulo' + i}>Título</h3>
                                    <p key={'p' + i}>{noticia.titulo_noticia}</p>
                                </div>

                                <div className="cols col2">
                                    <h3 key={'criacao' + i}>Criada em</h3>
                                    <p key={'data' + 1}>{noticia.created_at}</p>

                                    <h3 key={'pub' + 1}>Publicada em</h3>
                                    <p key={'datap' + 1}>{noticia.estadonoticia_id === 1 ? noticia.updated_at : '----'}</p>
                                </div>

                                <div className="cols col3">
                                    <h3 key={'repoter' + i}>Repórter</h3>
                                    <p key={'nomerp' + i}>{noticia.user.nome}</p>

                                    <h3 key={'editor' + i}>Editor</h3>
                                    <p key={'nomeed' + i}>{this.state.editor}</p>
                                </div>

                                <div className="cols col4">
                                    <h3 key={'estado' + i}>Estado</h3>
                                    <p key={'nomest' + i} className="pEstado">{noticia.estadonoticia.nome_estado}</p>
                                </div>

                                <div id="botoesNot">
                                    <Link key={'link' + i} to={'/editarnot/' + noticia.id + '/' + this.state.idjornal}>Editar</Link>

                                    {noticia.manchete === 1 ?
                                        <button key={'mancheteBtn' + i} className="botaoDif comManchete" id={"btn" + i} onClick={() => this.tornaManchete(noticia.id)}>Manchete</button> :
                                        <button key={'mancheteBtn' + i} className="botaoDif semManchete" id={"btn" + i} onClick={() => this.tornaManchete(noticia.id)}>Manchete</button>
                                    }

                                    
                                    <Link key={'linkrev' + i} to={'/feedback/' + noticia.id}>Enviar revisão</Link>
                                </div>
                                    <Link key={'linkrev' + i} to={'/textovideo/' + noticia.id} id="gravarVideo">Gravar vídeo</Link>
                            </div>
                        );
                    });

                    return (
                        <div id="jornalNot">
                            <h2>{this.state.nome_jornal}</h2>

                            <BotoesJornal jornal={this.state.idjornal} />

                            <div id="criarNotDiv">
                                <Link to="/noticia" id="criarNotLink">
                                    <button id="criarNoticia">Criar notícia</button>
                                </Link>
                            </div>

                            {noticias}
                        </div>
                    );
                } else {
                    return (
                        <div id="jornalNot">
                            <h2>{this.state.nome_jornal}</h2>

                            <BotoesJornal jornal={this.state.idjornal} />

                            <img src={semNoticia} class="semNadaImage" />
                            <p className="semNada">Ainda não tens notícias...</p>

                            <div id="criarNotDiv">
                                <Link to="/noticia" id="criarNotLink">
                                    <button id="criarNoticia">Criar notícia</button>
                                </Link>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}