import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            palete_cores: this.props.palete,
            seccoes: this.props.seccoes,
            id_jornal: this.props.id_jornal,
            seccao_id: this.props.id_sec,

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
    }


    refresh = (jornal, seccao, palete) => {
        window.location.href = '/vernoticiaseccao/' + jornal + '/'
            + seccao + '/'
            + palete;
    }

    refreshtohome = (jornal) => {
        window.location.href = '/verjornal/' + jornal;
    }

    render() {
        if (!this.props.nomejornal || !this.props.imagejornal
            || !this.state.palete_cores || !this.state.seccao_id) {
            return (
                <div id="carrega">A carregar...</div>
            )
        } else {
            let listItems = this.state.seccoes.map((data, index) => {
                if (this.state.seccao_id == this.state.seccoes[index].seccao.id) {
                    return (
                        <li key={index} >
                            <Link to={'/vernoticiaseccao/' + this.state.id_jornal + '/'
                                + this.state.seccoes[index].seccao.id + '/'
                                + this.props.palete}
                                style={{ color: this.state.palete_cores.cor3 }}>
                                <b>{this.state.seccoes[index].seccao.nome_seccao}</b>
                            </Link>
                        </li>
                    );
                } else {
                    return (
                        <li key={index} >
                            <Link to={'/vernoticiaseccao/' + this.state.id_jornal + '/'
                                + this.state.seccoes[index].seccao.id + '/'
                                + this.props.palete} style={{ color: this.state.palete_cores.cor3 }}
                                onClick={() => this.refresh(this.state.id_jornal, this.state.seccoes[index].seccao.id, this.props.palete)} >
                                {this.state.seccoes[index].seccao.nome_seccao}
                            </Link>
                        </li>
                    );
                }

            });
            return (
                <div>
                    <div style={{ backgroundColor: this.state.palete_cores.cor1, overflow: 'hidden' }}>
                        <div className="image_jornal"
                            style={{ backgroundImage: `url(http://noticiarte.ddns.net/uploads/${this.props.imagejornal})` }}></div>
                    </div>
                    <div style={{
                        width: '100%',
                        backgroundColor: this.state.palete_cores.cor2,
                        overflow: 'hidden'
                    }}>
                        <Link to={{
                            pathname: '/verjornal/' + this.state.id_jornal,
                            state: { jornal_id: this.state.id_jornal }
                        }}><h4 style={{ color: this.state.palete_cores.cor3 }} onClick={() => this.refreshtohome(this.state.id_jornal)}>{this.props.nomejornal}</h4> </Link>
                        <nav className="nav_jornal">
                            <ul>
                                {listItems}
                            </ul>
                        </nav>
                    </div>
                </div>
            )
        }

    }
}
