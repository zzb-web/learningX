import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Row , Col, Select, Button ,Input,InputNumber} from 'antd';
import Result from './subpage/Result/index.js';
import {Post, Get} from '../../fetch/data.js';
import './style.css';
const Option = Select.Option;
class TestDetection extends Component {
    constructor(){
        super();
        this.state = {
            category : '',
            materials : [],
            chooseAgain : false,
            requestData : [],
            showMaterials : true,
            detailData : [],
            showFail : false,
            showDetail : false,
            failMsg : '',
            allNum : 0,
        }
    }
    changeCategory(value){
        var type;
        if(value === '1'){
            type = 'checkProblemsForAll';
        }else if(value === '2'){
            type = 'checkProblemsForKnown';
        }else if(value === '3'){
            type = 'checkProblemsForStillWrong';
        }
        this.setState({
            category : type
        })
    }
    sureBtnHandle(){
      const {category , requestData} = this.state;
      var url = `http://118.31.16.70/api/v3/students/me/${category}/`;

      Post(url,requestData)
      .then((response)=>{
        if(response.status === 200){
            var data1 = {};
            var detailData = [];
            response.data.wrongProblems.map((item,index)=>{
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
            this.setState({
                detailData : detailData,
                showMaterials : false,
                chooseAgain : true,
                showFail : false,
                showDetail : true,
                allNum : response.data.totalNum
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
            requestData.push({
                book : '',
                startPage: 0,
                endPage: 0
            })
            this.setState({
                requestData : requestData
            })
    }
    pageChange(index,value){
        const {requestData} = this.state;
        if(value[0] === 0){
            requestData[index].book = value[1];
        }else if(value[0] === 1){
            requestData[index].startPage = value[1];
        }else{
            requestData[index].endPage = value[1];
        }
        this.setState({
            requestData : requestData
        })
    }
    componentWillMount(){
        //设置数字，根据数字 ，截取返回数据数组
        const data = Get('http://118.31.16.70/api/v3/students/me/books/');
        data.then((response)=>{
            if(response.status === 200){
                var data1 = response.data.slice(0,2)
                var requestData = [
                    {
                        book : '',
                        startPage: 0,
                         endPage: 0
                    },
                    {
                        book : '',
                        startPage: 0,
                        endPage: 0
                    }
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
        const {requestData,materials, chooseAgain , showMaterials ,detailData ,allNum ,showFail, failMsg, showDetail} = this.state;
        return(
            <div className='error-detection'>
                <Row>
                    <Col span={8}>
                        <div className='select-info'>
                            <h2 className='select-info-h2'>选择测试内容</h2>
                            <div className='select-info-content'>
                                <div className='select-category-1'>
                                    <span>错题状态&nbsp;&nbsp;:</span>
                                    <Select placeholder='选择错题状态' style={{ width: 240, marginLeft:'10px' }} onChange={this.changeCategory.bind(this)}>
                                       <Option value='1'>所有曾经错过的题的同类型题目</Option>
                                       <Option value='2'>已会错题的同类型题目</Option>
                                       <Option value='3'>现在仍错的同类型题目</Option>
                                    </Select>
                                </div>
                                <div className='select-category-1' style={{visibility:'hidden'}}>
                                </div>
                                <div className='select-category-1' style={{visibility:'hidden'}}>
                                </div>
                                <div className='select-category-1' style={chooseAgain?{display:'block'}:{display:'none'}}>
                                    <span></span>
                                    <Button type="primary" size='large' style={{width:240,height:35,marginLeft:'10px'}} onClick={this.chooseAgain.bind(this)}>重新选择</Button>
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
                            <div className='addBtn'><Button type="primary" size='large' style={{width:240,height:35,marginLeft:'10px'}} onClick={this.sureBtnHandle.bind(this)}>确定</Button></div>
                        </div>
                        {
                            showMaterials ? null : <Result data={detailData} saveHandle={this.saveHandle.bind(this)}/>
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
        this.props.pageChange([0,value])
    }
    startChage(value){
        this.props.pageChange([1, value])
    }
    endChange(value){
        this.props.pageChange([2, value])
    }
    render(){
        const {name,materials} = this.props;
        return(
            <div style={{marginTop:20}}>
                <span className='subsection'><span>学习资料:</span><Select onChange={this.selectMaterials.bind(this)} style={{width:240}}>
                                                                    {materials.map((item,index)=><Option value={item} key={index}>{item}</Option>)}
                                                                  </Select></span>
                <span className='subsection'><span>开始页码:</span><InputNumber onChange={this.startChage.bind(this)}/></span>
                <span className='subsection'><span>结束页码:</span><InputNumber onChange={this.endChange.bind(this)}/></span>
            </div>
        )
    }
}

export default withRouter(TestDetection);