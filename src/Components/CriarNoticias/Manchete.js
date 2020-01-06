import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Manchete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            palete_cores: this.props.palete,
            id_jornal: this.props.id_jornal,
            noticiasjornalmanchete: null
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

        axios.get('http://noticiarte.ddns.net/api/manchete/' + this.props.id_jornal)
            .then((res) => {
                console.log(res)
                this.setState({
                    noticiasjornalmanchete: res.data

                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        if (!this.state.palete_cores || !this.state.noticiasjornalmanchete) {
            return (
                <div>
                    <h2>Carregando</h2>
                </div>
            )
        } else {
            return (
                <div className="manchete_div">
                    <Link to={'/noticias/' + this.state.noticiasjornalmanchete[0].id}><div className="manchete_img" style={{
                        backgroundImage: `url(http://noticiarte.ddns.net/uploads/${this.state.noticiasjornalmanchete[0].imagem})`
                    }}></div>
                        <div className="manchete_titulo">
                            <h5 style={{ textAlign: 'left', color: this.state.palete_cores.cor4 }}>{this.state.noticiasjornalmanchete[0].titulo_noticia}</h5>
                            <p style={{ textAlign: 'left' }}>{this.state.noticiasjornalmanchete[0].corpo_noticia}</p>
                        </div>
                    </Link>
                </div>
            )
        }
    }
}
