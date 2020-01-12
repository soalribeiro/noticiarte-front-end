import React, { Component } from 'react';
import ReactDOM from "react-dom";

import MobileVideo from './MobileVideo';
import MobileVideo2 from './MobileVideo2';
export default class CriaConteudo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 1,
            textonoticia: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500',

        };
        this.firstSection = React.createRef();

    }
    // componentDidMount() {
    //     ReactDOM.findDOMNode(<MobileVideo />, 'dNKPms')
    //   }


render() {
    return (
        <div>
            <h2>OI</h2>
            <div className="texto_animado_video">
                <p>{this.state.textonoticia}</p>
            </div>
            <MobileVideo  />
        </div>
    )
}
}
