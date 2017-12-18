import React, { Component } from 'react';
import axios from 'axios';
// import {Get, Post} from '../../fetch/data.js';
class Homepage extends Component{
    render(){
      return(
        <div>
          <div>1111</div>
        </div>
      )
    }
    componentDidMount(){
          axios.defaults.withCredentials = true;
        //   var url = "http://118.31.16.70/api/v3/students/login/";
        //   var params = {
        //     "learnId": 10000,
        //     "password": "guest",
        //     "remember": true
        // }
        // var data = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        // var num = data.length;
        // var shang = parseInt(num/10);
        // var remainder = num%10; 
        // var breakpoint = (shang+1)*remainder;
        // var arr = data.slice(0,breakpoint);
        // var arr2 = data.slice(breakpoint,num)
        // var a = this._split(arr,(shang+1));
        // var b = this._split(arr2,shang);
        // var finalArr = a.concat(b);
        // var result = [];
        // for(var i=0;i<(shang+1);i++){
        // finalArr.map((item,index)=>{
        //     if(item[i] !==undefined){
        //       result.push(item[i])
        //     }
        //   })
        // }
        // console.log(result)
    }
    // _split(arr,len){
    //   var a_len = arr.length;
    //   var result = [];
    //   for(var i=0;i<a_len;i+=len){
    //     result.push(arr.slice(i,i+len))
    //   }
    //   console.log(result)
    //   return result;
    // }
    // test(){
    //   var data = Get('http://118.31.16.70/api/v3/students/me/books/');
    //   data.then(function(response){
    //     console.log(response);
    //   }) 
    // }
}
  export default Homepage;