import React, { Component } from 'react';
import {Get} from '../../fetch/data.js';
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
        var data = Get('/api/v2/problems/');
        data.then(function(response){
          console.log(response);
        })
    }
}
  export default Test;