import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class SingleNoticia extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id_noticia: this.props.location.state.noticia_id,
            id_jornal: this.props.location.state.jornal_id,
            infonoticia: null,
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/noticias/' + this.state.id_noticia)
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


    render() {

        if (!this.state.infonoticia) {
            return (
                <h2>
                    Carregando ou não tem notícias :(
            </h2>
            );
        } else {

            let corponot = this.state.infonoticia.corpo_noticia;

            return (
                <div className="single_noticia">
                    <Link className="btn_back"
                        to={{
                            pathname: '/verjornal/' + this.state.id_jornal,
                            state: { jornal_id: this.state.id_jornal }
                        }}>Voltar</Link>

                    <h4>{this.state.infonoticia.titulo_noticia}</h4>
                    <h5>{this.state.infonoticia.subtitulo_noticia}</h5>

                    <h6>Palavras-chave:{this.state.infonoticia.palavras_chave}</h6>
                    <div className="noticia_img" style={{
                        backgroundImage: `url(http://noticiarte.ddns.net/uploads/${this.state.infonoticia.imagem})`
                    }}></div>

                    <div dangerouslySetInnerHTML={this.createMarkup(corponot)} />
                </div >
            )
        }

    }
}
