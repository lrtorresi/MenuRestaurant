import React from 'react';
import {Row, Navbar} from 'react-materialize';
import {NavLink} from 'react-router-dom'

export default class Header extends React.Component{

  render(){
    return(
      <Row>
        <Navbar className="deep-orange darken-4">
          <li> <NavLink to="/">Pagina Inicial</NavLink></li>
          <li> <NavLink to="/cadastro-cliente">Crie sua conta de cliente</NavLink></li>
        </Navbar>
      </Row>
    )
  }
}
