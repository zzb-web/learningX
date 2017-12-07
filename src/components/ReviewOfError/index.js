import React, { Component } from 'react';
import {Row , Col, Select, Button} from 'antd';
import { withRouter } from 'react-router';
import Result from './subpage/Result/index.js';
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
            warningMsg:'',
            showDetail:false,
            currentIndex:1,
            allNum:0
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
                warningMsg:'章信息不正常',
                showDetail:false
            })
        }else if(selectValue === '0'){
            this.setState({
                showWarning:true,
                warningMsg:'复习方式不正常',
                showDetail:false
            })
        }else if(selectValue !== '0' && currentChapterNum !== 0 && currentSectionNum !==0){
            console.log('xxxxx')
            // this.setState({
            //     showWarning:false
            // })
            let url = `http://118.31.16.70/api/v3/students/me/wrongProblemsInfo/?chapter=${currentChapterNum}&section=${currentSectionNum}`;
            let data = Get(url);
            data.then((response)=>{
                console.log(response.data)
                if(response.status === 200){
                    var dataTest = [
                        {"problemId":"20758","subIdx":1,"index":1},
                        {"problemId":"20758","subIdx":2,"index":1},
                        {"problemId":"20758","subIdx":3,"index":1},
                        {"problemId":"20758","subIdx":4,"index":1},
                        {"problemId":"20771","subIdx":1,"index":2},
                        {"problemId":"20771","subIdx":2,"index":2},
                        {"problemId":"20779","subIdx":-1,"index":3},
                        {"problemId":"20761","subIdx":1,"index":4},
                        {"problemId":"20761","subIdx":2,"index":4},
                        {"problemId":"20761","subIdx":3,"index":4}
                    ]
                    var data1 = {};
                    var detailData = []
                    response.data.wrongProblems.map((item,index)=>{
                        if(data1[item.problemId+'_']===undefined){
                            data1[item.problemId+'_']=[];
                            data1[item.problemId+'_'].push(item)
                        }else{
                            data1[item.problemId+'_'].push(item)
                        }
                    })
                    console.log('OOOOOOO',data1);
                    for(var key in data1){
                        detailData.push(data1[key])
                    }
                    console.log('vvvvvvvvvv',detailData)
                    this.setState({
                        detailData : detailData,
                        showWarning:false,
                        showDetail:true,
                        allNum : detailData.length
                    })
                }else if(response.status ===404){
                    this.setState({
                        showWarning:true,
                        warningMsg:'CS无数据',
                        showDetail:false
                    })
                }else if(response.status ===401){
                    this.props.history.push('/');
                }
                
            })
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
    saveHandle(value){
        this.setState({
            showDetail:value,
            currentIndex:1
        })
    }
    getCurrentIndex(value){
        this.setState({
            currentIndex:value
        })
    }
    render(){
        const {chapters, currentSections,chapters_sections,defaultSections,currentChapterNum,currentSectionNum, detailData,category} = this.state;
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
                                    <Select placeholder='选择复习方式' style={{ width: 240, marginLeft:'10px' }} onChange={this.changeCategory.bind(this)}>
                                        <Option value="1">全部</Option>
                                        <Option value="2">逐题</Option>
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
                            {
                                this.state.showDetail && this.state.category ==='1' ? <div className='save-success'>
                                     <div>本节错题总量：<span style={{color:'#108ee9'}}>{this.state.allNum}</span></div>
                                 </div> : null
                            }
                            {
                                this.state.showDetail && this.state.category ==='2' ? <div className='save-success'>
                                    <div>本节错题总量：<span style={{color:'#108ee9'}}>{this.state.allNum}</span></div>
                                    <div>当前为第<span style={{color:'#108ee9'}}>{this.state.currentIndex}</span>道题</div>
                                 </div> : null
                            }
                        </div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <div className='category-detail'>
                            {
                                this.state.showDetail ? <Result category={category} data={detailData} allNum={this.state.allNum} saveHandle={this.saveHandle.bind(this)} currentIndex={this.getCurrentIndex.bind(this)}/> : null
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
            if(response.status ===200){
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
            }else if(response.status ===401){
                this.props.history.push('/');
            }
            this.setState({
                chapters : chapters,
                chapters_sections : chapters_sections
            })
        })
    }
}

export default withRouter(ReviewOfError);