import React, { Component } from 'react';
import MobileVideo from './MobileVideo';
import RecebeVideo from './RecebeVideo';

export default class CriaConteudo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 1,
            textonoticia: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500',
        };

        this.firstSection = React.createRef();
    }

    render() {
        return (
            <div>
                <h1>Notícia</h1>

                <div className="texto_animado_video">
                    <p>{this.state.textonoticia}</p>
                </div>
                <MobileVideo />
                <RecebeVideo />
            </div>
        )
    }
}