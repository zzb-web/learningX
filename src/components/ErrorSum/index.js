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
            chapters : [],
            chapters_sections : {},
            currentSections : [],
            defaultSections : ''
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
    chaptersChange(value){
        this.setState({
            currentSections : this.state.chapters_sections[value],
            defaultSections : ''
        })
    }
    sectionChange(value){
        this.setState({
            defaultSections : value
        })
    }
    render(){
        const {chapters, currentSections,chapters_sections,defaultSections} = this.state;
        return(
            <div className='error-sum'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择归类信息</h2>
                            <div className='select-info-content'>
                                <div className='select-category-1'>
                                    <span>章&nbsp;&nbsp;:</span>
                                    <Select placeholder='分析哪一章?' style={{ width: 240, marginLeft:'10px' }} onChange={this.chaptersChange.bind(this)}>
                                        {chapters.map((item,index)=><Option value={item} key={index}>{item}</Option>)}
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span>节&nbsp;&nbsp;:</span>
                                    <Select placeholder='分析哪一节?' style={{ width: 240, marginLeft:'10px' }} value={defaultSections===''?currentSections[0]:defaultSections} onChange={this.sectionChange.bind(this)}>
                                        {currentSections.map((item,index)=><Option value={item} key={index}>{item}</Option>)}
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
        const data = Get('http://118.31.16.70/api/v3/students/me/info/?chapter=1&section=1');
        data.then((response)=>{
            let chapters = [];
            let chapters_sections = {};
            response.map((item,index)=>{
                if(chapters.indexOf(item.chapterName)===-1){
                    chapters.push(item.chapterName);
                }
                chapters.push();
                if(chapters_sections[item.chapterName] === undefined){
                    chapters_sections[item.chapterName] = [];
                    chapters_sections[item.chapterName].push(item.sectionName);
                }else{
                    chapters_sections[item.chapterName].push(item.sectionName);
                }
            })
            this.setState({
                chapters : chapters,
                chapters_sections : chapters_sections
            })
        })
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextState.category === this.state.category){
    //         return false
    //     }
    //     return true
    // }
}

export default ErrorSum;