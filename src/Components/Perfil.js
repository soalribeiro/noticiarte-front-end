import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
let teste;
export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: sessionStorage.getItem('id_user'),
            userdata: 'null',
            profissao: null,
            instituicao: null,
            userInput: '',
            emailInput: '',
            nomeInput: '',
            biografia: '',
            datanasci: '',
            profuser: '',
            id_instituicao: '',
            imagem: '',
            mudarImage: '',
            varimage: false,
            varprof:false
        };
    }
    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/user/' + this.state.user_id)
            .then((response) => {
                this.setState({
                    nomeInput: response.data.user[0].nome,
                    userInput: response.data.user[0].username,
                    emailInput: response.data.user[0].email,
                    biografia: response.data.user[0].biografia,
                    datanasci: response.data.user[0].data_nascimento,
                    profuser: response.data.user[0].profissao,
                    id_instituicao: response.data.user[0].instituicao,
                    imagem: response.data.user[0].image,
                    profissao: response.data.profissao,
                    instituicao: response.data.instituicao
                })
                console.log(response.data);
             
            });
    }
    onChangeusername = (e) => {
        const userInput = e.currentTarget.value;
        this.setState({
            userInput: e.currentTarget.value
        });
    };
    onChangenome = (e) => {
        const userInput = e.currentTarget.value;
        this.setState({
            nomeInput: e.currentTarget.value
        });
    };
    onChangeemail = (e) => {
        const userInput = e.currentTarget.value;
        this.setState({
            emailInput: e.currentTarget.value
        });
    };
    onChangebiografia = (e) => {
        const userInput = e.currentTarget.value;
        this.setState({
            biografia: e.currentTarget.value
        });
    }
    onChangedata = (e) => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let datahoje = year + '-' + 0 + month + '-' + date;
        if (datahoje == e.currentTarget.value) {
            this.setState({
                datanasci: ''
            });
            teste = <div><p>Não podes escolher essa data</p></div>;
            return teste;
        } else if (e.currentTarget.value > datahoje) {
            this.setState({
                datanasci: ''
            });
            teste = <div><p>Não podes escolher essa data porque és futurista de mais</p></div>;
            return teste;
        } else {
            const userInput = e.currentTarget.value;
            this.setState({
                datanasci: e.currentTarget.value
            });
            teste = <div><p></p></div>;
            return teste;
        }
    }
    onChangeprofissao = (e) => {
        this.setState({
            profuser:  e.target.value,
            varprof:true
        });
    }
    verificaOption = (evt) => {
        this.setState({
            id_instituicao: evt.target.value
        })
    }
    onChangeImage = (e) => {
        this.setState({
            imagem: e.target.files[0],
            varimage: true
        })
    }
    formperfil = () => {
       console.log(this.state.id_instituicao)
       console.log(this.state.profuser)
            const formData = new FormData()
            formData.append('nome', this.state.nomeInput)
            formData.append('username', this.state.userInput)
            formData.append('biografia', this.state.biografia)
            formData.append('data_nascimento', this.state.datanasci)
            formData.append('profissao_id', this.state.profuser)
            formData.append('instituicao_id', this.state.id_instituicao)
            formData.append('image', this.state.imagem)
            formData.append('_method', "put");
            const options2 = {
                url: 'http://noticiarte.ddns.net/api/user/' + this.state.user_id,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                method: 'post',
                data: formData
            };
            axios(options2).then((response) => {
                window.location.reload();
            }).catch((erro) => {
                console.log(erro)
            })
        
    }
    render() {
        
        if (!this.state.profissao || !this.state.instituicao) {
            return (
                <div>
                    <h1>Perfil</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            )
        } else {
            const profissoes = this.state.profissao.map((profisaMap, i) => {
                if (this.state.profuser == null) {
                    return (
                        <option key={'profi' + i} value={profisaMap.id} >{profisaMap.nome_profissao}</option>
                    )
                } else {
                    if (this.state.profuser.id == profisaMap.id) {
                        return (
                            <option key={'profi' + i} value={profisaMap.id} selected>{profisaMap.nome_profissao}</option>
                        )
                    } else {
                        return (
                            <option key={'profi' + i} value={profisaMap.id} >{profisaMap.nome_profissao}</option>
                        )
                    }
                }
            });
            let instituicoes = this.state.instituicao.map((data, index) => {
                if (this.state.id_instituicao == null) {
                    return (
                        <option key={'sele' + index} value={data.id}>{data.nome_instituicao}</option>
                    );
                } else {
                    if (this.state.id_instituicao.id == data.id) {
                        return (
                            <option key={'sele' + index} value={data.id} selected>{data.nome_instituicao}</option>
                        );
                    } else {
                        return (
                            <option key={'sele' + index} value={data.id}>{data.nome_instituicao}</option>
                        );
                    }
                }
            });
            return (
                <div id="perfil">
                    <h1>Perfil</h1>
                    <Link to={'/jornais'}>
                        <button className="btn_back" onClick={this.changePage}>
                            Voltar
                            </button>
                    </Link>
                    <img id="editJornalFoto" src={'http://noticiarte.ddns.net/uploads/' + this.state.imagem} />

                    <div id="inputsPerfil">
                        <div className="inputs">
                            <div className="labelInput">Fotografia</div>
                            <input className="input_text_perfil"
                                type="file"
                                onChange={this.onChangeImage}
                            />
                        </div>

                        <div className="inputs">
                            <div className="labelInput">Nome</div>
                            <input className="input_text_perfil"
                                type="text"
                                placeholder="nome"
                                onChange={this.onChangenome}
                                value={this.state.nomeInput}
                            />
                        </div>

                        <div className="inputs">
                            <div className="labelInput">Username</div>
                            <input className="input_text_perfil"
                                type="text"
                                placeholder="username"
                                onChange={this.onChangeusername}
                                value={this.state.userInput}
                                disabled
                            />
                        </div>

                        <div className="inputs">
                            <div className="labelInput">Email</div>
                            <input className="input_text_perfil"
                                type="email"
                                placeholder="email"
                                onChange={this.onChangeemail}
                                value={this.state.emailInput}
                                disabled
                            />
                        </div>

                        <div className="inputs">
                            <div className="labelInput bio">Biografia</div>
                            <textarea className="input_text_perfil"
                                type="email"
                                placeholder="Escreve algo sobre ti"
                                onChange={this.onChangebiografia}
                                value={this.state.biografia}
                            />
                        </div>

                        <div className="inputs">
                            {teste}
                            <div className="labelInput">Data de nascimento</div>
                            <input className="input_text_perfil data"
                                type="date"
                                onChange={this.onChangedata}
                                value={this.state.datanasci}
                            />
                        </div>

                        <div className="inputs">
                            <div className="labelInput">Profissão</div>
                            <select className="input_text_perfil select" onChange={this.onChangeprofissao}>
                                {profissoes}
                            </select>
                        </div>

                        <div className="inputs">
                            <div className="labelInput">Instituicao</div>
                            <select className="input_text_perfil select"
                                onChange={this.verificaOption}
                            >
                                {instituicoes}
                            </select>
                        </div>
                    </div>

                    <button onClick={this.formperfil} className="btn_normal">
                        Atualizar
                    </button>
                </div>
            )
        }
    }
}