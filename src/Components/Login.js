import React, { Component } from 'react'
import axios from 'axios';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            userInput: '',
            password: ''
        };
    }



    onChange = (e) => {


        const userInput = e.currentTarget.value;
        console.log(userInput);

        this.setState({
            userInput: e.currentTarget.value
        });
    };

    onChangepassword = (password) => {


        const userInput = password.currentTarget.value;
        console.log(userInput);

        this.setState({
            password: password.currentTarget.value
        });
    };

    login = () => {
        var bodyFormData = new FormData();
        bodyFormData.set('username', this.state.userInput);
        bodyFormData.set('password', this.state.password);

        const options = {
            method: 'post',
            url: 'http://192.168.1.5:3000/api/login',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData
        };

        axios(options).then((response) => {
            console.log(response);
        }).catch((erro) => {
            console.log(erro)
        })
    }

    render() {
        return (
            <div className="login">
                <input className="input_text"
                    type="email"
                    placeholder="email"
                    onChange={this.onChange}
                    value={this.state.userInput}
                    onClick={this.inputuser}
                />

                <input className="input_text"
                    type="password"
                    placeholder="password"
                    onChange={this.onChangepassword}
                    value={this.state.password}
                    onClick={this.inputuser2}
                />

                <button className="btn_normal" onClick={this.login}>
                    Entrar
                </button>
            </div>
        );
    }
}
