import React, { Component } from 'react';
import axios from 'axios';

export default class RecebeVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ficheiro: null
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/conteudonoticia')
            .then((response) => {
                this.setState({
                    ficheiro: response.data
                })
                console.log(response)
            });
    }


    render() {
        if (!this.state.ficheiro) {
            return (
                <div>
                    <h1>Conteúdo</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            )
        } else {
            const videos = this.state.ficheiro.map((video, i) => {
                return (
                    <video className="videos" key={'option' + i} autoplay loop controls src={'http://noticiarte.ddns.net/uploads/' + video.url_conteudo} type="video/mp4"></video>
                )
            });

            return (
                <div id="class">
                    {videos}
                </div>
            )
        }
    }
}