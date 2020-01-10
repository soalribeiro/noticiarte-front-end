import React, { Component } from 'react'
import axios from 'axios';
let suggestions = [];
export default class Listusers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }

  static defaultProperty = {
    suggestions: []
  };

  componentDidMount() {
    axios.get('http://192.168.1.5:3000/api/user')
      .then((response) => {
        this.setState({
          data: response.data
        })
        var users = response.data;
        var i;
        for (i = 0; i < users.length; i++) {
          suggestions.push(users[i].username, users[i].email);
          //para guardar o username na pesquisa
        }
        // console.log(response.data);
        // console.log(response.data[0].profissao.nome_profissao);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
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
        <div id="carrega">
          A carregar...
        </div>
      );
    } else {
      return (
        <div>
          <input className="input_text"
            type="text"
            placeholder="Procure pelo username ou nome"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <button className="btn_normal" onClick={this.login}>
            Adicionar
                </button>
          <button className="btn_deletesearch" onClick={this.apagartexto}>
            Apagar
          </button>
          {suggestionsListComponent}
          {/* <ul>
            {listItems}
          </ul> */}
        </div>

      )
    }
  }
}
