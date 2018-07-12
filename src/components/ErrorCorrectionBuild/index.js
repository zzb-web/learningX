import React, { Component } from 'react';
import {Row , Col, Select, Button ,DatePicker, InputNumber,Steps,Table} from 'antd';
import { withRouter } from 'react-router';
import {Get,Post} from '../../fetch/data.js';
import './style.css'
const {Step} = Steps;
class ErrorCorrectionBuild extends Component {
    constructor(){
        super();
        this.state = {
           current : 0,
           problemRecords : {
            wrongProblemStatus: 0,
            textbookStatus: 0,
            referenceBookStatus: 0,
            paperStatus: 0,
           },
           wrongProblems : {
            totalNum : 0,
            wrongProblems : []
            },
            buildErrorData : {},
            tableData : [],
            docurl : ''
        }
    }
    btnHandle=()=>{
        const {current} = this.state;
        if(current === 0){
            var url = `/api/v3/students/me/wrongProblems/?sort=1&max=10`;
            Get(url).then(resp=>{
                this.setState({
                    wrongProblems : resp.data
                })
            })
        }else if(current ===1){
            const {buildErrorData} = this.state;
            console.log(buildErrorData)
            var url = '/api/v3/students/me/getProblemsFile/';
            Post(url,buildErrorData).then(resp=>{
                this.setState({
                    docurl : resp.data.docurl
                })
            })
        }
        this.setState({
            current : current+1
        })
    }
    getBuildErrorData(data){
        let data_1 = {
            pageType: 'A4', 
            problems: data,
        }
        this.setState({
            buildErrorData : data_1
        })
    }
    getTableData(data){
        console.log(data)
        this.setState({
            tableData : data
        })
    }
    componentWillMount(){
        var url = `/api/v3/students/me/problemRecords/`;
        Get(url).then(resp=>{
            this.setState({
                problemRecords : resp.data
            })
        })
    }
    render(){
        const { current,problemRecords,wrongProblems,tableData,docurl} = this.state;
        let btnContent='';
        switch(current){
            case 0 : 
                btnContent = '下一步';
                break;
            case 1 : 
                btnContent = '生成纠错本';
                break;
            case 2 :
                btnContent = '下载纠错本';
                break;
            case 3 : 
                btnContent = '生成答案';
                break;
            case 4 :
                btnContent = '下载答案';
                break;
            default : 
                btnContent = '';
                break;

        }
        let nextStep = problemRecords.wrongProblemStatus === 0 ? false : false;
        const steps = [{
            title: '错题标记',
            content: <ErrorContent problemRecords={problemRecords}/>,
          }, {
            title: '生成纠错本',
            content: <BuildError wrongProblems={wrongProblems} 
                                 sourceData={wrongProblems}
                                 getTableData={this.getTableData.bind(this)}
                                 getBuildErrorData={this.getBuildErrorData.bind(this)}/>,
          }, {
            title: '下载纠错本',
            content: <DownloadError tableData={tableData}/>,
          },{
            title: '生成答案',
            content: <BuildAnswer tableData={tableData}/>,
          },{
            title: '下载答案',
            content: 'Last-content',
          }];
        const btn = <Button type='primary' style={{width:160,height:34}}
                            onClick={this.btnHandle}
                            disabled={current !== 2 ? nextStep : docurl === '' ? true: false}>
                            {btnContent}
                    </Button>
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div>
                            <Steps current={current} status={current===0 && nextStep ? 'error':'process'}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                            <div className='stepContent'>
                               {steps[current].content}
                            </div>
                            <div className='nextBtn'>
                                {
                                    current !==2 ? btn
                                                    :  <a download={docurl} href={docurl} target="blank">
                                                            {btn}
                                                        </a>
                                                        }
                            </div>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

class ErrorContent extends Component{
   constructor(props){
       super();
       this.state={
           problemRecords : props.problemRecords
       }
   }
    render(){
        const {problemRecords} = this.state;
        let error = problemRecords.wrongProblemStatus === 0 ? false : true;
        let paper = problemRecords.paperStatus === 0 ? false : true;
        let referenceBook = problemRecords.referenceBookStatus === 0 ? false : true;
        let textBook = problemRecords.paperStatus === 0 ? false : true;
        const columns = [{
            title: '题目序号',
            dataIndex: 'number',
            key: 'number',
          }, {
            title: '错题标记情况',
            dataIndex: 'errorMark',
            key: 'errorMark',
          }];
        const dataSource = [
            { 
                key: '1',
                number: '纠错本',
                errorMark: <span style={error?{color:'#49a9ee'}:{color:'red'}}>
                                {error?'已':'未'}标记</span>
            },
            { 
                key: '2',
                number: '试卷',
                errorMark:<span style={paper?{color:'#49a9ee'}:{color:'#c0c0c0'}}>
                                在近一周内{paper?'有':'无'}标记</span>
            },
            { 
                key: '3',
                number: '教辅书',
                errorMark:<span style={referenceBook?{color:'#49a9ee'}:{color:'#c0c0c0'}}>
                                在近一周内{referenceBook?'有':'无'}错题标记</span>
            },
            { 
                key: '4',
                number: '课本',
                errorMark:<span style={textBook?{color:'#49a9ee'}:{color:'#c0c0c0'}}>
                        在近一周内{textBook?'有':'无'}错题标记</span>
            },
        ]
        return(
            <div className='errorTable'>
                <Table  columns={columns}
                        dataSource={dataSource}
                        bordered
                        pagination={false}/>
            </div>
        )
    }
}
class BuildError extends Component{
    constructor(props){
        super();
        this.state={
            tableData : [],
        }
    }
    componentWillMount(){
        this._handleData(this.props.wrongProblems.wrongProblems)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.wrongProblems.totalNum !== this.props.wrongProblems.totalNum){
            this.setState({
                tableData : this._handleTableData(nextProps.sourceData.wrongProblems),
            })
            this._handleData(nextProps.wrongProblems.wrongProblems)
        }
    }
    _handleData(data){
        if(data !== undefined){
            let dataHandle = JSON.parse(JSON.stringify(data));
            dataHandle.map((item,index)=>{
                item.problems.map((item2,index2)=>{
                    delete item2.book;
                    delete item2.column;
                    delete item2.idx;
                    delete item2.page;
                    delete item2.reason;
                    delete item2.type;
                })
            })
            this.props.getBuildErrorData(dataHandle)
        }
    }
    _handleTableData(data){
        let returnData = []
        data.map((item,index)=>{
            item.problems.map((item2,index2)=>{
                returnData.push({
                    titleNumber : item2.subIdx === -1 ? `${item2.index}` : `${item2.index}(${item2.subIdx})`,
                    titleSource : item2.subIdx === -1 ? `${item2.book}/P${item2.page}/T${item2.index}` : `${item2.book}/P${item2.page}/T${item2.index}/(${item2.subIdx})`,
                    titleBasic : item2.reason
                })
            })
        })
        this.props.getTableData(returnData)
        return returnData;
    }
    render(){ 
        const {tableData} = this.state;
        return(
            <div className='buildErrorTable'>
                <TableHandle tableData={tableData}/>
            </div>
        )
    }
}
class DownloadError extends Component{
    render(){
        const {tableData} = this.props;
        return(
            <div className='buildErrorTable'>
                <TableHandle tableData={tableData}/>
            </div>
        )
    }
}
class BuildAnswer extends Component{
    render(){
        const {tableData} = this.props;
        return(
            <div className='buildErrorTable'>
                <TableHandle tableData={tableData}/>
            </div>
        )
    }
}
class TableHandle extends Component{
    render(){
        const {tableData} = this.props;
        const columns = [{
            title: '题目序号',
            dataIndex: 'titleNumber',
            key: 'titleNumber',
            width:'20%'
          }, {
            title: '题目来源',
            dataIndex: 'titleSource',
            key: 'titleSource',
            width:'30%'
          },{
            title: '选题依据',
            dataIndex: 'titleBasic',
            key: 'titleBasic',
            width:'50%'
          }];
        let dataSource = []
        tableData.map((item,index)=>{
            dataSource.push({
                key : index,
                titleNumber : item.titleNumber,
                titleSource : item.titleSource,
                titleBasic : item.titleBasic
            })
        })
        return(
            <Table  columns={columns}
                        dataSource={dataSource}
                        bordered
                        scroll={{ y: 255 }}
                        pagination={false}/>
        )
    }
}
export default withRouter(ErrorCorrectionBuild);
