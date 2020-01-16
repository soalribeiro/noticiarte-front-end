import React, { Component } from 'react'
import axios from 'axios';
let suggestions = [];

export default class ListaSeccoes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: '',
            arrayseccao: this.props.arrayseccoes,
        };
    }

    static defaultProperty = {
        suggestions: []
    };

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/seccao')
            .then((response) => {
                this.setState({
                    data: response.data
                })

                var seccoes = response.data;
                var i;

                for (i = 0; i < seccoes.length; i++) {
                    suggestions.push(seccoes[i].nome_seccao);
                }
            });
    }

    onChange = (e) => {
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
    };


    apagartexto = () => {
        this.setState({
            userInput: ''
        })
    }

    adicionarseccao = (userInput) => {
        this.setState({
            userInput: '',
            arrayseccao: this.state.arrayseccao.push(userInput)
        })

        this.props.novaseccao(this.state.arrayseccao);
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
                        <button id="inserirSec" onClick={() => this.adicionarseccao(userInput)}>
                            Inserir secção
                        </button>
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
                <div className="home">
                    <input className="inputjornal"
                        type="text"
                        placeholder="Escreva a secção que pretende adicionar"
                        onChange={onChange}
                        value={userInput}
                    />
                    <button className="btn_deletesearch" onClick={this.apagartexto}>
                        Apagar
                    </button>
                    {suggestionsListComponent}
                </div>

            )
        }
    }
}
