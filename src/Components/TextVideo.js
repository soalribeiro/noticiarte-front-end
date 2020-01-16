import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class TextVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_not: this.props.match.params.id_not,
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
        <h1>vídeo</h1>
        <div className="pc">
          <p>Abre este website no teu telemóvel.</p>
        </div>
        <div className="mobile">
          <p>Escreve o teu texto para a notícia</p>

          <textarea className="input_text_perfil textarea_blue" onChange={this.MudarText}></textarea>
          <Link to={{
            pathname: '/criarconteudo',
            state: { texto_video: this.state.texto, id_not: this.state.id_not }
          }}><button className="btn_normal textvid">Seguinte</button></Link>
        </div>

      </div>
    );
  }
}