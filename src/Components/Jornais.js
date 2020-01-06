import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default class Jornais extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jornaishasusers: null
        };
    }

    componentDidMount() {
        axios.get('http://noticiarte.ddns.net/api/userjornais')
            .then((response) => {
                this.setState({
                    jornaishasusers: response.data
                })
                console.log(response.data);
            });
    }

    render() {
        if (this.state.jornaishasusers == null) {
            return (
                <div>
                    <p className="p_registate">Carregando...</p>
                </div>
            );
        } else if (this.state.jornaishasusers != null) {
            var jornaisHasUsers = this.state.jornaishasusers;
            let listItems = jornaisHasUsers.map((data, index) => {
                if (jornaisHasUsers[index].role_id == 2)
                    return (
                        <div className="card-jornal">
                            <img key={index} src={`http://noticiarte.ddns.net/uploads/${jornaisHasUsers[index].jornal.imagem_jornal}`} />
                            <h4 key={index}>{jornaisHasUsers[index].jornal.nome_jornal}</h4>
                            <p key={index}>{jornaisHasUsers[index].jornal.descricao}</p>
                            <p key={index}>Editor: {jornaisHasUsers[index].user.username}</p>
                            <Link key={index} to={{
                                pathname: '/verjornal/' + jornaisHasUsers[index].jornal.id,
                                state: { jornal_id: jornaisHasUsers[index].jornal.id }
                            }}><button key={index} className="btn_normal" onClick={this.login}>Ver</button></Link>
                            <Link key={index} to={"/aderir/" + jornaisHasUsers[index].jornal.id}><button key={index} className="btn_normal" onClick={this.login}>Aderir</button></Link>
                        </div>
                    );
            });

            return (
                <div className="feedJornal">
                    <h1>Jornal</h1>

                    <div>
                        <h2>Os teus jornais</h2>
                        <span></span>
                    </div>

                    <div id="card-outros-jornais">
                        <h2>Outros jornais</h2>
                        {listItems}
                    </div>
                </div>
            );
        }
    }
}