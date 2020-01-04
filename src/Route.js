import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Listusers from './Components/Listusers';
import Jornais from './Components/Jornais';

export default class Routes extends React.Component {
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
                </Switch>
            </BrowserRouter>
        );
    }
}