import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Listusers from './Components/Listusers';
import Jornais from './Components/Jornais';
import SingleJornal from './Components/SingleJornal';
import SingleNoticia from './Components/SingleNoticia';
import SingleNoticiaSeccao from './Components/SingleNoticiaSeccao';
import Navbar from './Components/CriarNoticias/Navbar';

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

                </Switch>
            </BrowserRouter>
        );
    }
}