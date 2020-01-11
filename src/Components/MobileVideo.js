import React, { Component } from 'react'
import { ReactMediaRecorder } from "react-media-recorder";
import VideoRecorder from 'react-video-recorder';
import blobToDataURL from 'blob-util';

export default class MobileVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teste: '',
      ficheiro: ''
    };
  }
  handleRecordingComplete = () => {
    console.log(document.getElementsByClassName('dwGgdi')[0].src)
    let blobfile = document.getElementsByClassName('dwGgdi')[0].src;
    var file = new File([Blob], blobfile, { type: "video/mp4" })

    console.log(file)
       // this.setState({
    //   ficheiro: file
    // })

   
  }

  muda = (evt) => {
    console.log(evt.target.files[0])

  }

  render() {
    return (
      <div>
        <VideoRecorder
          isOnInitially={true}
          showReplayControls={true}
          countdownTime={3000}
          timeLimit={30000}
          onRecordingComplete={this.handleRecordingComplete}
        />

        {/* <button onClick={() => this.handleRecordingComplete()}>
          gregegsdfgd
        </button> */}
        <input type="file" onChange={this.muda} />

        {this.state.ficheiro == null ? console.log('nada') : <video loop autoplay controls scr={this.state.ficheiro.name}></video>}
      </div>
    );
  }
}

