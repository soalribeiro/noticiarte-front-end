import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Listusers from './Components/Listusers';
import Jornais from './Components/Jornais';
import SingleJornal from './Components/SingleJornal';
import SingleNoticia from './Components/SingleNoticia';
import SingleNoticiaSeccao from './Components/SingleNoticiaSeccao';
import CriarJornal from './Components/CriarJornal';
import PersonalizaJornal from './Components/PersonalizaJornal';
import Perfil from './Components/Perfil';
import CriaConteudo from './Components/CriaConteudo';
import TextVideo from './Components/TextVideo';
import Pesquisa from './Components/Pesquisa';
import Validarnoticia from './Components/Validarnoticia';
import VerPerfil from './Components/VerPerfil';
import Feedback from './Components/Feedback';
import InserirJornal from './Components/InserirJornal';
import Redacao from './Components/Redacao';
import Noticia from './Components/Noticia';
import JornalNot from './Components/JornalNot';
import EditarNoticia from './Components/EditarNoticia';
import CriarNoticia from './Components/CriarNoticia';
import EscolherTipoNot from './Components/EscolherTipoNot';
import AtividadeRecente from './Components/AtividadeRecente';
import Editoria from './Components/Editoria';
import ConviteJornal from './Components/ConviteJornal';
import UpdateJornal from './Components/UpdateJornal';
import RecebeVideo from './Components/RecebeVideo';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Jornais} />
                <Route path='/listausers' component={Listusers} />
                <Route path='/jornais' component={Jornais} />
                <Route path='/verjornal/:idjornal' component={SingleJornal}></Route>
                <Route path='/vernoticias/:id' component={SingleNoticia}></Route>
                <Route path='/vernoticiaseccao/:idjornal/:idseccao/:idpalete' component={SingleNoticiaSeccao}></Route>
                <Route path='/criarjornais' component={CriarJornal}></Route>
                <Route path='/personalizajornal' component={PersonalizaJornal}></Route>
                <Route path='/perfil' component={Perfil}></Route>
                <Route path='/criarconteudo' component={CriaConteudo}></Route>
                <Route path='/textovideo/:id_not' component={TextVideo}></Route>
                <Route path='/pesquisa' component={Pesquisa}></Route>
                <Route path='/verperfil/:id' component={VerPerfil}></Route>
                <Route path='/validarnoticia/:idnoticia' component={Validarnoticia}></Route>
                <Route path='/feedback/:idnoticia' component={Feedback}></Route>
                <Route path='/inserirjornal' component={InserirJornal} />
                <Route path='/redacao' component={Redacao} />
                <Route path='/noticia' component={Noticia} />
                <Route path='/jornalnot/:idjornal' component={JornalNot} />
                <Route path='/editarnot/:id/:idjornal' component={EditarNoticia} />
                <Route path='/escolhertiponot/' component={EscolherTipoNot} />
                <Route path='/criarnoticia/:idjornal' component={CriarNoticia} />
                <Route path='/ativrecente/:idjornal' component={AtividadeRecente} />
                <Route path='/editoria/:idjornal' component={Editoria} />
                <Route path='/vernoticias/:id' component={SingleNoticia}></Route>
                <Route path='/atualijornal/:jornalid' component={UpdateJornal}></Route>
                <Route path='/conviterecebido/:idjornal' component={ConviteJornal}></Route>
                <Route path='/recebevideo' component={RecebeVideo} />
            </Switch>
        );
    }
}