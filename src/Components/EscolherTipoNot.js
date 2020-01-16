import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EscolherTipoNot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipos_noticia: null,
            jornal_id: this.props.location.state.idjornal
        };
    }

    componentDidMount() {
        console.log()
        axios.get('http://noticiarte.ddns.net/api/tiposnoticia')
            .then((res) => {
                console.log(res.data);
                this.setState({
                    tipos_noticia: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {

        if (!this.state.tipos_noticia) {
            return (
                <div>
                    <h1>Notícia</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            )
        } else {
            const tipos = this.state.tipos_noticia.map((tipos, i) => {
                return (
                    <Link key={'link' + i} to={{
                        pathname: "/criarnoticia/" + this.state.jornal_id, state: {
                            id_tipo: tipos.id,
                            id_jor: this.state.jornal_id
                        }
                    }} className="escolheTipo">
                        <div key={'content' + i} className="content">
                            <h3 key={'titulo' + i}>{tipos.tipo_noticia}</h3>
                            <p key={'p' + i}>{tipos.descricao_tipo_not}</p>
                        </div>
                    </Link>
                );
            });

            return (
                <div>
                    <h1>Notícia</h1>
                    <div id="notDiv">
                        <h4>Criar notícia</h4>
                        <p>Seleciona o tipo de conteúdo que queres escrever.</p>
                    </div>
                    <div id="todosJornais">
                        {tipos}
                    </div>
                </div>
            );
        }
    }
}