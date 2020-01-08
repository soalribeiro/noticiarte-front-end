import React from 'react';
import axios from 'axios';
import add from '../images_app/adicionar.png';

export default class CriarNoticia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_jornal: this.props.location.state.id_jor,
            id_tipo: this.props.location.state.id_tipo,
            seccoesJor: null
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

            return (
                <div>
                    <h1>Notícia</h1>

                    <div id="criarNot">
                        <h4>Criar notícia</h4>
                        <div id="esq">
                            <input type="text" name="tituloNot" placeholder="Adicionar um título" />
                            <input type="text" name="subtituloNot" placeholder="Adicionar um subtítulo" />

                            <label htmlFor="imagemNot">
                                <img src={add} />
                                Clica aqui para adicionar uma imagem ou vídeo.</label>
                            <input type="file" name="imagemNot" id="imagemNot" />

                            <textarea rows="8" name="corpoNot" placeholder="Escreve o corpo de notícia aqui"></textarea>

                            <label htmlFor="seccaoNot" class="labelNot">Escolhe a secção da notícia</label>
                            <select name="seccaoNot" id="seccaoNot">
                                <option disabled selected>Seleciona uma secção</option>
                                {seccoesJor}
                            </select>


                            <label htmlFor="keywords" class="labelNot">Escreve palavras-chave para a tua notícia</label>
                            <input type="text" name="keywords" id="keywords" />
                        </div>

                        <div id="dir">
                            <p>guias</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}