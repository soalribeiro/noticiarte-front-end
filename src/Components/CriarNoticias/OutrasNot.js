import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class OutrasNot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            palete_cores: null,
            noticiasjornal: null,
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/cores/' + this.props.palete)
            .then((res) => {
                this.setState({
                    palete_cores: JSON.parse(res.data.rgb_cor)
                })
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://noticiarte.ddns.net/api/noticiasjornal/' + this.props.id_jornal)
            .then((res) => {
                console.log(res)
                this.setState({
                    noticiasjornal: res.data

                })
                console.log(res.data);
                console.log(res.data[0].titulo_noticia);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    createMarkup = (corponot) => {
        return { __html: corponot };
    };

    render() {
        if (!this.state.palete_cores || !this.state.noticiasjornal) {
            return (
                <div>
                    <h2>Carregando</h2>
                </div>
            )
        } else {
            if (this.state.noticiasjornal.length == 0) {
                return (
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Ainda não tem notícias</h3>
                    </div>
                );
            } else {
                const listINot = this.state.noticiasjornal.map((noticia, index) => {
                    console.log('manchete' + noticia.manchete)
                    if (noticia.manchete === 0) {
                        return (
                            <Link className="NotIndividual" 
                            to={{
                                pathname: '/vernoticias/' + noticia.id,
                                state: { noticia_id: noticia.id,
                                    jornal_id:this.props.id_jornal }
                            }}>
                                <div key={'divTotal' + index} >

                                    <div key={'imagem' + index} className="imgNot"
                                        style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${noticia.imagem})` }}></div>

                                    <h6 key={'h6' + index}
                                        style={{ color: this.state.palete_cores.cor5 }}>{noticia.titulo_noticia}</h6>

<div key={'p' + index}  style={{ color: this.state.palete_cores.cor3 }} dangerouslySetInnerHTML={this.createMarkup(noticia.subtitulo_noticia)} />

                                </div>
                            </Link>
                        );
                    }
                });

                return (
                    <div id="noticiasTodas">
                        {listINot}
                    </div>
                );
            }
        }
    }
}