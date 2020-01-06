import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Listusers from './Components/Listusers';
import Jornais from './Components/Jornais';
import SingleJornal from './Components/SingleJornal';
import SingleNoticia from './Components/SingleNoticia';
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
                        <Route path='/verjornal/:id' component={SingleJornal}></Route>
                        <Route path='/verjornal/:id/:id' component={SingleNoticia}></Route>

                </Switch>
            </BrowserRouter>
        );
    }
}