import React, { Component } from 'react';
import {Row , Col, Select, Button ,DatePicker, InputNumber} from 'antd';
import TopicResult from './subpage/TopicResult.js';
import './style.css';
const {Option} = Select;
const { MonthPicker, RangePicker } = DatePicker;
class InfoInput extends Component {
    constructor(){
        super();
        this.state = {
           showDetail : false,
           showSaveSuc : false,
           hasSave : [],
           current : ''
        }
    }

    sureBtnHandle(){
       this.setState({
           showDetail : true
       })
    }
    handleDetail(){
        let hasSave = this.state.hasSave;
        hasSave.push(this.state.current);
        this.setState({
            showDetail : false,
            showSaveSuc : true,
            hasSave : hasSave
        })
        // setTimeout(()=>this.setState({showSaveSuc : false}),2000)
    }
    handleCancel(){
      this.setState({
        showDetail : false
      })
    }
    change(value){
        this.setState({
            current : value
        })
    }
    render(){
        return(
            <div className='info-input'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择作业布置信息</h2>
                            <div className='select-info-content'>
                                <div className='select-category'>
                                    <span>作业布置日期&nbsp;&nbsp;:</span>
                                    <DatePicker placeholder='作业是哪一天布置的？' style={{ width: 240, marginLeft:'10px',lineHeight:'28' }}/>
                                </div>
                                <div className='select-category'>
                                    <span>学习资料名称&nbsp;&nbsp;:</span>
                                    <Select placeholder='作业在哪一本书上？' style={{ width: 240, marginLeft:'10px'}} onChange={this.change.bind(this)}>
                                        <Option value="0">七上基础训练通用版s</Option>
                                        <Option value="1">第二节 数轴</Option>
                                        <Option value="2">xxxxxxx2</Option>
                                    </Select>
                                </div>
                                <div className='select-category'>
                                    <span>页码&nbsp;&nbsp;:</span>
                                    <InputNumber placeholder='作业是哪一页？' min={1} max={100} style={{ width: 240, marginLeft:'10px'}}/>
                                </div>
                                <div className='select-category'>
                                    <span></span>
                                    {
                                        !this.state.showDetail ? <Button type="primary" size='large' style={{width:240,height:35,marginLeft:'10px'}} onClick={this.sureBtnHandle.bind(this)}>确定</Button>
                                                                : null
                                    }
                                </div>
                            </div>
                            {
                                this.state.showSaveSuc ? <div className='save-success'>{
                                    this.state.hasSave.map((item,index)=>{
                                        return <div>
                                                    <span>{item}</span>
                                                    <span style={{color:'#108ee9'}}>保存成功</span>
                                            </div> 
                                    
                                    })}</div> : null
                            }
                        </div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <div className='category-detail'>
                            {
                                this.state.showDetail ? <TopicResult handleDetail={this.handleDetail.bind(this)} handleCancel={this.handleCancel.bind(this)}/> : null
                            }
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default InfoInput;
