import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './CriarNoticias/Navbar';
import Manchete from './CriarNoticias/Manchete';
import Manchete2 from './CriarNoticias/Manchete2';
import OutrasNot from './CriarNoticias/OutrasNot';
import OutrasNot2 from './CriarNoticias/OutrasNot2';

export default class SingleJornal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_jornal: this.props.match.params.idjornal,
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


    renderSwitch(param) {
        switch (param.Manchete && param.colunas) {
            case 'Manchete' && 'coluna_not1':
                return (
                    <div>
                        <Manchete id_jornal={this.state.id_jornal}
                            palete={this.state.jornaldapagina.cor_id} />
                        <OutrasNot id_jornal={this.state.id_jornal}
                            palete={this.state.jornaldapagina.cor_id} />
                    </div>
                );

            case 'Manchete' && 'coluna_not2':
                return (
                    <div>
                        <Manchete id_jornal={this.state.id_jornal}
                            palete={this.state.jornaldapagina.cor_id} />
                        <OutrasNot2 id_jornal={this.state.id_jornal}
                            palete={this.state.jornaldapagina.cor_id} />
                    </div>
                );

            case 'Manchete2' && 'coluna_not1':
                return (<div>
                    <Manchete2 id_jornal={this.state.id_jornal}
                        palete={this.state.jornaldapagina.cor_id} />
                    <OutrasNot id_jornal={this.state.id_jornal}
                        palete={this.state.jornaldapagina.cor_id} />
                </div>);
            case 'Manchete2' && 'coluna_not2':
                return (<div>
                    <Manchete2 id_jornal={this.state.id_jornal}
                        palete={this.state.jornaldapagina.cor_id} />
                    <OutrasNot2 id_jornal={this.state.id_jornal}
                        palete={this.state.jornaldapagina.cor_id} />
                </div>);
        }
    }


    render() {
        if (!this.state.jornaldapagina || !this.state.seccoes) {
            return (
                <div>
                    <h1>Jornal</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            let conso = JSON.parse(this.state.jornaldapagina.html_json);

            return (
                <div>
                    <h1>Jornal</h1>

                    <div id="singleJor">
                        <Link className="btn_back" to={'/jornais'}>Voltar</Link>

                        <Navbar id_jornal={this.state.id_jornal}
                            nomejornal={this.state.jornaldapagina.nome_jornal}
                            imagejornal={this.state.jornaldapagina.imagem_jornal}
                            palete={this.state.jornaldapagina.cor_id}
                            seccoes={this.state.seccoes}
                            id_sec={'non'}
                        />

                        {this.renderSwitch(conso)}
                    </div>
                </div>
            );

        }

    }
}