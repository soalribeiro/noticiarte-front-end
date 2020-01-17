import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import Notificacao from '../Components/Notificacao';
import Perfil from '../images_app/perfil.png';
import Pesquisa from '../images_app/lupa_azul.png';
import Logout from '../images_app/logout.png';

export default class BotoesLateral extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        };
    }
    destroy = () => {
        sessionStorage.clear();
        this.setState({
            redirect: true
        })
        window.location.reload();
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/' />;
        }
        return (
            <div id="botoesLateral">
                <Link to="/pesquisa">
                    <button className="pesquisa">
                        <img src={Pesquisa} />
                    </button>
                </Link>
                <Notificacao />
                <Link to="/perfil">
                    <button className="perfil">
                        <img src={Perfil} />
                    </button>
                </Link>
                <button onClick={this.destroy} className="pesquisa">
                    <img src={Logout} />
                </button>
            </div>
        );
    }
}