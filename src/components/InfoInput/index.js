import React, { Component } from 'react';
import {Row , Col, Select, Button ,DatePicker, InputNumber} from 'antd';
import { withRouter } from 'react-router';
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
           showFail :false,
           showNone : false,
           hasSave : '',
           hasFail:'',
           current : '',
           books : [],
           page : 0,
           date : '',
           topicAll : [],
        }
    }

    sureBtnHandle(){
       const {current, page, topicAll,date} = this.state;
       if(date === ''){
                this.setState({
                    showFail : true,
                    showNone:false,
                    showSaveSuc:false,
                    hasFail:'作业日期不正常'
                })
       }else{
        let url = 'http://118.31.16.70/api/v3/students/me/problems/?book='+current+'&page='+page;
        let data = Get(url);
        data.then((response)=>{
            if(response.status ===200){
                    if(response.data.length === 0){
                        this.setState({
                            showNone : true,
                            showDetail : false,
                            showSaveSuc:false,
                            showFail : false
                        })
                    }else{
                        this.setState({
                            topicAll :response.data,
                            showDetail : true,
                            showFail : false,
                            showNone:false
                            })
                    }
                }else if(response.status ===404){
                    if(current === ''){
                        this.setState({
                            showFail : true,
                            showNone:false,
                            showSaveSuc:false,
                            hasFail:'资料名称不正常'
                        })
                    }else if(page === 0){
                        this.setState({
                            showFail : true,
                            showNone:false,
                            showSaveSuc:false,
                            hasFail:'页码不正常'
                        })
                    }else{
                        this.setState({
                            showFail : true,
                            showNone:false,
                            showSaveSuc:false,
                            hasFail:'CS无数据'
                        })
                    }
                    
                }else if(response.status ===401){
                    this.props.history.push('/');
                }else{
                    if(page === undefined){
                        this.setState({
                            showFail : true,
                            showNone:false,
                            showSaveSuc:false,
                            hasFail:'页码不正常'
                        })
                    }else{
                        this.setState({
                            showFail : true,
                            showNone:false,
                            showSaveSuc:false,
                            showDetail : false,
                            hasFail:'CS出故障'
                        })
                    }
                }
                // if(response.)
        })
        }
    }
    handleDetail(){
        // let hasSave = this.state.hasSave;
        // hasSave.push(this.state.current+' '+this.state.page+'页');
        this.setState({
            showDetail : false,
            showSaveSuc : true,
            showNone:false,
            hasSave : this.state.current+' '+this.state.page+'页'
        })
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
        const {topicAll, page, date} = this.state;
        var books = this.state.books;
        if(books === null){
            books = []
        }
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
                                    <InputNumber placeholder='作业是哪一页？' min={1} style={{ width: 240, marginLeft:'10px'}} onChange={this.pageChange.bind(this)}/>
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
                                this.state.showSaveSuc ? <div className='save-success'>
                                                            {this.state.hasSave} 
                                                            <span style={{color:'#108ee9'}}>保存成功</span>
                                                        </div> : null
                            }
                            {
                                this.state.showFail? <div className='save-success'>
                                                           <span style={{color:'red'}}>{this.state.hasFail}</span>
                                                        </div> : null
                            }
                            {
                                this.state.showNone? <div className='save-success'>
                                                           <span style={{color:'#108ee9'}}>本页所有题目已标记过</span>
                                                        </div> : null
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
        data.then((response)=>{
            if(response.status === 200){
                this.setState({books:response.data})
            }else if(response.status ===401){
                this.props.history.push('/');
            }else{
                this.setState({books:[]})
            }
        })
    }
}

export default withRouter(InfoInput);
