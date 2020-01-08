import React, { Component } from 'react'
import axios from 'axios';
import SingleJornal from './SingleJornal';
import Navbar from './CriarNoticias/Navbar';
import { Link, Redirect } from 'react-router-dom';

export default class SingleNoticiaSeccao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_jornal: this.props.match.params.idjornal,
            seccao_id: this.props.match.params.idseccao,
            palete_cores: this.props.match.params.idpalete,
            jornaldapagina: null,
            seccoes: null,
            teste: null,
            palete_cor:null,
            noticias: null
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/notSec/' + this.state.seccao_id + '/' + this.state.id_jornal)
            .then((response) => {
                this.setState({
                    noticias: response.data
                })
            });
        axios.get('http://noticiarte.ddns.net/api/jornais/' + this.state.id_jornal)
            .then((response) => {
                this.setState({
                    jornaldapagina: response.data
                })
            });

        axios.get('http://noticiarte.ddns.net/api/jornaisseccoes/' + this.state.id_jornal)
            .then((response) => {
                this.setState({
                    seccoes: response.data
                })
            });

        axios.get('http://noticiarte.ddns.net/api/cores/' + this.state.palete_cores)
            .then((res) => {
                this.setState({
                    palete_cor: JSON.parse(res.data.rgb_cor)
                })
            })
            
            .catch((err) => {
                console.log(err);
            });

    }



    render() {
        if (!this.state.noticias || !this.state.jornaldapagina || 
            !this.state.seccoes || !this.state.palete_cor) {
            return (
                <div>
                    <h2>Nada</h2>
                </div>
            );
        } else {
            let listItems = this.state.noticias.map((data, index) => {
                return (
                    <Link className="NotIndividual2"
                        to={{
                            pathname: '/vernoticias/' + data.id,
                            state: { noticia_id: data.id, jornal_id: this.state.id_jornal }
                        }}>
                        <div key={'divTotal' + index} >
                            <div key={'imagem' + index} className="imgNot"
                                style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${data.imagem})` }}></div>

                            <h6 key={'h6' + index}
                                style={{ color: this.state.palete_cor.cor5 }}>{data.titulo_noticia}</h6>

                            <p key={'p' + index}
                                style={{ color: this.state.palete_cor.cor3 }}>{data.corpo_noticia}</p>
                        </div>
                    </Link>
                );
            });
            return (
                <div>

                    <Navbar id_jornal={this.state.id_jornal}
                        nomejornal={this.state.jornaldapagina.nome_jornal}
                        imagejornal={this.state.jornaldapagina.imagem_jornal}
                        palete={this.state.jornaldapagina.cor_id}
                        seccoes={this.state.seccoes}
                        id_sec={this.props.match.params.idseccao}
                    />
                    {listItems}
                </div>
            );
        }

    }
}
