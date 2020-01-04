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

        // const data = {
        //     username: this.state.userInput,
        //     password: this.state.password
        // };

        // const headers = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*'
        // };

        // axios.post('http://192.168.1.5:3000/api/login', {
        //     username: this.state.userInput,
        //     password: this.state.password,
        //     headers: headers
        // }).then(function (response) {
        //     console.log(response)
        // }).catch(function (error) {
        //     console.log(error);
        // });



        // axios.post('http://192.168.1.5:3000/api/login', data, {
        //     headers: headers
        // })
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })


        // const testURL = 'http://192.168.1.5:3000/api/login';
        // const myInit = {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     data: {
        //         username: this.state.userInput,
        //         password: this.state.password
        //     }
        // };

        // fetch('http://192.168.1.5:3000/api/login', {
        //     method: 'post',
        //     mode: 'no-cors',
        //     headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*'},
        //     body: {
        //         username: this.state.userInput,
        //         password: this.state.password
        //     }
        //    }).then( response => { console.log(response);})
        //    .catch(err => console.log(err))



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
