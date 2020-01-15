import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class TextVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      texto: ''
    };
  }

  MudarText = (e) => {
    this.setState({
      texto: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>Escreve o teu texto para a notícia</h2>

        <textarea className="input_text_perfil" onChange={this.MudarText}></textarea>
        <Link to={{
          pathname: '/criarconteudo',
          state: { texto_video: this.state.texto }
        }}><button className="btn_normal">Seguinte</button></Link>
      </div>
    );
  }
}