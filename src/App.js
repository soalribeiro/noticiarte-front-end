import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import logobranco from './images_app/logo_branco.png';
import './App.css';
import Routes from './Route';
import Menu from './Components/Menu';
import Login from './Components/Login';
import Jornais from './Components/Jornais';
import MenuSemLogin from './Components/MenuSemLogin';
import BotoesLateral from './Containers/BotoesLateral';
import Registo from './Components/Registo';
import SingleJornal from './Components/SingleJornal';
import SingleNoticia from './Components/SingleNoticia';
import SingleNoticiaSeccao from './Components/SingleNoticiaSeccao';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_user: sessionStorage.getItem('id_user')
    }
  }

  callbackLogin = () => {
    window.location.reload();
  }

  render() {
    if (this.state.id_user != null) {
      return (
        <BrowserRouter>
          <div className="conteudo">

            <div id="header">
              <svg id="onda" viewBox="-15362.123 16560.127 1921.514 455.709">
                <path fill="rgba(5,84,242,1)" d="M -15362.123046875 16560.259765625 L -13440.609375 16560.126953125 L -13441.0849609375 16777.896484375 C -13441.0849609375 16777.896484375 -13445.86328125 16781.3671875 -13447.1162109375 16781.958984375 C -13578.5322265625 16843.86328125 -13659.1337890625 16658.517578125 -13799.013671875 16659.466796875 C -13982.326171875 16660.708984375 -14172.0625 16826.58203125 -14394.8515625 16699.12890625 C -14617.642578125 16571.6796875 -14715.16796875 16872.966796875 -14968.1591796875 16872.966796875 C -15221.150390625 16872.966796875 -15362.123046875 17015.8359375 -15362.123046875 17015.8359375 L -15362.123046875 16560.259765625 Z">
                </path>
              </svg>

              <Link to="/">
                <img className="logo_branco" src={logobranco} />
              </Link>

              <Menu />
              <BotoesLateral />
            </div>

            <Routes />
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <div className="conteudo">
            <div id="header">
              <svg id="onda" viewBox="-15362.123 16560.127 1921.514 455.709">
                <path fill="rgba(5,84,242,1)" d="M -15362.123046875 16560.259765625 L -13440.609375 16560.126953125 L -13441.0849609375 16777.896484375 C -13441.0849609375 16777.896484375 -13445.86328125 16781.3671875 -13447.1162109375 16781.958984375 C -13578.5322265625 16843.86328125 -13659.1337890625 16658.517578125 -13799.013671875 16659.466796875 C -13982.326171875 16660.708984375 -14172.0625 16826.58203125 -14394.8515625 16699.12890625 C -14617.642578125 16571.6796875 -14715.16796875 16872.966796875 -14968.1591796875 16872.966796875 C -15221.150390625 16872.966796875 -15362.123046875 17015.8359375 -15362.123046875 17015.8359375 L -15362.123046875 16560.259765625 Z">
                </path>
              </svg>

              <Link to="/">
                <img className="logo_branco" src={logobranco} />
              </Link>

              <MenuSemLogin />
            </div>

            {/* <Login isLoggedIn={this.callbackLogin} /> */}
            <Switch>
              <Route exact path='/'>
                <Login isLoggedIn={this.callbackLogin} />
              </Route>
              <Route exact path='/jornais' component={Jornais} />
              <Route path='/verjornal/:idjornal' component={SingleJornal}></Route>
              <Route path='/vernoticias/:id' component={SingleNoticia}></Route>
              <Route path='/vernoticiaseccao/:idjornal/:idseccao/:idpalete' component={SingleNoticiaSeccao}></Route>
              <Route exact path='/registo' component={Registo} />
            </Switch>

          </div>
        </BrowserRouter>
      );
    }
  }
}