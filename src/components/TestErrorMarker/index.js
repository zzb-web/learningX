import React from 'react';
import {Row , Col, Select, Button ,DatePicker, InputNumber} from 'antd';
import { withRouter } from 'react-router';
import TopicResult from './subpage/TopicResult.js';
import {Get} from '../../fetch/data.js';
import './style.css';
const {Option} = Select;

class TestErrorMarker extends React.Component{
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
           date : '',
           topicAll : [],
        }
    }
    componentDidMount(){
        let that = this;
        const data = Get('/api/v3/students/me/papers/');
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
    bookChange(value){
        this.setState({
            current : value
        })
    }
    dateChange(date, dateString){
        var timestamp = Date.parse(new Date(dateString));
        timestamp = timestamp / 1000;
        this.setState({
            date : timestamp
        })
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
         let url = '/api/v3/students/me/paperProblems/?paperID='+current;
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
         const {current ,books} = this.state;
         var paper;
         books.map((item,index)=>{
             if(item.paperID === current){
                 paper = item.name;
                 return false;
             }
         })
        this.setState({
            showDetail : false,
            showSaveSuc : true,
            showNone:false,
            hasSave : paper 
        })
    }
    handleCancel(){
      this.setState({
        showDetail : false
      })
    }
    render(){
        const {books, topicAll,date} = this.state;
        return(
            <div className='test-error-marker'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择试卷信息</h2>
                            <div className='select-info-content'>
                                <div className='select-category'>
                                    <span>做题时间&nbsp;&nbsp;:</span>
                                    <DatePicker placeholder='什么时候做的卷子？' style={{ width: 240, marginLeft:'10px',lineHeight:'28' }} onChange={this.dateChange.bind(this)}/>
                                </div>
                                <div className='select-category'>
                                    <span>试卷名称&nbsp;&nbsp;:</span>
                                    <Select placeholder='选择试卷名称' style={{ width: 240, marginLeft:'10px'}} onChange={this.bookChange.bind(this)}>
                                        {books.map((item,index)=><Option value={item.paperID} key={index}>{item.name}</Option>)}
                                    </Select>
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
                                                           <span style={{color:'#108ee9'}}>已标记过</span>
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
                                                            date={date}/> : null
                            }
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default TestErrorMarker;