import React, { Component } from 'react'
import axios from 'axios';

export default class RecebeVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teste: '',
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
        console.log(this.state.ficheiro)
        if (!this.state.ficheiro) {
            return (
                <div id="carrega">A carregar...</div>
            )
        } else {
            const videos = this.state.ficheiro.map((video, i) => {
                return (
                    <video key={'option' + i} id="videos" autoplay loop controls src={'http://noticiarte.ddns.net/uploads/' + video.url_conteudo} type="video/mp4"></video>
                )
            });
            return (
                <div>
                    <div className="pc">
                        <h3 style={{
                            textAlign: 'center', fontSize: '1.2rem', marginTop: '8%'
                        }}>Só funciona na versão mobile</h3>
                    </div>
                    <div className="mobile">
                        {videos}
                    </div>
                </div>
            )
        }
    }
}