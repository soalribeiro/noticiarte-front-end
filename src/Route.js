import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Listusers from './Components/Listusers';
import Jornais from './Components/Jornais';
import InserirJornal from './Components/InserirJornal';
import Redacao from './Components/Redacao';
import Noticia from './Components/Noticia';
import JornalNot from './Components/JornalNot';
import EditarNoticia from './Components/EditarNoticia';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/listausers' component={Listusers} />
                <Route path='/jornais' component={Jornais} />
                <Route path='/inserirjornal' component={InserirJornal} />
                <Route path='/redacao' component={Redacao} />
                <Route path='/noticia' component={Noticia} />
                <Route path='/jornalnot' component={JornalNot} />
                <Route path='/noticiajornal/:id' component={EditarNoticia} />
            </Switch>
        );
    }
}