import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

let suggestions = [];
let htlm;

export default class Pesquisa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: '',
            showJornal: false
        };
    }

    static defaultProperty = {
        suggestions: []
    };

    static defaultProperty = {
        suggestions: []
    };

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/jornais')
            .then((response) => {
                this.setState({
                    data: response.data
                })
                var jornais = response.data;
                var i;
                console.log(jornais)
                for (i = 0; i < jornais.length; i++) {
                    suggestions.push(jornais[i].nome_jornal);
                }
            });
    }

    onChange = (e) => {
        console.log(suggestions);
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(
            (suggestion) =>
                suggestion.toString().toLowerCase().indexOf(userInput.toString().toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = (e) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });

        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].nome_jornal === e.currentTarget.innerText) {
                console.log('find' + this.state.data[i].nome_jornal);

                htlm = <div className="card-jornal">
                    <div id="outrosJornais" style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${this.state.data[i].imagem_jornal})` }}></div>
                    <div className="infosJornal">
                        <h4 >{this.state.data[i].nome_jornal}</h4>
                        <p >{this.state.data[i].descricao}</p>
                    </div>
                    <div className="botoesJornais">
                        <Link to={{
                            pathname: '/verjornal/' + this.state.data[i].id,
                            state: { jornal_id: this.state.data[i].id }
                        }}><button className="ver"  >Ver</button></Link>
                    </div>
                </div>;
                this.setState({
                    showJornal: true
                })
                break;
            }
        }

    };


    apagartexto = () => {
        this.setState({
            userInput: ''
        })
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {

                            return (
                                <li className="listas" key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions text_p_pequeno">
                        <p>Não encontramos nada!</p>
                    </div>
                );
            }
        }
        if (this.state.data === null) {
            return (
                <div className="home">
                    <h2>A carregar...</h2>
                </div>
            );
        } else {
            return (
                <div id="pesquisaJor">
                    <h2>Jornais Pesquisados</h2>

                    <input className="input_text"
                        type="text"
                        placeholder="Procure pelo nome de um jornal"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                    />
                    <button className="btn_normal" onClick={this.login}>
                        Ver
                </button>
                    <button className="btn_deletesearch" onClick={this.apagartexto}>
                        Apagar
          </button>
                    {suggestionsListComponent}

                    {this.state.showJornal == true ? htlm : console.log('oi')}
                </div>
            )
        }
    }
}
