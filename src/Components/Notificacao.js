import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotificacaoIcon from '../images_app/notificacao.png'
export default class Notificacao extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/noticias/')
            .then((response) => {
                this.setState({
                    infonoticia: response.data
                })
                console.log(response.data)
            });

    }

    render() {
        return (
            <div>
                <button className="notificacao">
                    <div className="notif_red">{100}</div>
                    <img src={NotificacaoIcon} />
                </button>
            </div>
        )
    }
}
