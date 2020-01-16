import React from 'react';
import axios from 'axios';
import add from '../images_app/adicionar.png';
import elimina from '../images_app/elimina.png';
import CorpoEditarNoticia from '../Containers/CorpoEditarNoticia';
import { Link, Redirect } from 'react-router-dom';

export default class EditarNoticia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_noticia: this.props.match.params.id,
            id_jornal: this.props.match.params.idjornal,
            noticia: null,
            characters: 0,
            tituloNot: null,
            subtituloNot: null,
            corpoNot: null,
            imagemNot: null,
            pChaves: null,
            palavrasChave: [],
            id_seccao: null,
            revisaotexto: null,
            position: 'inherit',
            width: '40%',
            redirect: false

        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/noticias/' + this.state.id_noticia)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    noticia: res.data,
                    tituloNot: res.data.titulo_noticia,
                    subtituloNot: res.data.subtitulo_noticia,
                    corpoNot: res.data.corpo_noticia,
                    imagemNot: res.data.imagem,
                    pChaves: res.data.palavras_chave,
                    id_seccao: res.data.seccao_id
                })
            });

        axios.get('http://noticiarte.ddns.net/api/jornaisseccoes/' + this.state.id_jornal)
            .then((res) => {
                this.setState({
                    seccoesJor: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://noticiarte.ddns.net/api/especinot/' + this.state.id_noticia)
            .then((res) => {
                this.setState({
                    revisaotexto: res.data
                })
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            });
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 400;
            if (isTop !== true) {
                this.setState({
                    position: 'fixed',
                    width: '35%'
                })
            } else {
                this.setState({
                    position: 'inherit',
                    width: '40%'
                })
            }
        })

    }

    recebeConteudo = (evt) => {
        console.log(evt);
        this.setState({
            corpoNot: evt
        })
    }

    adicionaPal = () => {
        if (document.getElementById('keywords').value !== '') {
            let valor = document.getElementById('keywords').value;
            let nova = this.state.palavrasChave.slice();
            nova.push(valor);

            this.setState({
                palavrasChave: nova,
                mostraLista: true
            })

            document.getElementById('keywords').value = '';
        }
    }

    titulo = (evt) => {
        console.log(evt.target.value);
        this.setState({
            tituloNot: evt.target.value
        })
    }

    subtitulo = (evt) => {
        console.log(evt.target.value);
        this.setState({
            subtituloNot: evt.target.value
        })
    }

    imagem = (evt) => {
        console.log(evt.target.files[0]);
        this.setState({
            imagemNot: evt.target.files[0]
        })

        if (evt.target.files && evt.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('imageUploaded').src = e.target.result;
                document.getElementById('imageUploaded2').style.display = 'none';
            }

            reader.readAsDataURL(evt.target.files[0]);
            /* this.setState({
                display: 'none'
            }) */
        }
    }

    seccao_id = (evt) => {
        console.log(evt.target.value);
        this.setState({
            id_seccao: evt.target.value
        })
    }

    retiraPalavra = (id_palavra) => {
        this.state.palavrasChave.splice(id_palavra, 1);

        this.setState({
            palavrasChave: this.state.palavrasChave
        })
    }

    editarNoticia = () => {
        const formData = new FormData()
        formData.append('titulo_noticia', this.state.tituloNot)
        formData.append('subtitulo_noticia', this.state.subtituloNot)
        formData.append('corpo_noticia', this.state.corpoNot)
        formData.append('imagem', this.state.imagemNot)
        formData.append('seccao_id', this.state.id_seccao)
        formData.append('palavras_chave', this.state.pChaves + ', ' + this.state.palavrasChave)
        formData.append('_method', "put");
        const options2 = {
            url: 'http://noticiarte.ddns.net/api/noticias/' + this.state.id_noticia,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            method: 'post',
            data: formData
        };
        axios(options2).then((response) => {
            console.log(response)
            this.setState({ redirect: true })
        }).catch((erro) => {
            console.log(erro)
        })

    }


    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={'/jornalnot/' + this.state.id_noticia} />;
        }
        if (!this.state.noticia || !this.state.seccoesJor || !this.state.revisaotexto) {
            return (
                <div>
                    <h1>Editar</h1>
                    <div id="carrega">A carregar...</div>
                </div>
            );
        } else {
            const seccoesJor = this.state.seccoesJor.map((seccaoJor, i) => {
                if (this.state.noticia.seccao_id == seccaoJor.seccao_id) {
                    return (
                        <option key={'option1' + i} value={seccaoJor.seccao_id} selected>{seccaoJor.seccao.nome_seccao}</option>
                    );
                } else {
                    return (
                        <option key={'option' + i} value={seccaoJor.seccao_id}>{seccaoJor.seccao.nome_seccao}</option>
                    )
                }
            });

            let palavras;

            if (this.state.palavrasChave !== []) {
                palavras = this.state.palavrasChave.map((palavra, i) => {
                    return (
                        <div className="palavraSel" key={'div' + i} id={i}>
                            {palavra}
                            <img src={elimina} onClick={() => this.retiraPalavra(i)} />
                        </div>
                    );
                });
            } else {
                palavras = <div id="naoVe"></div>;
            }

            return (
                <div>
                    <h1>Editar</h1>
                    <div id="criarNot">
                        <h4>Editar notícia</h4>
                        <p id="notP">Edita a tua notícia e envia para revisão!</p>

                        <div id="esq">
                            <textarea rows="2" name="tituloNot" placeholder="Adicionar um título" value={this.state.tituloNot} onChange={this.titulo}></textarea>
                            <textarea rows="4" name="subtituloNot" placeholder="Adicionar um subtítulo" value={this.state.subtituloNot} onChange={this.subtitulo}></textarea>

                            <img src="" id="imageUploaded" />
                            <label htmlFor="imagemNot" style={{ display: this.state.display }}>
                                <img src={add} />
                                Clica para editar a imagem da notícia.</label>
                            <input type="file" name="imagemNot" id="imagemNot"
                                onChange={this.imagem} />
                            <img src="" id="imageUploaded" />
                            <img src={'http://noticiarte.ddns.net/uploads/' + this.state.imagemNot} id="imageUploaded2" />

                            <div onKeyDown={this.onKeyPress}>
                                <CorpoEditarNoticia conteudo={this.recebeConteudo} corpo={this.state.corpoNot} />
                            </div>

                            <label htmlFor="seccaoNot" className="labelNot">Escolhe a secção da notícia</label>
                            <select name="seccaoNot" id="seccaoNot" onChange={this.seccao_id}>
                                {seccoesJor}
                            </select>

                            <div id="palavrasChave">
                                <div id="labelPalavrasChave">Palavras-chave</div>
                                <input type="text" name="keywords" id="keywords" />
                            </div>

                            <button id="addPalavraChave" onClick={this.adicionaPal}>Adicionar</button>

                            <div id="caixa">
                                <div className="palavraSel">
                                    {this.state.pChaves}
                                </div>
                                {palavras}
                            </div>
                        </div>

                        <div id="dir" style={{ position: this.state.position, width: this.state.width }}>
                            {this.state.revisaotexto.length > 0 ?
                                <div id="guia">
                                    <div id="balao">
                                        <h6>Revisão</h6>
                                        <p className="guia">{this.state.revisaotexto[0].texto_feedback}</p>
                                    </div>

                                </div> :
                                ''
                            }

                            <div id="botoesRevGuarda">
                                <button id="revisao" onClick={this.editarNoticia}>Enviar para revisão</button>
                                <button id="guardar" onClick={this.editarNoticia}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}