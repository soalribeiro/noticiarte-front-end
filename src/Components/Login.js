import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import password_img from '../images_app/mostrar_password.png';
import nao_password_img from '../images_app/naomostrar_password.png';
import superarte_ve from '../images_app/superarte_ve.jpg';
import superarte_naove from '../images_app/superarte_naove.jpg';
import duvida from '../images_app/duvida.png';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            userInput: '',
            password: '',
            message: null,
            hidden: true,
            olho: nao_password_img,
            superarte: superarte_ve,
            redirect: false
        };
    }

    onChange = (e) => {
        const userInput = e.currentTarget.value;
        this.setState({
            userInput: e.currentTarget.value
        });
    };

    onChangepassword = (password) => {
        const userInput = password.currentTarget.value;
        this.setState({
            password: password.currentTarget.value
        });
    };

    toggleShow = () => {
        if (this.state.olho == nao_password_img) {
            this.setState({
                hidden: !this.state.hidden,
                olho: password_img,
                superarte: superarte_naove
            });
        } else {
            this.setState({
                hidden: !this.state.hidden,
                olho: nao_password_img,
                superarte: superarte_naove
            });
        }
    }

    superarteVe = () => {
        this.setState({
            superarte: superarte_naove
        });
    }

    superarteNaoVe = () => {
        this.setState({
            superarte: superarte_ve
        });
    }

    login = () => {
        var bodyFormData = new FormData();
        bodyFormData.set('username', this.state.userInput);
        bodyFormData.set('password', this.state.password);

        const options = {
            method: 'post',
            url: 'http://noticiarte.ddns.net/api/login',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData
        };

        axios(options).then((response) => {
            console.log(response);

            if (response.data.code == 501) {
                this.setState({
                    message: response.data.message
                });

            } else if (response.data.code === 200) {
                sessionStorage.setItem('id_user', response.data.data.id_user);
                sessionStorage.setItem('username', response.data.data.username);
                sessionStorage.setItem('api_token', response.data.data.api_token);

                this.props.isLoggedIn();
            }
        }).catch((erro) => {
            console.log(erro)
        })
    }

    render() {

        if (this.state.message !== null) {
            this.timer = setTimeout(() => {
                this.setState({
                    message: null
                })
            }, 5000);
        }

        return (
            <div className="login">
                <img id="img_login" className="superarte_login" src={this.state.superarte} />

                <div className="inputs">
                    <div className="labelInput">Username</div>
                    <input className="input_text"
                        type="text"
                        placeholder="username"
                        onChange={this.onChange}
                        value={this.state.userInput}
                    />
                </div>

                <div className="inputs">
                    <div className="labelInput">Password</div>
                    <input className="input_text"
                        type={this.state.hidden ? "password" : "text"}
                        placeholder="password"
                        onChange={this.onChangepassword}
                        value={this.state.password}
                        onFocus={this.superarteVe}
                        onBlur={this.superarteNaoVe}
                    />
                    <button id="olho" onClick={this.toggleShow}>
                        <img src={this.state.olho} />
                    </button>
                </div>

                <p className="p_message">{this.state.message}</p>

                <button className="duvida_btn">
                    <p className="p_login">Esqueci-me da palavra-passe</p>
                    <img src={duvida} />
                </button>

                <button className="btn_normal" onClick={this.login}>
                    Entrar
                </button>
                <p className="p_login_membro">Ainda não és membro?</p>
                <p className="p_registate">Regista-te <Link to={{pathname:'registo'}}><b>aqui.</b></Link></p>
            </div>
        );
    }
}