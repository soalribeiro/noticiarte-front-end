import React, { Component } from 'react'
import password_img from '../images_app/mostrar_password.png';
import nao_password_img from '../images_app/naomostrar_password.png';
import superarte_ve from '../images_app/superarte_ve.jpg';
import superarte_naove from '../images_app/superarte_naove.jpg';
import axios from 'axios';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            userInput: '',
            password: '',
            message: null
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



    inputuser = () => {

    }

    inputuser2 = () => {

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
            if (response.data.code === 501) {
                this.setState({
                    message: response.data.message
                })
            } else if (response.data.code === 200) {
                alert('entrou com sucesso')
            }
        }).catch((erro) => {
            console.log(erro)
        })
    }

    render() {

        if (this.state.message !== null) {
            this.timer = setTimeout(() => {
                this.setState({ message: null })
            }, 5000);
        }

        return (
            <div className="login">
                <img id="img_login" className="superarte_login" src={superarte_ve} />
                <input className="input_text"
                    type="email"
                    placeholder="email"
                    onChange={this.onChange}
                    value={this.state.userInput}
                    onClick={this.inputuser}
                />
                <div>
                    <input className="input_text"
                        type="password"
                        placeholder="password"
                        onChange={this.onChangepassword}
                        value={this.state.password}
                        onClick={this.inputuser2}
                    />
                </div>


                <p className="p_login">Esqueci-me da palavra-passe
                    <button className="duvida_btn" href=""></button></p>

                <p className="p_message">{this.state.message}</p>
                <button className="btn_normal" onClick={this.login}>
                    Entrar
                </button>
                <p className="p_login_membro">Ainda não és membro?</p>
                <p className="p_registate">Regista-te <a href=""><b>aqui.</b></a></p>

            </div>
        );
    }
}
