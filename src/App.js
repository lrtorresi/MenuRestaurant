import React from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import Main from './views/Main';
import {Row, Col} from 'react-materialize';

export default class App extends React.Component{

  render(){
    return(
      <Row>
        <Header />
        <Row>
          <Col s={3}>
            <Profile />
          </Col>
          <Col s={9}>
            <Main />
          </Col>
        </Row>
      </Row>
    )
  }
}