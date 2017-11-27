import React, { Component } from 'react';
import {Row , Col, Select, Button} from 'antd';
import OneByOne from './subpage/OneByOne/index.js';
import {Get} from '../../fetch/data.js';
import './style.css';
const Option = Select.Option;
class ReviewOfError extends Component {
    constructor(){
        super();
        this.state = {
            category : '0',
            selectValue : '0',
            chapters : [],
            chapters_sections : {},
            currentSections : [],
            defaultSections : '',
            currentChapterNum : 0,
            currentSectionNum : 0,
            checkWay : '',
            detailData : [],
            showWarning:false,
            warningMsg:''
        }
    }
    changeCategory(value){
        this.setState({
            selectValue : value
        })
        // if(value === '1'){
        //     this.setState({
        //         checkWay : 'problemsSortByTime'
        //     })
        // }else if(value === '2'){
        //     this.setState({
        //         checkWay : 'problemsSortByType'
        //     })
        // }else if(value === '3'){
        //     this.setState({
        //         checkWay : 'problemsSortByAccuracy'
        //     })
        // }else if(value === '4'){
        //     this.setState({
        //         checkWay : 'problemsSortByType'
        //     })
        // }
    }
    sureBtnHandle(){
        this.setState({
            category : this.state.selectValue
        })
        const {selectValue ,currentChapterNum ,currentSectionNum, checkWay} = this.state;
        if(currentChapterNum === 0){
            this.setState({
                showWarning:true,
                warningMsg:'章信息不正常'
            })
        }else if(selectValue === '0'){
            this.setState({
                showWarning:true,
                warningMsg:'归类方法不正常'
            })
        }else if(selectValue !== '0' && currentChapterNum !== 0 && currentSectionNum !==0){
            console.log('xxxxx')
            this.setState({
                showWarning:false
            })
            // let url = `http://118.31.16.70/api/v3/students/me/${checkWay}/?chapter=${currentChapterNum}&section=${currentSectionNum}`;
            // let data = Get(url);
            // data.then((response)=>{
            //     this.setState({
            //         detailData : response
            //     })
            // })
        }
    }
    chaptersChange(value){
        this.setState({
            currentSections : this.state.chapters_sections[value],
            defaultSections : '',
            currentChapterNum : Number(value.split('_')[1]),
            currentSectionNum : 1
        })
    }
    sectionChange(value){
        this.setState({
            defaultSections : value,
            currentSectionNum : Number(value.split('_')[1])
        })
    }
    render(){
        const {chapters, currentSections,chapters_sections,defaultSections,currentChapterNum,currentSectionNum, detailData} = this.state;
        return(
            <div className='error-sum'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择错题复习范围</h2>
                            <div className='select-info-content'>
                                <div className='select-category-1'>
                                    <span>章&nbsp;&nbsp;:</span>
                                    <Select placeholder='选择哪一章?' style={{ width: 240, marginLeft:'10px' }} onChange={this.chaptersChange.bind(this)}>
                                        {chapters.map((item,index)=><Option value={item} key={index}>{`第${item.split('_')[1]}章`}<span style={{marginLeft:10}}>{item.split('_')[0]}</span></Option>)}
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span>节&nbsp;&nbsp;:</span>
                                    <Select placeholder='选择哪一节?' style={{ width: 240, marginLeft:'10px' }} value={defaultSections===''?currentSections[0]:defaultSections} onChange={this.sectionChange.bind(this)}>
                                        {currentSections.map((item,index)=><Option value={item} key={index}>{`第${item.split('_')[1]}节`}<span style={{marginLeft:10}}>{item.split('_')[0]}</span></Option>)}
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span>方式&nbsp;&nbsp;:</span>
                                    <Select placeholder='选择文档形式' style={{ width: 240, marginLeft:'10px' }} onChange={this.changeCategory.bind(this)}>
                                        <Option value="1">按时间</Option>
                                        <Option value="2">按类型</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span></span>
                                    <Button type="primary" size='large' style={{width:240,height:35,marginLeft:'10px'}} onClick={this.sureBtnHandle.bind(this)}>确定</Button>
                                </div>
                            </div>
                            {
                                this.state.showWarning ? <div className='save-success'>
                                    <span style={{color:'red'}}>{this.state.warningMsg}</span>
                                 </div> : null
                            }
                        </div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <div className='category-detail'>
                            {
                               <OneByOne />
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
            if(response === null){
                response.data = []
            }
            response.data.map((item,index)=>{
                if(chapters.indexOf(`${item.chapterName}_${item.chapter}`)===-1){
                    chapters.push(`${item.chapterName}_${item.chapter}`);
                }
                if(chapters_sections[`${item.chapterName}_${item.chapter}`] === undefined){
                    chapters_sections[`${item.chapterName}_${item.chapter}`] = [];
                    chapters_sections[`${item.chapterName}_${item.chapter}`].push(`${item.sectionName}_${item.section}`);
                }else{
                    chapters_sections[`${item.chapterName}_${item.chapter}`].push(`${item.sectionName}_${item.section}`);
                }
            })
            this.setState({
                chapters : chapters,
                chapters_sections : chapters_sections
            })
        })
    }
}

export default ReviewOfError;