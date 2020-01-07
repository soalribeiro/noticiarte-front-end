import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Manchete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            palete_cores: this.props.palete,
            id_jornal: this.props.id_jornal,
            noticiasjornalmanchete: null
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/cores/' + this.props.palete)
            .then((res) => {
                this.setState({
                    palete_cores: JSON.parse(res.data.rgb_cor)
                })
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://noticiarte.ddns.net/api/manchete/' + this.props.id_jornal)
            .then((res) => {
                console.log(res)
                this.setState({
                    noticiasjornalmanchete: res.data

                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        if (!this.state.palete_cores || !this.state.noticiasjornalmanchete) {
            
            return (
                <div>
                    <h2>Carregando</h2>
                </div>
            )
        } else {
            if(this.state.noticiasjornalmanchete.length==0){
                return (
                    <div>
                        <h3 style={{textAlign:'center'}}>Ainda não tem manchete</h3>
                    </div>
                );
            }else{
                return (
                    <div className="manchete2_div">
                        <Link to={{
                                pathname: '/vernoticias/' + this.state.noticiasjornalmanchete[0].id,
                                state: { noticia_id: this.state.noticiasjornalmanchete[0].id, jornal_id:this.props.id_jornal }
                            }}>
                            <div className="manchete_titulo2">
                                <h5 style={{ textAlign: 'left', color: this.state.palete_cores.cor4 }}>{this.state.noticiasjornalmanchete[0].titulo_noticia}</h5>
                            </div>
                            <div className="manchete_img2" style={{
                                backgroundImage: `url(http://noticiarte.ddns.net/uploads/${this.state.noticiasjornalmanchete[0].imagem})`
                            }}></div>
                            <div className="manchete_subtitulo2">
                                <h6 style={{ textAlign: 'left' }}>{this.state.noticiasjornalmanchete[0].subtitulo_noticia}</h6>
                            </div>
                        </Link>
                    </div>
                )
            }
            
        }
    }
}
