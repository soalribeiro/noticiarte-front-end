import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
export default class MobileVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teste: '',
      ficheiro: ''
    };
  }

  componentDidMount() {
    let constraintObj = {
      audio: false,
      video: {
        facingMode: "user",
        width: { min: 340, ideal: 340, max: 400 },
        height: { min: 480, ideal: 480, max: 1080 }
      }
    };
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    //handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia = function (constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
      }
    } else {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          devices.forEach(device => {
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
          })
        })
        .catch(err => {
          console.log(err.name, err.message);
        })
    }

    navigator.mediaDevices.getUserMedia(constraintObj)
      .then(function (mediaStreamObj) {
        //connect the media stream to the first video element
        let video = document.querySelector('video');
        if ("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        } else {
          //old version
          video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = function (ev) {
          //show in the video element what is being captured by the webcam
          video.play();
        };

        //add listeners for saving video/audio
        let start = document.getElementById('btnStart');
        let stop = document.getElementById('btnStop');
        let vidSave = document.getElementById('vid2');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

        start.addEventListener('click', (ev) => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
        })
        stop.addEventListener('click', (ev) => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
        });
        mediaRecorder.ondataavailable = function (ev) {
          chunks.push(ev.data);
        }
        mediaRecorder.onstop = (ev) => {
          let blob = new Blob(chunks, { 'type': 'video/webm;' });
          chunks = [];
          
          let videoURL = window.URL.createObjectURL(blob);
          vidSave.src = videoURL;
          console.log(blob)
          console.log(videoURL)
        }
      })
      .catch(function (err) {
        console.log(err.name, err.message);
      });
  }

  handleRecordingComplete = () => {

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
        <p><button className="dNKPms" id="btnStart">START RECORDING</button><br />
          <button className="btn_deletesearch" id="btnStop">STOP RECORDING</button></p>

        <video controls></video>

        <video id="vid2" controls></video>

      </div>
    );
  }
}

