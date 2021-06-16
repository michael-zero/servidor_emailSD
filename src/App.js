import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Navbar from './components/Navbar'

import './main.css';
import Listagem from './components/Listagem';
import Rodape from './components/Rodape';
import BarraLateral from './components/BarraLateral'
import Login from './components/Login'
import {Context} from './Logado'

import {Redirect} from 'react-router-dom'

function App() {

  const [logado, setLogado] = React.useState(null)

    console.log(logado);
  return (
    <Router> 
      <Context.Provider value={{logado, setLogado}}>
      <Navbar/>
      <Switch>

      <Route  path='/' exact component={Login} /> 
      
       <Route  path='/listagem' exact component={Listagem} />

      
       
      </Switch>
      </Context.Provider>
      <Rodape/>
    </Router>
    

  );
}

export default App;
