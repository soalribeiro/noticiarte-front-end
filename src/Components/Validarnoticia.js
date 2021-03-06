import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
export default class Validarnoticia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idnoticia: this.props.match.params.idnoticia,
            redirect: false
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/noticias/' + this.state.idnoticia)
            .then((response) => {
                this.setState({
                    infonoticia: response.data
                })
                console.log(response.data)
            });
    }

    createMarkup = (corponot) => {
        return { __html: corponot };
    };

    publicarNoticia = (variavel, id_noti) => {
        if (variavel == 'sim') {
            axios.put('http://noticiarte.ddns.net/api/noticias/' + id_noti, {
                estadonoticia_id: 1
            }).then((res) => {
                console.log(res);
                this.setState({ redirect: true });
            }).catch((err) => {
                console.log(err);
            })
        } else if (variavel == 'nao') {
            axios.put('http://noticiarte.ddns.net/api/noticias/' + id_noti, {
                estadonoticia_id: 2
            }).then((res) => {
                console.log(res);
                this.setState({ redirect: true });
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={'/redacao'} />;
        }
        if (!this.state.infonoticia) {
            return (
                <div id="carrega">A carregar...</div>
            );
        } else {

            let corponot = this.state.infonoticia.corpo_noticia;

            return (
                <div>
                    <h1>Publicar</h1>
                    <div className="single_noticia">
                        <div style={{
                            backgroundColor: '#F2F2F2', padding: '20px', maxWidth: '400px', margin: '4% auto 0', borderRadius: '30px'
                        }}>
                            <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: 'auto' }}>Desejas publicar esta notícia?</p>
                            <a className="noti_btn" onClick={() => this.publicarNoticia('sim', this.state.infonoticia.id)}>Sim</a>
                            <a className="noti_btn_cance" onClick={() => this.publicarNoticia('nao', this.state.infonoticia.id)}>Não</a>
                        </div>

                        <h4>{this.state.infonoticia.titulo_noticia}</h4>
                        <h5>{this.state.infonoticia.subtitulo_noticia}</h5>

                        <h6>Palavras-chave:{this.state.infonoticia.palavras_chave}</h6>
                        <div className="noticia_img" style={{
                            backgroundImage: `url(http://noticiarte.ddns.net/uploads/${this.state.infonoticia.imagem})`
                        }}></div>

                        <div dangerouslySetInnerHTML={this.createMarkup(corponot)} />
                    </div>
                </div>
            )
        }
    }
}
