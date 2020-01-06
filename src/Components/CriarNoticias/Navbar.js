import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            palete_cores: this.props.palete,
            seccoes: this.props.seccoes,
            id_jornal: this.props.id_jornal
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

    render() {
        if (!this.props.nomejornal || !this.props.imagejornal || !this.state.palete_cores) {
            return (
                <div>
                    <h2>Carregando</h2>
                </div>
            )
        } else {
            console.log(this.state.seccoes)
            let listItems = this.state.seccoes.map((data, index) => {
                return (
                    <li key={index} >
                        <Link to={'/jornal/' + this.state.id_jornal + '/' + this.state.seccoes[index].seccao.id}
                            style={{ color: this.state.palete_cores.cor3 }}>
                            {this.state.seccoes[index].seccao.nome_seccao}</Link></li>
                );
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
                        <h4 style={{ color: this.state.palete_cores.cor3 }}>{this.props.nomejornal}</h4>
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
