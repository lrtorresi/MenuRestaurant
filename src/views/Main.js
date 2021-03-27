import React from 'react';
import Home from './Home';
import Account from './Account';
import {Switch, Route} from 'react-router-dom'



//declarando um componente como uma função
const Main = () => (

    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/cadastro-cliente" component={Account}/>
    </Switch>
)



export default Main;