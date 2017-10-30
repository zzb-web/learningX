import React, { Component } from 'react';
import './App.css';
// import Taskreminder from './components/Taskreminder/index.js';
// import Overview from './components/Overview/index.js';
import Navigation from './components/Navigation/index.js';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Taskreminder/> */}
        {/* <Overview/> */}
        <Navigation/>
        {/* {<SiderDemo/>} */}
      </div>
    );
  }
} 

export default App;
