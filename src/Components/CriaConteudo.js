import React, { Component } from 'react';
import VideoRecorder from 'react-video-recorder';
import axios from 'axios';
import { Link } from 'react-router-dom';
var id;
export default class CriaConteudo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 1,
      textonoticia: this.props.location.state.texto_video,
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.texto_video)
  }

  enviavideo = () => {
    alert('hey')
    var bodyFormData = new FormData();
    bodyFormData.set('url_conteudo', this.state.ficheiro);
    bodyFormData.set('tiposconteudo_id', 2);
    bodyFormData.set('noticia_id', 1);
    const options2 = {
      method: 'post',
      url: 'http://noticiarte.ddns.net/api/conteudonoticia',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: bodyFormData
    };
    axios(options2).then((response) => {
      console.log(response)
    }).catch((erro) => {
      console.log(erro)
    })
  }


  render() {


    return (
      <div>
        <div className="pc">
          <h2>Só funciona na versão mobile</h2>
        </div>
        <div className="mobile">
          <h1>Notícia</h1>
          <Link to={'/textovideo'}>
            <button className="btn_back" >
              Voltar
           </button>
          </Link>
          {/* <div id="class_animada" className="texto_animado_video">
          <p>{this.state.textonoticia}</p>
        </div> */}
          <div class="containerzito">
            <div > <p id="divTAReviews">{this.state.textonoticia}</p></div>
          </div>
          <VideoRecorder
            mimeType={'video/webm'}
            isOnInitially={true}
            showReplayControls={true}
            countdownTime={3000}
            timeLimit={30000}
            onRecordingComplete={(videoBlob) => {
              this.setState({
                ficheiro: videoBlob
              })
            }}
          />
          <button onClick={this.enviavideo} id="addConteudo">Adicionar conteúdo</button>
        </div>
      </div>
    )
  }
}