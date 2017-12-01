import React, { Component } from 'react';
import {Icon,Popover} from 'antd';
import Tables from '../../Table/index.js';
import './style.css';
const columns = [{
    title: '题目类型',
    className: 'column-time',
    dataIndex: 'name',
    width : '30%'
  }, {
    title: '对应题目状态',
    className: 'column-status',
    dataIndex: 'status',
  }];
class AccordingTocpicTypes extends Component{
  _add(m){return m<10?'0'+m:m }  
  _getDate(timeStamp) {   
    var time = new Date(timeStamp*1000);  
    var y = time.getFullYear();  
    var m = time.getMonth()+1;  
    var d = time.getDate();  
    return this._add(m)+'-'+this._add(d); 
  }
    render(){
      const data = this.props.data || [];
      let detailData = [];
      data.map((item,index)=>{
        var single = {
          key: index,
          name: item.type,
          status: <div>
                  {item.problems.map((problem,i)=>{
                    var content ;
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
                          <span className='status-date'>{
                            this._getDate(problem.assignDate)
                          }</span>
                        </div>)
                    }else if(problem.isCorrect ===2){
                      return (
                        <div key={i} className='status-content'>
                        <Popover content={content} title={problem.book}>
                          <b className='status'><Icon type="check-circle" style={{color:'#108ee9',fontSize:'20px'}}/></b>
                        </Popover>
                          <span className='status-date'>{
                            this._getDate(problem.assignDate)
                          }</span>
                       </div>
                      )
                    }else{
                      return (
                        <div key={i} className='status-content'>
                        <Popover content={content} title={problem.book}>
                          <b className='status'><Icon type="close-circle" style={{color:'#f04134',fontSize:'20px'}}/></b>
                          </Popover>
                          <span className='status-date'>{
                            this._getDate(problem.assignDate)
                          }</span>
                       </div>
                      )
                    }
                  })}
                  </div>,
        }
        detailData.push(single);
      })
      // console.log(detailData)
        return(
            <div className='table'>
                 <Tables 
                    columns={columns}
                    data={detailData}
                     />
            </div>
        )
    }
}

export default AccordingTocpicTypes;