import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './CriarNoticias/Navbar';
import Manchete from './CriarNoticias/Manchete';
import Manchete2 from './CriarNoticias/Manchete2';
// import { useParams } from 'react-router-dom';
// let id  = useParams();

export default class SingleJornal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_jornal: this.props.location.state.jornal_id,
            jornaldapagina: null,
            seccoes: null,
            teste: null
        };
    }

    componentDidMount() {

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


    }

    render() {

        if (!this.state.jornaldapagina || !this.state.seccoes) {
            return (
                <div>
                    <h1>Carregando</h1>
                </div>
            );
        } else {
            let conso = JSON.parse(this.state.jornaldapagina.html_json);

            if (conso.Manchete === "Manchete") {
                return (
                    <div id="singleJor">
                        <Link className="btn_back" to={'/jornais'}>Voltar</Link>

                        <Navbar id_jornal={this.props.location.state.jornal_id}
                            nomejornal={this.state.jornaldapagina.nome_jornal}
                            imagejornal={this.state.jornaldapagina.imagem_jornal}
                            palete={this.state.jornaldapagina.cor_id}
                            seccoes={this.state.seccoes}
                        />

                        <Manchete id_jornal={this.props.location.state.jornal_id}
                            palete={this.state.jornaldapagina.cor_id} />
                    </div>

                );
            } else if (conso.Manchete === "Manchete2") {
                return (
                    <div id="singleJor">
                        <Link className="btn_back" to={'/jornais'}>Voltar</Link>

                        <Navbar id_jornal={this.props.location.state.jornal_id}
                            nomejornal={this.state.jornaldapagina.nome_jornal}
                            imagejornal={this.state.jornaldapagina.imagem_jornal}
                            palete={this.state.jornaldapagina.cor_id}
                            seccoes={this.state.seccoes}
                        />

                        <Manchete2 id_jornal={this.props.location.state.jornal_id}
                            palete={this.state.jornaldapagina.cor_id} />
                    </div>
                );
            }

        }

    }
}