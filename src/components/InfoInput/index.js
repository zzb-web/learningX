import React, { Component } from 'react';
import {Row , Col, Select, Button ,DatePicker, InputNumber} from 'antd';
import TopicResult from './subpage/TopicResult.js';
import {Get} from '../../fetch/data.js';
import './style.css';
const {Option} = Select;
// const { MonthPicker, RangePicker } = DatePicker;
class InfoInput extends Component {
    constructor(){
        super();
        this.state = {
           showDetail : false,
           showSaveSuc : false,
           hasSave : [],
           current : '',
           books : [],
           page : 0,
           date : '',
           topicAll : [],
        }
    }

    sureBtnHandle(){
       const {current, page, topicAll} = this.state;
       let url = 'http://118.31.16.70/api/v3/problems/?book='+current+'&page='+page;
       let data = Get(url);
       data.then((response)=>{
           if(response.length>0){
            this.setState({
                topicAll :response,
                showDetail : true
                })
            }
       })
    //    console.log(topicAll)
    //    setTimeout(()=>{
    //        console.log(topicAll)
    //     if(topicAll.length>0){
    //         this.setState({
    //             showDetail : true
    //         })
    //        }
    //    },2000)
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
    bookChange(value){
        this.setState({
            current : value
        })
    }
    pageChange(value){
        this.setState({
            page : value
        })
    }
    dateChange(date, dateString){
        console.log(date, dateString)
        var timestamp = Date.parse(new Date(dateString));
        timestamp = timestamp / 1000;
        this.setState({
            date : timestamp
        })
    }
    render(){
        const {books, topicAll, page, date} = this.state
        return(
            <div className='info-input'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择作业布置信息</h2>
                            <div className='select-info-content'>
                                <div className='select-category'>
                                    <span>作业布置日期&nbsp;&nbsp;:</span>
                                    <DatePicker placeholder='作业是哪一天布置的？' style={{ width: 240, marginLeft:'10px',lineHeight:'28' }} onChange={this.dateChange.bind(this)}/>
                                </div>
                                <div className='select-category'>
                                    <span>学习资料名称&nbsp;&nbsp;:</span>
                                    <Select placeholder='作业在哪一本书上？' style={{ width: 240, marginLeft:'10px'}} onChange={this.bookChange.bind(this)}>
                                        {books.map((item,index)=><Option value={item} key={index}>{item}</Option>)}
                                    </Select>
                                </div>
                                <div className='select-category'>
                                    <span>页码&nbsp;&nbsp;:</span>
                                    <InputNumber placeholder='作业是哪一页？' min={1} max={100} style={{ width: 240, marginLeft:'10px'}} onChange={this.pageChange.bind(this)}/>
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
                                this.state.showDetail ? <TopicResult 
                                                            handleDetail={this.handleDetail.bind(this)} 
                                                            handleCancel={this.handleCancel.bind(this)} 
                                                            topicAll={topicAll}
                                                            page={page}
                                                            date={date}/> : null
                            }
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
    componentDidMount(){
        let that = this;
        const data = Get('http://118.31.16.70/api/v3/students/me/books/');
        data.then((response)=>this.setState({books:response}))
    }
}

export default InfoInput;
