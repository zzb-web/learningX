import React, { Component } from 'react';
import axios from 'axios';
class Test extends Component{
    render(){
      return(
        <div>
          <div>1111</div>
          <div>2222</div>
        </div>
      )
    }
    componentDidMount(){
        axios.get('http://118.31.16.70/api/v2/problems/')
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          console.log(err);
        });
    }
  }

  export default Test;