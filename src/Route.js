import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Listusers from './Components/Listusers';
import Jornais from './Components/Jornais';
import InserirJornal from './Components/InserirJornal';
import Redacao from './Components/Redacao';
import Noticia from './Components/Noticia';
import JornalNot from './Components/JornalNot';
import EditarNoticia from './Components/EditarNoticia';
import CriarNoticia from './Components/CriarNoticia';
import EscolherTipoNot from './Components/EscolherTipoNot';
import AtividadeRecente from './Components/AtividadeRecente';
import Editoria from './Components/Editoria';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Jornais} />
                <Route path='/listausers' component={Listusers} />
                <Route path='/jornais' component={Jornais} />
                <Route path='/inserirjornal' component={InserirJornal} />
                <Route path='/redacao' component={Redacao} />
                <Route path='/noticia' component={Noticia} />
                <Route path='/jornalnot/:idjornal' component={JornalNot} />
                <Route path='/editarnot/:id/:idjornal' component={EditarNoticia} />
                <Route path='/escolhertiponot/' component={EscolherTipoNot} />
                <Route path='/criarnoticia/:idjornal' component={CriarNoticia} />
                <Route path='/ativrecente/:idjornal' component={AtividadeRecente} />
                <Route path='/editoria/:idjornal' component={Editoria} />
            </Switch>
        );
    }
}