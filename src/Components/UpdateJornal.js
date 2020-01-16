import React, { Component } from 'react'
import axios from 'axios';
export default class UpdateJornal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jornais: '',
            jornal_id: this.props.match.params.jornalid,
            image_input: '',
            nome_input: '',
            descricao_input: '',
            datanome_Input: '',
            datadesc_Input: '',
            dataimg_Input: '',
        };
    }
    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/jornais/' + this.state.jornal_id)
            .then((response) => {
                this.setState({
                    jornais: response.data,
                    datanome_Input: response.data.nome_jornal,
                    dataimg_Input: response.data.imagem_jornal,
                    datadesc_Input: response.data.descricao,
                })
                console.log(response.data)
                console.log(response.data.nome_jornal)
            });
    }
    mudaimagem = (e) => {
        this.setState({
            dataimg_Input: e.target.files[0],
            image_input: e.target.files[0]
        })
    }
    ondescriJornal = (e) => {
        this.setState({
            datadesc_Input: e.target.value,
            descricao_input: e.target.value
        })
    }
    onnomeJornal = (e) => {
        this.setState({
            datanome_Input: e.target.value,
            nome_input: e.target.value
        })
    }
    updateJornal = () => {
        if (this.state.datanome_Input != null && this.state.datadesc_Input != null) {
            const formData = new FormData()
            formData.append('nome_jornal', this.state.datanome_Input)
            formData.append('imagem_jornal', this.state.dataimg_Input)
            formData.append('descricao', this.state.datadesc_Input)
            formData.append('_method', "put");
            const options2 = {
                url: 'http://noticiarte.ddns.net/api/jornais/' + this.state.jornal_id,
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
        } else {
            console.log('Preencha os campos')
        }
    }
    render() {
        if (!this.state.jornais || !this.state.datadesc_Input || !this.state.datanome_Input) {
            return (
                <div>
                    <h1>Jornal</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Jornal</h1>

                    <img id="editJornalFoto" onChange={this.mudaimagem} src={'http://noticiarte.ddns.net/uploads/' + this.state.jornais.imagem_jornal} />
                    
                    <div id="inputsPerfil">
                        <div className="inputs">
                            <div className="labelInput">Fotografia</div>
                            <input className="input_text_perfil"
                                type="file"
                                onChange={this.mudaimagem}
                            />
                        </div>
                        <div className="inputs">
                            <div className="labelInput">Nome do jornal</div>
                            <input className="input_text_perfil"
                                type="text"
                                value={this.state.datanome_Input}
                                onChange={this.onnomeJornal}
                            />
                        </div>
                        <div className="inputs">
                            <div className="labelInput descJornal">Descrição do jornal</div>
                            <textarea className="input_text_perfil"
                                type="text"
                                value={this.state.datadesc_Input}
                                onChange={this.ondescriJornal}></textarea>
                        </div>
                    </div>

                    <button onClick={this.updateJornal} className="btn_normal">
                        Atualizar
                    </button>
                </div>
            )
        }
    }
}