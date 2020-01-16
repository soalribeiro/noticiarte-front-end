import React, { Component } from 'react'
import axios from 'axios';
import ListaSeccoes from './ListaSeccoes';
import { Link, Redirect } from 'react-router-dom';
import PersonalizaJornal from './PersonalizaJornal';
import manchete1 from '../images_app/manchete01.png';
import manchete2 from '../images_app/manchete2.png';
import coluna1 from '../images_app/coluna01.png';
import coluna2 from '../images_app/coluna2.png';
import Manchete from './CriarNoticias/Manchete';
import Manchete2 from './CriarNoticias/Manchete2';

let mancha;

export default class CriarJornal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: sessionStorage.getItem('id_user'),
            seccoes: null,
            instituicao: null,
            listasec: false,
            pagina: false,
            nome_jornal: null,
            descricao: null,
            contacto: null,
            seccaos_ar: [],
            id_instituicao: null,
            imagem: null,
            cores: null,
            id_cor: null,
            html: null,
            manchete_name: null,
            colunas_name: null,
            jornaildousers: null,
            redirect: false
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/seccao')
            .then((response) => {
                this.setState({
                    seccoes: response.data
                })
            });

        axios.get('http://noticiarte.ddns.net/api/instituicao')
            .then((response) => {
                this.setState({
                    instituicao: response.data
                })
            });

        axios.get('http://noticiarte.ddns.net/api/cores')
            .then((response) => {
                this.setState({
                    cores: response.data
                })
            });
    }

    change = () => {
        document.getElementById('inputjornal').style.border = "4px solid #0554F2";
    }

    inserirseccao = () => {
        this.setState({
            listasec: true
        })
    }

    novasec = (dataLista) => {
        this.setState({
            seccoes: dataLista
        });

        var seccao = new FormData();
        seccao.set('nome_seccao', this.state.seccoes[this.state.seccoes.length - 1]);

        const options = {
            method: 'post',
            url: 'http://noticiarte.ddns.net/api/seccao',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: seccao
        };

        axios(options).then((response) => {
            console.log(response.data);

            axios.get('http://noticiarte.ddns.net/api/seccao')
                .then((response) => {
                    this.setState({
                        seccoes: response.data,
                        listasec: false
                    })
                });
        }).catch((erro) => {
            console.log(erro)
        })
    }

    input1 = (evt) => {
        this.setState({
            nome_jornal: evt.target.value
        })
    }

    input2 = (evt) => {
        this.setState({
            descricao: evt.target.value
        })
    }

    input3 = (evt) => {
        this.setState({
            contacto: evt.target.value
        })
    }


    verificaCheck = (evt) => {

        let selecionados = this.state.seccaos_ar.slice();
        selecionados.push(evt.target.value)
        this.setState({
            seccaos_ar: selecionados
        })

    }

    verificaOption = (evt) => {
        this.setState({
            id_instituicao: evt.target.value
        })
    }

    image = (evt) => {

        this.setState({
            imagem: evt.target.files[0]
        });
    }

    changePage = () => {
        this.setState({
            pagina: true
        })
    }

    paginafake = () => {
        this.setState({
            pagina: false
        })
    }

    inputcor = (evt) => {
        this.setState({
            id_cor: evt.target.value
        });
    }

    inputmanchete = (evt) => {
        this.setState({
            manchete_name: evt.target.value
        });

        if (this.state.colunas_name != null) {
            this.fazhtml();
        }
    }

    inputcolunas = (evt) => {
        this.setState({
            colunas_name: evt.target.value
        });

        if (this.state.manchete_name != null && this.state.cores) {
            this.fazhtml();
        }
    }

    fazhtml = () => {
        if (this.state.manchete_name && this.state.colunas_name) {
            let html_json = {
                "Manchete": this.state.manchete_name,
                "colunas": this.state.colunas_name
            }
            this.setState({
                html: JSON.stringify(html_json)
            })
        }
    }

    submeter = () => {
        if (this.state.manchete_name != null && this.state.colunas_name != null) {
            this.fazhtml();
       

        if (this.state.nome_jornal == null ||
            this.state.imagem == null ||
            this.state.descricao == null ||
            this.state.contacto == null ||
            this.state.html == null ||
            this.state.id_instituicao == null ||
            this.state.id_cor == null) {
            console.log('preencha os campos')
        } else if (this.state.html !== null && this.state.manchete_name != null && this.state.colunas_name != null) {
            var bodyFormData = new FormData();
            bodyFormData.set('nome_jornal', this.state.nome_jornal);
            bodyFormData.set('imagem_jornal', this.state.imagem);
            bodyFormData.set('descricao', this.state.descricao);
            bodyFormData.set('contacto', this.state.contacto);
            bodyFormData.set('html_json', this.state.html);
            bodyFormData.set('instituicao_id', this.state.id_instituicao);
            bodyFormData.set('cor_id', this.state.id_cor);
            const options = {
                method: 'post',
                url: 'http://noticiarte.ddns.net/api/jornais',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: bodyFormData
            };

            axios(options).then((response) => {
                setTimeout(() => {
                    this.userhasjornal();
                }, 500);
            }).catch((erro) => {
                console.log(erro)
            })

        }
    }

    }


    userhasjornal = () => {
        axios.get('http://noticiarte.ddns.net/api/jornais')
            .then((response) => {
                console.log(response.data);
                this.novafuncao(response.data)
            }).catch((err) => {
                console.log(err);
            });
    }

    novafuncao = (todos) => {
        console.log(todos)
        setTimeout(() => {
            var bodyFormData = new FormData();
            bodyFormData.set('role_id', 2);
            bodyFormData.set('user_id', this.state.user_id);
            bodyFormData.set('jornal_id', todos[todos.length - 1].id);
            let jornalID = todos[todos.length - 1].id;
            const options2 = {
                method: 'post',
                url: 'http://noticiarte.ddns.net/api/userjornais',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: bodyFormData
            };
            axios(options2).then((res) => {
                this.seccaoJornal(jornalID);
                console.log(res);
                /* return <Redirect to={'/jornais'} /> */
            }).catch((erro) => {
                console.log(erro)
            })
        }, 500);
    }

    seccaoJornal = (jornalID) => {
        let i;
        for (i = 0; i < this.state.seccaos_ar.length; i++) {
            var bodyFormData = new FormData();
            bodyFormData.set('seccao_id', this.state.seccaos_ar[i]);
            bodyFormData.set('jornal_id', jornalID);
            const options2 = {
                method: 'post',
                url: 'http://noticiarte.ddns.net/api/jornaisseccoes',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: bodyFormData
            };
            axios(options2).then((response) => {
                console.log(response);
                this.setState({ redirect: true });
            }).catch((erro) => {
                console.log(erro)
            })
        }

    }

    render() {

        console.log(this.state.id_cor)
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={'/jornais'} />;
        }
        if (!this.state.seccoes || !this.state.instituicao) {
            return (
                <div>
                    <h1>Jornal</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {

            if (this.state.pagina == false) {
                let listItems = this.state.seccoes.map((data, index) => {
                    return (
                        <div className="seccoesJornalEscolha">
                            <input onChange={this.verificaCheck} key={'inp' + index} id={'seccao' + index} type="checkbox" name="seccao_id" value={data.id} />
                            <label key={'label' + index} htmlFor={'seccao' + index}>{data.nome_seccao}</label>
                        </div>
                    );
                });

                let listItems2 = this.state.instituicao.map((data, index) => {
                    return (
                        <option key={'sele' + index} value={data.id}>{data.nome_instituicao}</option>
                    );
                });

                return (
                    <div>
                        <h1>Jornal</h1>

                        <div className="criarjornal">
                            <h4>Criar jornal</h4>
                            <p style={{ marginBottom: '60px' }}>Começa a explorar, cria o teu jornal!</p>

                            <div>
                                <div className="bluediv">
                                    <p>Nome do jornal</p>
                                </div>
                                <input placeholder="Escolhe um nome para o teu jornal" onChange={this.input1} id="inputjornal" className="inputjornal" type="text" />
                            </div>

                            <div>
                                <div id="bluedivDesc">
                                    <p>Descrição</p>
                                </div>
                                <textarea onChange={this.input2} id="inputjornal2" placeholder="Uma breve descrição" className="inputjornal2" type="text"></textarea>
                            </div>

                            <div>
                                <div className="bluediv">
                                    <p>Contacto</p>
                                </div>
                                <input placeholder="Coloca aqui o contacto da tua escola" onChange={this.input3} onClick={this.change} id="inputjornalcontacto" className="inputjornal" type="email" />
                            </div>

                            <div id="bluedivSec">
                                <p>Secções</p>
                            </div>
                            <div id="todasSec">
                                {listItems}
                                <p id="naoEncontra">Não encontras a secção que procuras? Adiciona aqui.</p>
                                <button id="addSec" onClick={this.inserirseccao}>Adicionar secção</button>
                                {this.state.listasec ? <ListaSeccoes arrayseccoes={this.state.seccoes} novaseccao={this.novasec} /> : console.log('')}
                            </div>

                            <div style={{ clear: 'both' }}>
                                <div className="bluediv">
                                    <p>Imagem</p>
                                </div>
                                <input id="inputjornalfile" onChange={this.image} className="inputjornal" type="file" label="hi" />
                            </div>

                            <div>
                                <div className="bluediv">
                                    <p>Instituição</p>
                                </div>
                                <select onChange={this.verificaOption} className="select_instituicao">
                                    <option disabled selected>Seleciona uma instituição</option>
                                    {listItems2}
                                </select>
                            </div>

                            <div className="btn_jornais">
                                <Link className="linkbtn_delete" to="/jornais">
                                    <button className="btn_deletesearch" >
                                        Cancelar
                                </button>
                                </Link>

                                <button className="seguinte" onClick={this.changePage}>Seguinte</button>

                            </div>
                        </div>
                    </div>
                )
            } else {
                /* console.log(this.state.nome_jornal)
                console.log(this.state.descricao)
                console.log(this.state.contacto)
                console.log(this.state.id_instituicao)
                console.log(this.state.imagem)
                console.log(this.state.seccaos_ar) */


                if (!this.state.cores) {
                    return (
                        <div>
                            <h1>Jornal</h1>
                            <div id="carrega">A carregar...</div>
                        </div>
                    );
                } else {
                    let listacores = this.state.cores.map((data, index) => {
                        let cores = JSON.parse(data.rgb_cor)
                        return (
                            <div className="palete_personalizada">
                                <div style={{ backgroundColor: cores.cor1 }}></div>
                                <div style={{ backgroundColor: cores.cor2 }}></div>
                                <div style={{ backgroundColor: cores.cor3 }}></div>
                                <div style={{ backgroundColor: cores.cor4 }}></div>
                                <div style={{ backgroundColor: cores.cor5 }}></div>
                                <input className="input_palete" type="radio" name="input" onChange={this.inputcor} key={'cor' + index} value={data.id} />
                            </div>
                        );
                    });

                    return (
                        <div>
                            <h1>Jornal</h1>

                            <div className="criarjornal">
                                <h4>Criar jornal</h4>
                                <p style={{ marginBottom: '30px' }}>Começa a explorar, cria o teu jornal!</p>
                                <button className="btn_back" onClick={this.paginafake}>Voltar</button>

                                <h5 className="identifica">Escolhe as cores do teu jornal.</h5>
                                <div id="todasCores">
                                    {listacores}
                                </div>

                                <h5 className="identifica">Escolhe a disposição que queres para a notícia em Manchete.</h5>
                                <div className="colman_personalizada">
                                    <div>
                                        <img src={manchete1} />
                                        <input className="input_palete" type="radio" name="input_manchete" onChange={this.inputmanchete} value={'Manchete'} />
                                    </div>
                                    <div>
                                        <img src={manchete2} />
                                        <input className="input_palete" type="radio" name="input_manchete" onChange={this.inputmanchete} value={'Manchete2'} />
                                    </div>
                                </div>

                                <h5 className="identifica">Escolhe como serão apresentadas as outras notícias.</h5>
                                <div className="colman_personalizada">
                                    <div>
                                        <img src={coluna1} />
                                        <input className="input_palete" type="radio" name="input_coluna" onChange={this.inputcolunas} value={'coluna_not1'} />
                                    </div>
                                    <div>
                                        <img src={coluna2} />
                                        <input className="input_palete" type="radio" name="input_coluna" onChange={this.inputcolunas} value={'coluna_not2'} />
                                    </div>
                                </div>


                                <div className="btn_jornais">
                                    <button className="seguinte" onClick={this.submeter}>
                                        Finalizar
                                </button>
                                </div>

                            </div>
                        </div>
                    );
                }

            }

        }
    }
}