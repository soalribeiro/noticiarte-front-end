import React, { Component } from 'react'

export default class RecebeVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teste: '',
            ficheiro: this.props.ficheiroVideo
        };
    }
    render() {
        console.log(this.state.ficheiro)
        if (!this.state.ficheiro) {
            return (
                <div>
                    <p>Aguardar</p>
                </div>
            )
        } else {
            return (
                <div id="class">
                    <video autoplay loop controls src={this.state.ficheiro} ></video>
                </div>
            )
        }

    }
}
