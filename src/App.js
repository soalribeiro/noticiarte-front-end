import React from 'react';
import logobranco from './images_app/logo_branco.png';
import logoazul from './images_app/logo_azul.png';
import './App.css';
import Listausers from './Components/Listusers.js';
import Login from './Components/Login';
import Routes from './Route';



function App() {

  return (
    <div className="background">

      <svg className="Caminho_156" viewBox="-15362.123 16560.127 1921.514 455.709">
        <path fill="rgba(5,84,242,1)" id="Caminho_156" d="M -15362.123046875 16560.259765625 L -13440.609375 16560.126953125 L -13441.0849609375 16777.896484375 C -13441.0849609375 16777.896484375 -13445.86328125 16781.3671875 -13447.1162109375 16781.958984375 C -13578.5322265625 16843.86328125 -13659.1337890625 16658.517578125 -13799.013671875 16659.466796875 C -13982.326171875 16660.708984375 -14172.0625 16826.58203125 -14394.8515625 16699.12890625 C -14617.642578125 16571.6796875 -14715.16796875 16872.966796875 -14968.1591796875 16872.966796875 C -15221.150390625 16872.966796875 -15362.123046875 17015.8359375 -15362.123046875 17015.8359375 L -15362.123046875 16560.259765625 Z">
        </path>
      </svg>
      <img className="logo_branco" src={logobranco} />

      
      <Routes />
    </div>
  );
}

export default App;
