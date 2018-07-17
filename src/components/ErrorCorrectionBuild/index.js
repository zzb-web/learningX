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
            wrongProblemStatus: 1,
            textbookStatus: 0,
            referenceBookStatus: 0,
            paperStatus: 0,
           },
           wrongProblems : {
            totalNum : '',
            wrongProblems : []
            },
            buildErrorData : {},
            tableData : [],
            docurl : '',
            errorUrl : '',
            answerUrl : '',
            tableData : []
        }
    }
    _handleTableData(data){
        if(data !== undefined){
            let returnData = []
            data.map((item,index)=>{
                item.problems.map((item2,index2)=>{
                    returnData.push({
                        titleNumber : item2.subIdx === -1 ? `${item2.index}` : `${item2.index}(${item2.subIdx})`,
                        titleSource : item2.subIdx === -1 ? `${item2.book}/P${item2.page}/T${item2.idx}` : `${item2.book}/P${item2.page}/T${item2.idx}/(${item2.subIdx})`,
                        titleBasic : item2.reason
                    })
                })
            })
            return returnData;
        }
    }

    _handleData(data){
        if(data !== undefined){
            let dataHandle = JSON.parse(JSON.stringify(data));
            dataHandle.map((item,index)=>{
                let itemP = item.problems[0];
                item.type = `${itemP.book}/P${itemP.page}/${itemP.idx}`;
                item.problems.map((item2,index2)=>{
                    delete item2.book;
                    delete item2.column;
                    delete item2.idx;
                    delete item2.page;
                    delete item2.reason;
                    delete item2.type;
                })
            })
            let data_1 = {
                pageType: 'A4', 
                problems: dataHandle,
            }
            return data_1;
        }
    }
    
    btnHandle=()=>{
        const {current} = this.state;
        if(current === 0){
            Post('/api/v3/students/me/problemFileState/',{state:0})
            var url = `/api/v3/students/me/wrongProblems/?sort=1&max=10`;
            Get(url).then(resp=>{
                this.setState({
                    wrongProblems : resp.data,
                    tableData : this._handleTableData(resp.data.wrongProblems),
                    buildErrorData : this._handleData(resp.data.wrongProblems)
                })
            })
        }else if(current ===1){
            const {buildErrorData} = this.state;
            console.log(buildErrorData)
            var url = '/api/v3/students/me/getProblemsFile/';
            Post(url,buildErrorData).then(resp=>{
                this.setState({
                    docurl : resp.data.pdfurl,
                    errorUrl : resp.data.pdfurl
                })
            })
            Post('/api/v3/students/me/problemFileState/',{state:2})
        }else if(current === 2){
            const {wrongProblems} = this.state;
            this.setState({
                docurl : ''
            })

            let timestamp = Date.parse(new Date())/1000;
            let detail = JSON.stringify(wrongProblems);
            var url = '/api/v3/students/me/uploadTasks/';
            var postMsg ={
                time : timestamp,
                type : 1,
                detail : detail
            }
            Post(url,postMsg).then(resp=>{
                
            }).catch(err=>{
                
            })
            Post('/api/v3/students/me/problemFileState/',{state:3})
            
        }else if(current === 3){
            let answerData = this.state.wrongProblems.wrongProblems;
            let data = {};
            answerData.map((item,index)=>{
                item.problems.map((item2,index2)=>{
                    data[`${item2.index}_${item2.problemId}`] = `${item2.problemId}_${item2.book}/P${item2.page}/${item2.idx}`
                })
            })
            let data_1=[];
            for(var key in data){
                data_1.push({
                    problemId: key.split('_')[1],
                    index: Number(key.split('_')[0]),
                    location : data[key].split('_')[1]
                })
            }
            let postData = {
                pageType: 'A4',
                problems : data_1
            }
            var url = '/api/v3/students/me/getAnswersFile/';
            Post(url,postData).then(resp=>{
                this.setState({
                    docurl : resp.data.pdfurl,
                    answerUrl : resp.data.pdfurl
                })
            })
            Post('/api/v3/students/me/problemFileState/',{state:4})
        }else if(current === 4){
            Post('/api/v3/students/me/problemFileState/',{state:5})
        }else if(current  === 5){
            this.props.setKey('0')
        }
        if(current<=4){
            this.setState({
                current : current+1
            })
        }
    }
    componentWillMount(){
        Get('/api/v3/students/me/problemFileState/').then(resp=>{
            this.setState({
                current : resp.data.state
            },()=>{
                const {current} = this.state;
                if(current>0){
                    Get('/api/v3/students/me/lastWrongProblems/').then(resp=>{
                        this.setState({
                            wrongProblems : resp.data,
                            tableData : this._handleTableData(resp.data.wrongProblems),
                        })
                    })
                    Get('/api/v3/students/me/lastFileURLs/').then(resp=>{
                       if(current === 2){
                           this.setState({
                               docurl : resp.data.problemFileURL
                           })
                       }else if(current === 4){
                           this.setState({
                               docurl : resp.data.answerFileURL
                           })
                       }
                           this.setState({
                               errorUrl : resp.data.problemFileURL,
                               answerUrl : resp.data.answerFileURL
                           })
                    })
                }else{
                    var url = `/api/v3/students/me/problemRecords/`;
                    Get(url).then(resp=>{
                        this.setState({
                            problemRecords : resp.data
                        })
                    }) 
                }
            })
        })

             
    }
    render(){
        const { current,problemRecords,wrongProblems,tableData,docurl,errorUrl,answerUrl} = this.state;
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
            case 5 :
                btnContent = '标记纠错本';
                break;
            default : 
                btnContent = '标记纠错本';
                break;

        }
        let nextStep = problemRecords.wrongProblemStatus === 0 ? false : true;
        const steps = [{
            title: '标记情况',
            content: <ErrorContent problemRecords={problemRecords}/>,
          }, {
            title: '生成纠错本',
            content : <TableContent tableData={tableData} current={current} errorUrl={errorUrl} answerUrl={answerUrl}/>,
          }, {
            title: '下载纠错本',
            content: <TableContent tableData={tableData} current={current} errorUrl={errorUrl} answerUrl={answerUrl}/>,
          },{
            title: '生成答案',
            content: <TableContent tableData={tableData} current={current} errorUrl={errorUrl} answerUrl={answerUrl}/>,
          },{
            title: '下载答案',
            content: <TableContent tableData={tableData} current={current} errorUrl={errorUrl} answerUrl={answerUrl}/>,
          },
          {
            title: '标记错题本',
            content: <TableContent tableData={tableData} current={current} errorUrl={errorUrl} answerUrl={answerUrl}/>,
          }];

        let btn;
        if(current === 0){
            btn = <Button type='primary' style={{width:160,height:34}}
                        onClick={this.btnHandle}
                        disabled={nextStep}>
                        {btnContent}
                    </Button>
        }else if(current === 1){
            btn = <Button type='primary' style={{width:160,height:34}}
                            onClick={this.btnHandle}>
                            {btnContent}
                  </Button>
        }else if(current === 2){
            btn = <Button type='primary' style={{width:160,height:34}}
                        onClick={this.btnHandle}
                        disabled={docurl === '' ? true: false}>
                        {btnContent}
                    </Button>
        }else if(current === 3){
            btn = <Button type='primary' style={{width:160,height:34}}
                            onClick={this.btnHandle}>
                            {btnContent}
                  </Button>
        }else if(current === 4){
            btn = <Button type='primary' style={{width:160,height:34}}
                        onClick={this.btnHandle}
                        disabled={docurl === '' ? true: false}>
                        {btnContent}
                    </Button>
        }else{
            btn = <Button type='primary' style={{width:160,height:34,background:'red',border:'none'}}
                            onClick={this.btnHandle}>
                            {btnContent}
                    </Button>
        }
        // const btn = <Button type='primary' style={current <=4 ? {width:160,height:34}:{width:160,height:34,background:'red',border:'none'}}
        //                     onClick={this.btnHandle}
        //                     disabled={current !== 2 && current !==4 ? nextStep : docurl === '' ? true: false}>
        //                     {btnContent}
        //             </Button>
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
                                {/* {current <=4 ? steps[current <=4 ? current : 4].content : <TableContent tableData={tableData} current={current} errorUrl={errorUrl} answerUrl={answerUrl}/>
                                } */}
                                {
                                    steps[current].content
                                }
                            </div>
                            <div className='nextBtn'>
                                {
                                    current !==2 && current !== 4? btn
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
   componentWillReceiveProps(nextProps){
       this.setState({
        problemRecords : nextProps.problemRecords
       })
   }
    render(){
        const {problemRecords} = this.state;
        console.log(problemRecords.bookStatus)
        let error = problemRecords.wrongProblemStatus === 0 ? true : false;
        let paper = problemRecords.paperStatus === 0 ? true : false;
        const booksArr = problemRecords.bookStatus || [];
        let booksStatus = [];
        booksArr.map((item,index)=>{
            booksStatus.push({
                key : index+2,
                number : item.book,
                errorMark : <span style={item.status === 0 ?{color:'#49a9ee'}:{color:'#c0c0c0'}}>
                                     在近一周内{item.status === 0?'有':'无'}错题标记</span>
            })
        })
        const columns = [{
            title: '学习资料',
            dataIndex: 'number',
            key: 'number',
            width:'30%'
          }, {
            title: '错题标记情况',
            dataIndex: 'errorMark',
            key: 'errorMark',
            width:'70%'
          }];
        let dataSource = [
            { 
                key: '1',
                number: '纠错本',
                errorMark: <span style={error?{color:'#49a9ee'}:{color:'red'}}>
                                {error?'已':'未'}标记</span>
            },
            { 
                key: '2',
                number: '试卷',
                errorMark:<span style={paper?{color:'#49a9ee'}:{color:'red'}}>
                                {paper?'已':'未'}标记</span>
            },
        ]
        dataSource = dataSource.concat(booksStatus);
        return(
            <div className='errorTable'>
                <Table  columns={columns}
                        dataSource={dataSource}
                        bordered
                        scroll={{ y: 300 }}
                        pagination={false}/>
            </div>
        )
    }
}
/*class BuildError extends Component{
    constructor(props){
        super();
        this.state={
            tableData : props.tableData,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tableData : nextProps.tableData
        })
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
    constructor(props){
        super();
        this.state={
            tableData : props.tableData,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tableData : nextProps.tableData
        })
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
class BuildAnswer extends Component{
    constructor(props){
        super();
        this.state={
            tableData : props.tableData,
            errorUrl : props.errorUrl
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tableData : nextProps.tableData,
            errorUrl : nextProps.errorUrl
        })
    }
    render(){
        const {tableData,errorUrl} = this.state;
        return(
            <div className='buildErrorTable'>
                <TableHandle tableData={tableData}/>
                <a download={errorUrl} href={errorUrl} target="blank">
                    <Button style={{position:'relative',top:58,left:500}}>下载纠错本</Button>
                </a>
            </div>
        )
    }
}
class DownloadAnswer extends Component{
    constructor(props){
        super();
        this.state={
            tableData : props.tableData,
            errorUrl : props.errorUrl
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tableData : nextProps.tableData,
            errorUrl : nextProps.errorUrl
        })
    }
    render(){
        const {tableData,errorUrl} = this.state;
        return(
            <div className='buildErrorTable'>
                <TableHandle tableData={tableData}/>
                <a download={errorUrl} href={errorUrl} target="blank">
                    <Button style={{position:'relative',top:58,left:500}}>下载纠错本</Button>
                </a>
            </div>
        )
    }
}
class ErrorMark extends Component{
    constructor(props){
        super();
        this.state={
            tableData : props.tableData,
            answerUrl : props.answerUrl
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tableData : nextProps.tableData,
            answerUrl : nextProps.answerUrl
        })
    }
    render(){
        const {tableData,answerUrl} = this.state;
        return(
            <div className='buildErrorTable'>
                <TableHandle tableData={tableData}/>
                <a download={answerUrl} href={answerUrl} target="blank">
                    <Button style={{position:'relative',top:58,left:500}}>下载答案</Button>
                </a>
            </div>
        )
    }
}*/

