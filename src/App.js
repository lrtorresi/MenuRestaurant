import React from 'react';
import Header from './components/Header';
import Main from './views/Main';

export default class App extends React.Component{

  render(){
    return(
      <div >        
        <Header/>
        <Main/>
      </div>

    )
  }
}