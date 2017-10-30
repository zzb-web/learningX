import React, { Component } from 'react';
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
  
  const data = [{
    key: '1',
    name: '一元一次方程的识别',
    status: <div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-05</span>
              </div>
              <div className='status-content'>
                <b className='status right'></b>
                <span className='status-date'>09-06</span>
              </div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-08</span>
              </div>
            </div>,
  }, {
    key: '2',
    name: '解一元一次方程',
    status: <div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-05</span>
              </div>
              <div className='status-content'>
                <b className='status right'></b>
                <span className='status-date'>09-06</span>
              </div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-08</span>
              </div>
            </div>,
  }, {
    key: '3',
    name: '一元一次方程的应用',
    status: <div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-05</span>
              </div>
              <div className='status-content'>
                <b className='status right'></b>
                <span className='status-date'>09-06</span>
              </div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-08</span>
              </div>
            </div>,
  },
  {
    key: '4',
    name: '新定义',
    status: <div>
    <div className='status-content'>
      <b className='status wrong'></b>
      <span className='status-date'>09-05</span>
    </div>
    <div className='status-content'>
      <b className='status right'></b>
      <span className='status-date'>09-06</span>
    </div>
    <div className='status-content'>
      <b className='status wrong'></b>
      <span className='status-date'>09-08</span>
    </div>
  </div>,
  }, {
    key: '5',
    name: '规律探索',
    status: <div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-05</span>
              </div>
              <div className='status-content'>
                <b className='status right'></b>
                <span className='status-date'>09-06</span>
              </div>
              <div className='status-content'>
                <b className='status wrong'></b>
                <span className='status-date'>09-08</span>
              </div>
            </div>,
  },
  ];
class AccordingTocpicTypes extends Component{
    render(){
        return(
            <div className='table'>
                 <Tables columns={columns} data={data}/>
            </div>
        )
    }
}

export default AccordingTocpicTypes;