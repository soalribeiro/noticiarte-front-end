import React, { Component } from 'react'
import { ReactMediaRecorder } from "react-media-recorder";
import VideoRecorder from 'react-video-recorder';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import RecebeVideo from './RecebeVideo';
export default class MobileVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teste: '',
      ficheiro: ''
    };
  }
  handleRecordingComplete = () => {
    //console.log(document.getElementsByClassName('dwGgdi')[0])
    //console.log(document.getElementsByClassName('dwGgdi')[0].src)
    let linkblob = document.getElementsByClassName('dwGgdi')[0].src;

    // var result = '';
    // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // var charactersLength = characters.length;
    // for (var i = 0; i < charactersLength; i++) {
    //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }

    //var teste = blobToFile(document.getElementsByClassName('dwGgdi')[0].src);
    // var file = new File([linkblob], result+".mp4", { type: 'video/mp4' });
    // console.log(file)
    // console.log(file.name)
    this.setState({
      ficheiro: document.getElementsByClassName('dwGgdi')[0].src
    })
  }


  muda = (evt) => {
    console.log(evt.target.files[0])
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
          <VideoRecorder
            mimeType={'video/webm'}
            isOnInitially={true}
            showReplayControls={true}
            countdownTime={3000}
            timeLimit={30000}
            onRecordingComplete={(videoBlob) => {
              console.log(videoBlob);
              this.setState({
                ficheiro:videoBlob
              })
            }}
          />
  
            <input type="file" onChange={this.muda} />
            
            <button onClick={this.enviavideo}> SUBMETER O VIDEO</button>
  
            
        </div>
          );
    
    
      }
    }
    
