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
  const content = (
   <div>
     test test test
   </div>
 );

  const data = [{
    key: '1',
    name: '2017-09-01',
    status: <div>
              <Popover content={content} title="Title">
                <b className='status'><Icon type="check-circle" style={{color:'#00a854',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                <b className='status'><Icon type="check-circle" style={{color:'#00a854',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                <b className='status'><Icon type="check-circle" style={{color:'#108ee9',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
               <b className='status'><Icon type="check-circle" style={{color:'#108ee9',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                <b className='status'><Icon type="check-circle" style={{color:'#00a854',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
               <b className='status'><Icon type="check-circle" style={{color:'#108ee9',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                <b className='status'><Icon type="check-circle" style={{color:'#108ee9',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                <b className='status'><Icon type="close-circle" style={{color:'#f04134',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                <b className='status'><Icon type="close-circle" style={{color:'#f04134',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                 <b className='status'><Icon type="check-circle" style={{color:'#00a854',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                 <b className='status'><Icon type="check-circle" style={{color:'#00a854',fontSize:'20px'}}/></b>
              </Popover>
              <Popover content={content} title="Title">
                 <b className='status'><Icon type="check-circle" style={{color:'#00a854',fontSize:'20px'}}/></b>
              </Popover>
            </div>,
  }, {
    key: '2',
    name: '2017-09-02',
    status: <div>
              <b className='status right'></b>
              <b className='status wrong'></b>
            </div>,
  }, {
    key: '3',
    name: '2017-09-03',
    status: <div>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
  </div>,
  },
  {
    key: '4',
    name: '2017-09-04',
    status: <div>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
  </div>,
  }, {
    key: '5',
    name: '2017-09-05',
    status: <div>
    <b className='status right'></b>
    <b className='status wrong'></b>
    <b className='status right'></b>
  </div>,
  },
  {
    key: '6',
    name: '2017-09-06',
    status: '6',
  },
  {
    key: '7',
    name: '2017-09-07',
    status: '7',
  },
  {
    key: '8',
    name: '2017-09-08',
    status: '8',
  },
  {
    key: '9',
    name: '2017-09-09',
    status: '9',
  },
  {
    key: '10',
    name: '2017-09-10',
    status: '10',
  }];
class AccordingTime extends Component{
    render(){
        return(
                <div className='table'>
                  <Tables columns={columns} data={data}/>
                </div>
        )
    }
}

export default AccordingTime;