class TableContent extends Component{
    constructor(props){
        super();
        this.state={
            tableData : props.tableData,
            answerUrl : props.answerUrl,
            errorUrl : props.errorUrl,
            current : props.current,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tableData : nextProps.tableData,
            answerUrl : nextProps.answerUrl,
            errorUrl : nextProps.errorUrl,
            current : nextProps.current,
        })
    }
    downloadHandle(){
        const {current ,answerUrl ,errorUrl} = this.state;
        let URL = ''
        if(current <=4){
            URL = errorUrl;
        }else {
            URL = answerUrl;
        }
        // 创建隐藏的可下载链接                   
        var eleLink = document.createElement('a');
        eleLink.download = URL;
        eleLink.href = URL;
        eleLink.target = 'blank';
        eleLink.style.display = 'none';  
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }
    render(){
        const {tableData,answerUrl,current} = this.state;
        return(
            <div className='buildErrorTable'>
                <TableHandle tableData={tableData}/>
                {current>2 ? <Button style={{position:'relative',top:55,left:500}} onClick={this.downloadHandle.bind(this)}>
                                    {current<=4 ?'下载纠错本':'下载答案'}
                            </Button> : null}
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
        if(tableData !== undefined){
            tableData.map((item,index)=>{
                dataSource.push({
                    key : index,
                    titleNumber : item.titleNumber,
                    titleSource : item.titleSource,
                    titleBasic : item.titleBasic
                })
            })
        }
        return(
            <Table  columns={columns}
                        dataSource={dataSource}
                        bordered
                        scroll={{ y: 300 }}
                        pagination={false}/>
        )
    }
}
export default withRouter(ErrorCorrectionBuild);
