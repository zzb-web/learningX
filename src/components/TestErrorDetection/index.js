import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Row , Col, Select, Button ,Input,InputNumber} from 'antd';
import Result from '../ErrorDetection/subpage/Result/index.js';
import {Post, Get} from '../../fetch/data.js';
import './style.css';
const Option = Select.Option;
class TestErrorDetection extends Component {
    constructor(){
        super();
        this.state = {
            category : 'newestWrongPaperProblems',
            materials : [],
            chooseAgain : false,
            requestData : [],
            showMaterials : true,
            detailData : [],
            showFail : false,
            showDetail : false,
            failMsg : '',
            allNum : 0,
            maxNum : 10,
            returnData : {},
            sort : 1,
            paper : 2,
            showSure: true
        }
    }
    changeCategory(value){
        var type;
        if(value === '1'){
            type = 'onceWrongPaperProblems';
        }else if(value === '2'){
            type = 'newestWrongPaperProblems';
        }
        this.setState({
            category : type
        })
    }
    sureBtnHandle(){
        this.setState({showSure : false})
      setTimeout(()=>{
          this.setState({showSure:true})
      },500)
      const {category , requestData, maxNum,sort,paper} = this.state;
      if(maxNum === 0 || maxNum === undefined){
          this.setState({
            showFail : true,
            showDetail : false,
            failMsg : '请输入题目数量的最大值'
          })
      }else if(sort === ''){
        this.setState({
            showFail : true,
            showDetail : false,
            failMsg : '请选择题目排序方式'
          })
      }else if(paper === ''){
        this.setState({
            showFail : true,
            showDetail : false,
            failMsg : '请选择纸张大小'
          })
      }else{
      var url = `/api/v3/students/me/${category}/`;
      var requestFlag = true;
      var thisRequestData = [];
      requestData.map((item,index)=>{
        if(item !== ''){
            thisRequestData.push(item)
        }
      })
      var postMsg = {
        sort : sort,
        paper :paper,
        max: maxNum,
        paperIDs:thisRequestData
        }
        console.log(postMsg)
      if(requestFlag){
      Post(url,postMsg)
      .then((response)=>{
        if(response.status === 200){
            var data1 = {};
            var detailData = [];
            var wrongProblems = response.data.wrongProblems;
            if(sort === 1){
                wrongProblems.map((item,index)=>{
                    item.problems.map((item2,index2)=>{
                        item2.type = `${item2.book}/P${item2.page}/${item2.idx}`
                    })
                })
            }
            wrongProblems.map((item,index)=>{
                item.problems.map((item2,index2)=>{
                    if(data1[item2.problemId+'_']===undefined){
                        data1[item2.problemId+'_']=[];
                        data1[item2.problemId+'_'].push(item2)
                    }else{
                        data1[item2.problemId+'_'].push(item2)
                    }
                })
            })
            for(var key in data1){
                detailData.push(data1[key])
            }
            console.log(detailData)
            this.setState({
                detailData : detailData,
                showMaterials : false,
                chooseAgain : true,
                showFail : false,
                showDetail : true,
                allNum : response.data.totalNum,
                returnData : response.data
            })
        }else if(response.status === 404){
            if(category === ''){
                this.setState({
                    failMsg : '请选择错题状态'
                })
            }else{
                this.setState({
                    failMsg : 'CS没数据'
                })
            }
            this.setState({
                showFail : true,
                showDetail : false
            })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    }
    }
    saveHandle(flag){
        this.setState({
            chooseAgain : flag,
            showMaterials : !flag
        })
    }
    chooseAgain(){
        this.setState({
            showMaterials : true,
            chooseAgain : false,
            showFail : false,
            showDetail : false,
          })
    }
    addMaterials(){
        var {requestData} = this.state;
            requestData.push('')
            this.setState({
                requestData : requestData
            })
    }
    maxNumChange(value){
        this.setState({
            maxNum : value
        })
    }
    changeSort(value){
        this.setState({
            sort:Number(value)
        })
    }
    changePaper(value){
        this.setState({
            paper:Number(value)
        })
    }
    pageChange(index,value){
        const {requestData} = this.state;
        requestData[index] = value;
        this.setState({
            requestData : requestData
        })
    }
    componentWillMount(){
        //设置数字，根据数字 ，截取返回数据数组
        const data = Get('/api/v3/students/me/markedPapers/');
        data.then((response)=>{
            if(response.status === 200){
                var data1 = response.data.slice(0,2)
                var requestData = [
                    '',
                    ''
                ]
                this.setState({
                    materials:response.data,
                    requestData : requestData
                })
            }else if(response.status ===401){
                this.props.history.push('/');
            }else{
                this.setState({materials:[]})
            }
        })
    }
    render(){
        const {showSure,requestData,materials, chooseAgain , showMaterials ,detailData ,allNum ,showFail, failMsg, showDetail,returnData ,paper} = this.state;
        return(
            <div className='error-detection'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择测试内容</h2>
                            <div className='select-info-content'>
                                <div className='select-category-1'>
                                    <span>错题状态&nbsp;&nbsp;:</span>
                                    <Select placeholder='选择错题状态' style={{ width: 240, marginLeft:'10px' }} onChange={this.changeCategory.bind(this)} defaultValue='2'>
                                       <Option value='1'>曾经错过的所有题</Option>
                                       <Option value='2'>现在仍错的题</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span>题量控制&nbsp;&nbsp;:</span>
                                    <InputNumber placeholder='控制题目数量的最大值'
                                                 defaultValue = {10} 
                                                 min={1} 
                                                 style={{ width: 240, marginLeft:'10px'}} 
                                                 onChange={this.maxNumChange.bind(this)}/>
                                </div>
                                <div className='select-category-1'>
                                    <span>排序算法&nbsp;&nbsp;:</span>
                                    <Select defaultValue='1' placeholder='选择题目排序方式' style={{ width: 240, marginLeft:'10px' }} onChange={this.changeSort.bind(this)}>
                                       <Option value='1'>按出题方式</Option>
                                       <Option value='2'>按题目类型</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1'>
                                    <span>纸张大小&nbsp;&nbsp;:</span>
                                    <Select defaultValue='2' placeholder='选择输出纸张的大小' style={{ width: 240, marginLeft:'10px' }} onChange={this.changePaper.bind(this)}>
                                        <Option value='1'>A3</Option>
                                        <Option value='2'>A4</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1' style={chooseAgain?{display:'block'}:{display:'none'}}>
                                    <span></span>
                                    <Button type="primary" size='large' style={{width:240,height:35,marginLeft:'10px'}} onClick={this.chooseAgain.bind(this)}>重选题目</Button>
                               </div>
                            </div>
                            {
                                showFail? <div className='save-success'>
                                                           <span style={{color:'red'}}>{failMsg}</span>
                                                        </div> : null
                            }
                            {
                                showDetail ? <div className='save-success'>
                                     <div>题目总量：<span style={{color:'#108ee9'}}>{allNum}</span></div>
                                 </div> : null
                            }
                        </div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <div className='category-detail' style={showMaterials?{display:'block'}:{display:'none'}}>
                            <div className='materials-content'>
                                {
                                   requestData.map((item,index)=><AddLearningMaterials key={index} materials={materials} pageChange={this.pageChange.bind(this, index)}/>)
                                }
                                <div className='addBtn'><Button icon="plus" style={{width:200}} onClick={this.addMaterials.bind(this)}>添加</Button></div>
                            </div>
                            <div className='addBtn'>
                                <Button type="primary" 
                                        size='large' 
                                        style={{width:240,height:35,marginLeft:'10px'}} 
                                        onClick={this.sureBtnHandle.bind(this)}
                                        disabled={!showSure}>确定</Button>

                            </div>
                        </div>
                        {
                            showMaterials ? null : <Result data={detailData} type={4} returnData={returnData} saveHandle={this.saveHandle.bind(this)} paper={paper}/>
                        }
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

class AddLearningMaterials extends React.Component{
    selectMaterials(value){
        this.props.pageChange(value)
    }
    render(){
        const {name,materials} = this.props;
        return(
            <div style={{marginTop:20}}>
                <span className='subsection'><span>试卷名称:</span><Select onChange={this.selectMaterials.bind(this)} style={{width:240}}>
                                                                    {materials.map((item,index)=><Option value={item.paperID} key={index}>{item.name}</Option>)}
                                                                  </Select></span>
            </div>
        )
    }
}

export default withRouter(TestErrorDetection);