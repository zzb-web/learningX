import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

  import Navigation from '../components/Navigation/index.js';
  import Login from '../components/Login/index.js';

  class RouterMap extends React.Component{
      render(){
          return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/index" component={Navigation}/>
                </Switch>
          </Router>
          )
      }
  }

  export default RouterMap;