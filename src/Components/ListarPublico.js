import React, { Component } from 'react'
import axios from 'axios';
let suggestions = []/* {
    noticia: [{
        'titulonoticia': [],
        'imagemnoticia': [],
        'keywords': []
    }]
} */;
let showjorn = [];
let teste;
export default class ListarPublico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            palavras: this.props.palavras
        };
    }

    static defaultProperty = {
        suggestions: []
    };

    componentDidMount() {
        /* alert(this.state.palavras) */
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://www.publico.pt/api/list/ultimas";
        fetch(proxyurl + url)
            .then(
                response => response.json()
            )
            .then(contents => {
                this.setState({
                    data: contents
                })

                var jornaisPublico = this.state.data;
                var i;
                let j;
                //console.log(jornaisPublico);
                for (i = 0; i < jornaisPublico.length; i++) {
                    for (j = 0; j < jornaisPublico[i].tags.length; j++) {
                        if (this.state.palavras == jornaisPublico[i].tags[j].nome) {
                            teste =
                                <div className="NoticiRelacionada">
                                    <img src={jornaisPublico[i].multimediaPrincipal} />
                                    <h5>{jornaisPublico[i].titulo}</h5>
                                    <span>Fonte: Jornal Público</span>
                                </div>;
                            return teste;
                        }

                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }



    render() {

        if (this.state.data === null) {
            return (
                <div id="carrega">
                    A carregar...
        </div>
            );
        } else {
            return (
                <div>
                    {teste}
                </div>

            )
        }
    }
}
