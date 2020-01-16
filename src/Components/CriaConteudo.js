import React, { Component } from 'react';
import VideoRecorder from 'react-video-recorder';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

var id;

export default class CriaConteudo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: sessionStorage.getItem('id_user'),
      textonoticia: this.props.location.state.texto_video,
      id_not: this.props.location.state.id_not,
      redirect: false
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.texto_video)
  }

  enviavideo = () => {
    var bodyFormData = new FormData();
    bodyFormData.set('url_conteudo', this.state.ficheiro);
    bodyFormData.set('tiposconteudo_id', 2);
    bodyFormData.set('noticia_id', this.state.id_not);
    const options2 = {
      method: 'post',
      url: 'http://noticiarte.ddns.net/api/conteudonoticia',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: bodyFormData
    };
    axios(options2).then((response) => {
      this.setState({
        redirect: true
      })
    }).catch((erro) => {
      console.log(erro);
    })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to="/recebevideo" />
    }

    return (
      <div>
        <div className="pc">
          <h3 style={{
            textAlign: 'center', fontSize: '1.2rem', marginTop: '8%'
          }}>Só funciona na versão mobile</h3>
        </div>
        <div className="mobile">
          <h1>Notícia</h1>
          <Link to={'/textovideo'}>
            <button className="btn_back" >
              Voltar
           </button>
          </Link>
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