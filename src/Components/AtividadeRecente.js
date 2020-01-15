import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BotoesJornal from '../Containers/BotoesJornal';

export default class AtividadeRecente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            atividades: null,
            idjornal: this.props.match.params.idjornal
        }
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/atividade/' + this.state.idjornal)
            .then((response) => {
                this.setState({
                    atividades: response.data
                })
                console.log(response.data);
            });
    }

    render() {
        if (!this.state.atividades) {
            return (
                <div id="jornalNot">
                    <h2>Diário da Verdade</h2>

                    <BotoesJornal jornal={this.state.idjornal}/>

                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            const atividade = this.state.atividades.map((ativ, index) => {
                if (ativ.nome_estado == "Editado") {
                    return (
                        <div key={'div1' + index} className="atividade">
                            <div key={'foto1' + index} class="fotoUser" style={{
                                backgroundImage: `url(http://noticiarte.ddns.net/${ativ.image})`
                            }}></div>

                            <div class="blocoEsq">
                                <h6>{ativ.nome}</h6>
                                <Link key={'link' + index} to={'/vernoticias/' + ativ.id}>
                                    <p><b>Editou</b> a notícia "{ativ.titulo_noticia}" na secção <b>{ativ.nome_seccao}</b>.</p>
                                </Link>
                            </div>
                        </div>
                    );
                }

                if (ativ.nome_estado == "Publicado") {
                    return (
                        <div key={'div' + index} className="atividade">
                            <div key={'foto' + index} class="fotoUser" style={{
                                backgroundImage: `url(http://noticiarte.ddns.net/${ativ.image})`
                            }}></div>

                            <div class="blocoEsq">
                                <h6>{ativ.nome}</h6>
                                <Link key={'link' + index} to={'/vernoticias/' + ativ.id}>
                                    <p><b>Publicou</b> a notícia "{ativ.titulo_noticia}" na secção <b>{ativ.nome_seccao}</b>.</p>
                                </Link>
                            </div>
                        </div>
                    );
                }
            });
            return (
                <div id="jornalNot">
                    <h2>Diário da Verdade</h2>

                    <BotoesJornal jornal={this.state.idjornal}/>

                    <div id="ativs">
                        {atividade}
                    </div>
                </div>
            );
        }
    }
}