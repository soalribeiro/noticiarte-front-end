import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_noticia: this.props.match.params.idnoticia,
            user_id: sessionStorage.getItem('id_user'),
            textorevisao: '',
            infonoticia: null,
            redirect: false
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

    mudaText = (e) => {
        this.setState({
            textorevisao: e.target.value
        })
    }

    enviarrevision = () => {
        var bodyFormData = new FormData();
        bodyFormData.set('texto_feedback', this.state.textorevisao);
        bodyFormData.set('user_id', this.state.user_id);
        bodyFormData.set('noticia_id', this.state.id_noticia);

        const options = {
            method: 'post',
            url: 'http://noticiarte.ddns.net/api/feedback',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData
        };
        axios(options).then((response) => {
            console.log(response);

            axios.put('http://noticiarte.ddns.net/api/noticias/' + this.state.id_noticia, {
                estadonoticia_id: 3
            }).then((res) => {
                console.log(res);
                this.setState({ redirect: true });
            }).catch((err) => {
                console.log(err);
            })

        }).catch((erro) => {
            console.log(erro)
        })
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
                <div id="feedback">
                    <h1>Revisão</h1>
                    <div className="single_noticia">
                        <textarea id="revText" onChange={this.mudaText}
                            placeholder="Escrever aqui a revisão para esta notícia"></textarea>
                        <button className="btn_normal" onClick={this.enviarrevision}>Enviar Revisão</button>


                        <h4>{this.state.infonoticia.titulo_noticia}</h4>
                        <h5>{this.state.infonoticia.subtitulo_noticia}</h5>

                        <h6>Palavras-chave: {this.state.infonoticia.palavras_chave}</h6>
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
