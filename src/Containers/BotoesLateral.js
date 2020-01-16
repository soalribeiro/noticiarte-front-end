import React from 'react';
import { Link } from 'react-router-dom';
import Notificacao from '../Components/Notificacao';
import Perfil from '../images_app/perfil.png';
import Pesquisa from '../images_app/lupa_azul.png';

export default class BotoesLateral extends React.Component {
    render() {
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
            </div>
        );
    }
}