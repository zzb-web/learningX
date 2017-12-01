import React, { Component } from 'react';
import {Popover,Icon} from 'antd';
import Tables from '../../Table/index.js';
import './style.css';
const columns = [{
    title: '作业布置时间',
    className: 'column-time',
    dataIndex: 'name',
    width : '30%'
  }, {
    title: '对应题目状态',
    className: 'column-status',
    dataIndex: 'status',
  }];
class AccordingTime extends Component{
    _add(m){return m<10?'0'+m:m }  
    _getDate(timeStamp) {   
      var time = new Date(timeStamp*1000);  
      var y = time.getFullYear();  
      var m = time.getMonth()+1;  
      var d = time.getDate();  
      return y +'-'+this._add(m)+'-'+this._add(d); 
    }
    _split(arr,len){
      var a_len = arr.length;
      var result = [];
      for(var i=0;i<a_len;i+=len){
        result.push(arr.slice(i,i+len))
      }
      // console.log(result)
      return result;
    }
    _handleData(detailData){
      var data = detailData;
      var num = data.length;
      var shang = parseInt(num/10);
      var remainder = num%10; 
      var breakpoint = (shang+1)*remainder;
      var arr = data.slice(0,breakpoint);
      var arr2 = data.slice(breakpoint,num)
      var a = this._split(arr,(shang+1));
      var b = this._split(arr2,shang);
      var finalArr = a.concat(b);
      var result = [];
      for(var i=0;i<(shang+1);i++){
      finalArr.map((item,index)=>{
          if(item[i] !==undefined){
            result.push(item[i])
          }
        })
      }
      return result;
    }
    render(){
      // console.log(this.props.data)
      const data = this.props.data || [];
      let detailData = [];
      data.map((item,index)=>{
        var currentProblems = this._handleData(item.problems);
        var single = {
          key: index,
          name: this._getDate(item.time),
          status: <div>
                  {currentProblems.map((problem,i)=>{
                    var content ;
                    // console.log(index,problem.problemId);
                    if(problem.subIdx ===-1){
                      if(problem.idx === -1){
                        content = `P${problem.page}/${problem.column}`;
                      }else{
                        content = `P${problem.page}/${problem.column}/${problem.idx}`;
                      }
                    }else{
                      content = `P${problem.page}/${problem.column}/${problem.idx}(${problem.subIdx})`;
                    }
                    if(problem.isCorrect ===1 ){
                      return (
                        <div key={i} className='status-content'>
                        <Popover content={content} title={problem.book}>
                          <b className='status'><Icon type="check-circle" style={{color:'#00a854',fontSize:'20px'}}/></b>
                        </Popover>
                        </div>)
                    }else if(problem.isCorrect ===2){
                      return (
                        <div key={i} className='status-content'>
                        <Popover content={content} title={problem.book}>
                          <b className='status'><Icon type="check-circle" style={{color:'#108ee9',fontSize:'20px'}}/></b>
                        </Popover>
                       </div>
                      )
                    }else{
                      return (
                        <div key={i} className='status-content'>
                        <Popover content={content} title={problem.book}>
                          <b className='status'><Icon type="close-circle" style={{color:'#f04134',fontSize:'20px'}}/></b>
                          </Popover>
                       </div>
                      )
                    }
                  })}
                  </div>,
        }
        detailData.push(single);
      })
        return(
                <div className='table'>
                  <Tables columns={columns} data={detailData}/>
                </div>
        )
    }
}

export default AccordingTime;
