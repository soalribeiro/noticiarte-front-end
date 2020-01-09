import React from 'react';
import axios from 'axios';
import add from '../images_app/adicionar.png';
import CorpoNoticia from '../Containers/CorpoNoticia';
import elimina from '../images_app/elimina.png';
import { Redirect } from 'react-router-dom';

export default class CriarNoticia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo_noticia: null,
            subtitulo_noticia: null,
            corpoNot: null,
            imagem: null,
            palavrasChave: [],
            id_jornal: this.props.location.state.id_jor,
            id_user: sessionStorage.getItem('id_user'),
            id_seccao: null,
            id_tipo: this.props.location.state.id_tipo,
            seccoesJor: null,
            display: 'inline-block'
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/jornaisseccoes/' + this.state.id_jornal)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    seccoesJor: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    titulo = (evt) => {
        this.setState({
            titulo_noticia: evt.target.value
        })
    }

    subtitulo = (evt) => {
        this.setState({
            subtitulo_noticia: evt.target.value
        })
    }

    imagem = (evt) => {
        this.setState({
            imagem: evt.target.files[0]
        })

        if (evt.target.files && evt.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('imageUploaded').src = e.target.result;
            }

            reader.readAsDataURL(evt.target.files[0]);
            this.setState({
                display: 'none'
            })
        }
    }

    seccao_id = (evt) => {
        console.log(evt.target.value);
        this.setState({
            id_seccao: evt.target.value
        })
    }

    recebeConteudo = (evt) => {
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
                palavrasChave: nova
            })

            document.getElementById('keywords').value = '';
        }
    }

    retiraPalavra = (id_palavra) => {
        this.state.palavrasChave.splice(id_palavra, 1);

        this.setState({
            palavrasChave: this.state.palavrasChave
        })
    }

    criaNoticia = () => {
        function makeid() {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 24; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        //const url = makeid() + '-' + this.state.palavrasChave[0];
        const url = makeid();

        const { titulo_noticia, subtitulo_noticia, corpoNot, imagem, id_jornal, id_seccao, id_user, palavrasChave, id_tipo } = this.state;

        if (titulo_noticia !== null || subtitulo_noticia !== null || corpoNot !== null
            || imagem !== null || id_jornal !== null || id_seccao !== null || id_user !== null
            || palavrasChave !== null || id_tipo !== null) {

            var noticia = new FormData();
            noticia.set('url_noticia', url);
            noticia.set('titulo_noticia', titulo_noticia);
            noticia.set('subtitulo_noticia', subtitulo_noticia);
            noticia.set('corpo_noticia', corpoNot);
            noticia.set('imagem', imagem);
            noticia.set('palavras_chave', palavrasChave);
            noticia.set('jornal_id', id_jornal);
            noticia.set('user_id', id_user);
            noticia.set('seccao_id', id_seccao);
            noticia.set('estadonoticia_id', 2);
            noticia.set('tiponoticias_id', id_tipo);
            noticia.set('manchete', 0);

            const options = {
                method: 'post',
                url: 'http://noticiarte.ddns.net/api/noticias',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: noticia
            };

            axios(options).then((res) => {
                console.log(res);
                return <Redirect to="/jornais" />
            }).catch((err) => {
                console.log(err)
            })
        } else {
            console.log('Preenche os campos');
        }
    }

    render() {
        if (!this.state.seccoesJor) {
            return (
                <div>
                    A carregar
                </div>
            );
        } else {
            const seccoesJor = this.state.seccoesJor.map((seccaoJor, i) => {
                return (
                    <option key={'option' + i} value={seccaoJor.seccao_id}>{seccaoJor.seccao.nome_seccao}</option>
                )
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
                    <h1>Notícia</h1>

                    <div id="criarNot">
                        <h4>Criar notícia</h4>
                        <div id="esq">
                            <input type="text" name="tituloNot" placeholder="Adicionar um título" onChange={this.titulo} />
                            <input type="text" name="subtituloNot" placeholder="Adicionar um subtítulo" onChange={this.subtitulo} />

                            <label htmlFor="imagemNot" style={{ display: this.state.display }}>
                                <img src={add} />
                                Clica aqui para adicionar uma imagem ou vídeo.</label>
                            <input type="file" name="imagemNot" id="imagemNot"
                                onChange={this.imagem} />
                            <img src="" id="imageUploaded" />

                            <CorpoNoticia conteudo={this.recebeConteudo} />

                            <label htmlFor="seccaoNot" class="labelNot">Escolhe a secção da notícia</label>
                            <select name="seccaoNot" id="seccaoNot" onChange={this.seccao_id}>
                                <option disabled defaultValue>Seleciona uma secção</option>
                                {seccoesJor}
                            </select>

                            <div id="palavrasChave">
                                <div id="labelPalavrasChave">Palavras-chave</div>
                                <input type="text" name="keywords" id="keywords" />
                            </div>

                            <button id="addPalavraChave" onClick={this.adicionaPal}>Adicionar</button>

                            <div id="caixa">
                                {palavras}
                            </div>
                        </div>

                        <div id="dir">
                            <p>guias</p>

                            <button id="revisao" onClick={this.criaNoticia}>Enviar para revisão</button>
                            <button id="guardar">Guardar</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}