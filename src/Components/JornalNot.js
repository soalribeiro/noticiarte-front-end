import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BotoesJornal from '../Containers/BotoesJornal';

export default class JornalNot extends React.Component {
    constructor() {
        super();
        this.state = {
            noticias: null,
            editor: null,
            idjornal: 1, //MUDAR
            manchete: null
        };
    }

    componentDidMount() {
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
                this.setState({
                    editor: res.data[0].nome
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    tornaManchete = (id) => {
        if (this.state.manchete) {
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

    /*  tiraManchete = (id) => {
         axios.put('http://noticiarte.ddns.net/api/atualizamanchete/' + id, {
             manchete: 0
         }).then((res) => {
             console.log(res);
             this.setState({
                 manchete: false
             })
             window.location.reload();
         }).catch((err) => {
             console.log(err);
         })
     }  */

    render() {
        console.log(this.state);
        if (!this.state.editor || !this.state.noticias) {
            return (
                <div id="jornalNot">
                    <h2>Dîário da Verdade</h2>
                    <div id="carrega">A carregar...</div>
                </div>
            )
        } else {
            const noticias = this.state.noticias.map((noticia, i) => {
                return (
                    <div key={i} class="noticias">
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
                            <p key={'nomest' + i} class="pEstado">{noticia.estadonoticia.nome_estado}</p>
                        </div>

                        <div id="botoesNot">
                            <Link key={'link' + i} to={{
                                pathname: '/noticiajornal/' + noticia.id, state: {
                                    noticia_id: noticia.id
                                }
                            }}>Editar</Link>

                            {noticia.manchete === 1 ?
                                <button key={'mancheteBtn' + i} className="botaoDif comManchete" id={"btn" + i} onClick={() => this.tornaManchete(noticia.id)}>Manchete</button> :
                                <button key={'mancheteBtn' + i} className="botaoDif semManchete" id={"btn" + i} onClick={() => this.tornaManchete(noticia.id)}>Manchete</button>
                            }

                            <Link key={'linkfix' + i} className="botaoDif" to={{
                                pathname: '/noticiajornal/' + noticia.id, state: {
                                    noticia_id: noticia.id
                                }
                            }}>Fixar</Link>
                        </div>
                    </div>
                );
            });

            return (
                <div id="jornalNot">
                    <h2>Diário da Verdade</h2>

                    <BotoesJornal />

                    <div id="criarNotDiv">
                        <Link to="/noticia" id="criarNotLink">
                            <button id="criarNoticia">Criar notícia</button>
                        </Link>
                    </div>

                    {noticias}
                </div>
            );
        }
    }
}