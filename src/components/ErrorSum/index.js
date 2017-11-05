import React, { Component } from 'react';
import {Row , Col, Select, Button} from 'antd';
import AccordingTime from './subpage/AccordingTime.js';
import AccordingTopicTypes from './subpage/AccordingTopicTypes.js';
import AccordingMasteryLevel from './subpage/AccordingMasteryLevel.js';
import AccordingReview from './subpage/AccordingReview.js';
import {Get} from '../../fetch/data.js';
import './style.css';
const Option = Select.Option;
class ErrorSum extends Component {
    constructor(){
        super();
        this.state = {
            category : '0',
            selectValue : '0',
            books : ''
        }
    }
    changeCategory(value){
        this.setState({
            selectValue : value
        })
    }
    sureBtnHandle(){
        if(this.state.category !== this.state.selectValue){
            this.setState({
                category : this.state.selectValue
            }) 
        } 
    }
    render(){
        console.log(this.state.books)
        return(
            <div className='error-sum'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择归类信息</h2>
                            <div className='select-info-content'>
                                <div className='select-category-1'>
                                    <span>章&nbsp;&nbsp;:</span>
                                    <Select placeholder='分析哪一章?' style={{ width: 240, marginLeft:'10px' }}>
                                        <Option value="1">第一章 有理数</Option>
                                        <Option value="2">xxxxxxx2</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span>节&nbsp;&nbsp;:</span>
                                    <Select placeholder='分析哪一节?' style={{ width: 240, marginLeft:'10px' }}>
                                        <Option value="1">第二节 数轴</Option>
                                        <Option value="2">xxxxxxx2</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span>归类方法&nbsp;&nbsp;:</span>
                                    <Select placeholder='如何分析?' style={{ width: 240, marginLeft:'10px' }} onChange={this.changeCategory.bind(this)}>
                                        <Option value="1">按作业布置时间</Option>
                                        <Option value="2">按题目类型</Option>
                                        <Option value="3">按掌握程度</Option>
                                        <Option value="4">按复习顺序</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span></span>
                                    <Button type="primary" size='large' style={{width:240,height:35,marginLeft:'10px'}} onClick={this.sureBtnHandle.bind(this)}>确定</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <div className='category-detail'>
                            {
                                this.state.category === '1' ? <AccordingTime/> :
                                this.state.category === '2' ? <AccordingTopicTypes/> :
                                this.state.category === '3' ? <AccordingMasteryLevel/> :
                                this.state.category === '4' ? <AccordingReview/> : null
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
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextState.category === this.state.category){
    //         return false
    //     }
    //     return true
    // }
}

export default ErrorSum;