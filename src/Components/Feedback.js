import React, { Component } from 'react'
import axios from 'axios';
import { Link,Redirect } from 'react-router-dom';
export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idnoticia: this.props.match.params.idnoticia,
            user_id: 2,
            textorevisao: '',
            redirect: false
        };
    }

    mudaText = (e) => {
        this.setState({
            textorevisao: e.target.value
        })
    }

    enviarrevision = () => {
        var bodyFormData = new FormData();
        bodyFormData.set('texto_feedback', this.state.textorevisao);
        bodyFormData.set('user_id', this.state.user_id);
        bodyFormData.set('noticia_id', this.state.idnoticia);
        const options = {
            method: 'post',
            url: 'http://noticiarte.ddns.net/api/feedback',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData
        };
        axios(options).then((response) => {
            console.log(response)
            alert('')
            this.setState({ redirect: true });
        }).catch((erro) => {
            console.log(erro)
        })
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={'/redacao'} />;
        }
        return (
            <div>
                <h2>Revisão</h2>
                <textarea className="input_text_perfil" onChange={this.mudaText}></textarea>
                <button className="btn_normal" onClick={this.enviarrevision}>Enviar Revisão</button>
            </div>
        )
    }
}
