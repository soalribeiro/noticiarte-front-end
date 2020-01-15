import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Listusers from './Components/Listusers';
import Jornais from './Components/Jornais';
import SingleJornal from './Components/SingleJornal';
import SingleNoticia from './Components/SingleNoticia';
import SingleNoticiaSeccao from './Components/SingleNoticiaSeccao';
import Navbar from './Components/CriarNoticias/Navbar';
import CriarJornal from './Components/CriarJornal';
import PersonalizaJornal from './Components/PersonalizaJornal';
import Perfil from './Components/Perfil';
import CriaConteudo from './Components/CriaConteudo';
import TextVideo from './Components/TextVideo';
import Pesquisa from './Components/Pesquisa';
export default class Routes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Login />
                    </Route>
                    <Route path='/listausers'>
                        <Listusers />
                    </Route>
                    <Route path='/jornais'>
                        <Jornais />
                    </Route>
                    <Route path='/verjornal/:idjornal' component={SingleJornal}></Route>
                    <Route path='/vernoticias/:id' component={SingleNoticia}></Route>
                    <Route path='/vernoticiaseccao/:idjornal/:idseccao/:idpalete' component={SingleNoticiaSeccao}></Route>
                    <Route path='/criarjornais' component={CriarJornal}></Route>
                    <Route path='/personalizajornal' component={PersonalizaJornal}></Route>
                    <Route path='/perfil' component={Perfil}></Route>
                    <Route path='/criarconteudo' component={CriaConteudo}></Route>
                    <Route path='/textovideo' component={TextVideo}></Route>
                    <Route path='/pesquisa' component={Pesquisa}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}