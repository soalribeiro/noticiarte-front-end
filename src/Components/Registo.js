import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default class Registo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            nomeInput: null,
            emailInput: null,
            userInput: null,
            password: null,
            password2: null,
            message: null,
            hidden: true,
            // olho: nao_password_img,
            redirect: false
        };
    }



    onChangenome = (e) => {
        this.setState({ nomeInput: e.target.value })
    }

    onChangeemail = (e) => {
        this.setState({ userInput: e.target.value })
    }

    onChangeusername = (e) => {
        this.setState({ emailInput: e.target.value })
    }

    onChangepassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onChangepassword2 = (e) => {
        this.setState({ password2: e.target.value })
    }

    formperfil = () => {
        if (this.state.userInput != null || this.state.nomeInput != null
            || this.state.emailInput != null || this.state.password != null) {
            if (this.state.password2 == this.state.password) {
                
                var bodyFormData = new FormData();
                bodyFormData.set('username', this.state.userInput);
                bodyFormData.set('email', this.state.emailInput);
                bodyFormData.set('nome', this.state.nomeInput);
                bodyFormData.set('password', this.state.password);


                const options = {
                    method: 'post',
                    url: 'http://noticiarte.ddns.net/api/user',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: bodyFormData
                };

                axios(options).then((response) => {
                    this.setState({
                        redirect:true
                    });

                }).catch((erro) => {
                    console.log(erro)
                })

            } else {
                this.setState({
                    message: 'A password tem de ser igual'
                })

            }

        }
    }

    render() {
        if (this.state.message !== null) {
            this.timer = setTimeout(() => {
                this.setState({
                    message: null
                })
            }, 5000);
        }

        if(this.state.redirect){
            return <Redirect to='/' />
        }
        return (
            <div id="perfil">
                <h1>Registo</h1>
                <Link to={'/'}>
                    <button className="btn_back" onClick={this.changePage}>
                        Voltar
                            </button>
                </Link>

                <div id="inputsPerfil">

                    <div className="inputs">
                        <div className="labelInput">Nome</div>
                        <input className="input_text_perfil"
                            type="text"
                            placeholder="nome"
                            onChange={this.onChangenome}
                        />
                    </div>

                    <div className="inputs">
                        <div className="labelInput">Username</div>
                        <input className="input_text_perfil"
                            type="text"
                            placeholder="username"
                            onChange={this.onChangeusername}

                        />
                    </div>

                    <div className="inputs">
                        <div className="labelInput">Email</div>
                        <input className="input_text_perfil"
                            type="email"
                            placeholder="email"
                            onChange={this.onChangeemail}

                        />
                    </div>


                    <div className="inputs">
                        <div className="labelInput">Password</div>
                        <input className="input_text_perfil"
                            type="password"
                            placeholder="password"
                            onChange={this.onChangepassword}

                        />
                    </div>
                    <div className="inputs">
                        <div className="labelInput">Confirma Password</div>
                        <input className="input_text_perfil"
                            type="password"
                            placeholder="password"
                            onChange={this.onChangepassword2}

                        />
                    </div>
                </div>
                <p className="p_message">{this.state.message}</p>

                <button onClick={this.formperfil} className="btn_normal">
                    Registar
                    </button>
            </div>
        )
    }
}
