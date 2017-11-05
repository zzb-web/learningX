import React, { Component } from 'react';
import axios from 'axios';
import {Get, Post} from '../../fetch/data.js';
class Test extends Component{
    render(){
      return(
        <div>
          <div>1111</div>
          <div onClick={this.test.bind(this)}>2222</div>
        </div>
      )
    }
    componentDidMount(){
          axios.defaults.withCredentials = true;
          var url = "http://118.31.16.70/api/v3/students/login/";
          var params = {
            "learnId": 10000,
            "password": "guest",
            "remember": true
        }
        // Post(url, params);
          // axios.post("http://118.31.16.70/api/v3/students/login/", {
          //     "learnId": 10000,
          //     "password": "guest",
          //     "remember": true
          // }).then(function(){
          // }).catch(function(err){
          //     console.log(err);
          // })
    }
    test(){
      var data = Get('http://118.31.16.70/api/v3/students/me/books/');
      data.then(function(response){
        console.log(response);
      })
    }
}
  export default Test;