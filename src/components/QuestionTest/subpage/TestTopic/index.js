import React from 'react';
import {Button,Modal} from 'antd';
import { Document, Page } from 'react-pdf';
import{Post} from '../../../../fetch/data.js';
class TestTopic extends React.Component{
    static defaultProps = {
        paper : ''
    }
    constructor(){
        super();
        this.state={
            PDF:'',
            numPages: null,
            pageNumber:1,
            scale: 3,
            data :[]
        }
    }
    onDocumentLoad({ numPages }) {
        this.setState({ numPages });
      }
    wheelEvent(event){
        var {pageNumber,numPages} = this.state;
        // console.log(pageNumber);
        var pdf = this.refs.pdf;
        var box = this.refs.box;
        var scrollHeight = box.scrollTop;
        // console.log(pdf)
         //判断鼠标滚轮的上下滑动
         let deta = event.deltaY;
         var heightDiff = 841-350;
         if(deta > 0){
            if(scrollHeight > heightDiff){
                if(pageNumber< numPages){
                    this.setState({
                        pageNumber:pageNumber+1
                    })
                    this.refs.top.scrollIntoView();
                }
                
            }
         }
         if(deta < 0){
            if(scrollHeight === 0){
                if(pageNumber>1){
                    this.setState({
                        pageNumber:pageNumber-1
                    })
                    this.refs.top.scrollIntoView();
                }
            }
         }
    }
    downLoad(){
        const {current,data,returnData} = this.props;
        var detail = JSON.stringify(returnData);
        var timestamp = Date.parse(new Date())/1000;
        if(current !== undefined){
            this.props.getTimeStamp(timestamp);
            var type;
            if(current === "00"){
                type = 1;
            }else if(current === "01"){
                type = 2;
            }
            var url = '/api/v3/students/me/uploadTasks/';
            var postMsg ={
                time : timestamp,
                type : type,
                detail : detail
            }
            Post(url,postMsg).then(resp=>{
                console.log(resp)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    render(){
        // console.log('错题');
        const {PDF,pageNumber} = this.state;
        return (
            <div>
            <div ref='box' style={{height:350,overflow:'auto',border:'1px solid #d9d9d9'}} onWheel={this.wheelEvent.bind(this)}>
                <div ref='top'></div>
              <Document
                file={PDF}
                scale={this.state.scale}
                onLoadSuccess={this.onDocumentLoad.bind(this)}
                ref = 'pdf'
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
           
            <div className='save_btn'>
                {
                    this.props.category === '1'?<a download={PDF} href={PDF} target="blank"><Button onClick={this.downLoad.bind(this)} type="primary" size='large' style={{width:240,height:35}}>
                                                     下载</Button></a>
                                                :null
                }
            </div>
            </div>
          );
    }
    componentWillReceiveProps(nextProps){
        var data = nextProps.data;
        if(JSON.stringify(this.state.data)!==JSON.stringify(nextProps.data)){
            this.setState({
                data : data
            })
            var dataObj = {};
            var dataParams = []
            data.map((item,i)=>{
                item.map((item2,i2)=>{
                          dataObj[item2.problemId+'_'+i2] = {
                            index : item2.index,
                            subIdx : item2.subIdx,
                            full : item2.full,
                            type : item2.type
                            }
                    // if(item2.full){
                    //     dataObj[item2.problemId+'_'] = {
                    //         index : item2.index,
                    //         subIdx : item2.subIdx,
                    //         full : item2.full,
                    //         type : item2.type
                    //         }
                    // }else{
                    //     dataObj[item2.problemId+'_'+i2] = {
                    //         index : item2.index,
                    //         subIdx : item2.subIdx,
                    //         full : item2.full,
                    //         type : item2.type
                    //         }
                    // }                                
                })
            })
            console.log(dataObj)
            for(var key in dataObj){
                if(dataParams[dataObj[key].type] === undefined){
                    dataParams[dataObj[key].type] = [];
                    dataParams[dataObj[key].type].push({
                                        problemId: key.split('_')[0],
                                        subIdx: dataObj[key].subIdx,
                                        index: dataObj[key].index,
                                        full:dataObj[key].full,
                                    })
                }else{
                    dataParams[dataObj[key].type].push({
                        problemId: key.split('_')[0],
                        subIdx: dataObj[key].subIdx,
                        index: dataObj[key].index,
                        full:dataObj[key].full,
                    })
                }
            }
            // var params = [];
            // for(var key in dataParams){
            //     params.push({
            //         type : key,
            //         problems : dataParams[key]
            //     })
            // }
            var paper =nextProps.paper;
            if(paper === ''){
                var params = [];
                for(var key in dataParams){
                    params.push({
                        type : key,
                        problems : dataParams[key]
                    })
                }
            }else{
                var problems = [];
                var paperString;
                if(paper === 1){
                    paperString = 'A3';
                }else{
                    paperString = 'A4';
                }
                for(var key in dataParams){
                    problems.push({
                        type : key,
                        problems : dataParams[key]
                    })
                }
                var params = {
                    pageType : paperString,
                    problems : problems
                }
            }
            var result = Post('/api/v3/students/me/getProblemsFile/',params);  
            result.then((response)=>{
                if(response.status === 200){
                    this.setState({
                        PDF : response.data.pdfurl
                    })
                }
            })
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(JSON.stringify(nextProps.data)!==JSON.stringify(this.state.data) || nextState.PDF!==this.state.PDF ||nextState.pageNumber!==this.state.pageNumber ){
            // console.log('错题不一样')
            return true;
        }else{
            // console.log('错题一样')
            return false;
        }
       
    }

   componentDidMount(){
        var data = this.props.data;
        this.setState({
            data:data
        })
        var dataObj = {};
        var dataParams = []
        data.map((item,i)=>{
            item.map((item2,i2)=>{
                dataObj[item2.problemId+'_'+i2] = {
                    index : item2.index,
                    subIdx : item2.subIdx,
                    full : item2.full,
                    type : item2.type
                    }
                // if(item2.full){
                //     dataObj[item2.problemId+'_'] = {
                //         index : item2.index,
                //         subIdx : item2.subIdx,
                //         full : item2.full,
                //         type : item2.type
                //         }
                // }else{
                //     dataObj[item2.problemId+'_'+i2] = {
                //         index : item2.index,
                //         subIdx : item2.subIdx,
                //         full : item2.full,
                //         type : item2.type
                //         }
                // }
            })
        })
        for(var key in dataObj){
            if(dataParams[dataObj[key].type] === undefined){
                dataParams[dataObj[key].type] = [];
                dataParams[dataObj[key].type].push({
                                    problemId: key.split('_')[0],
                                    subIdx: dataObj[key].subIdx,
                                    index: dataObj[key].index,
                                    full:dataObj[key].full,
                                 })
            }else{
                dataParams[dataObj[key].type].push({
                    problemId: key.split('_')[0],
                    subIdx: dataObj[key].subIdx,
                    index: dataObj[key].index,
                    full:dataObj[key].full,
                 })
            }
        }
        var paper = this.props.paper;
        if(paper === ''){
            var params = [];
            for(var key in dataParams){
                params.push({
                    type : key,
                    problems : dataParams[key]
                })
            }
        }else{
            var problems = [];
            var paperString;
            if(paper === 1){
                paperString = 'A3';
            }else{
                paperString = 'A4';
            }
            for(var key in dataParams){
                problems.push({
                    type : key,
                    problems : dataParams[key]
                })
            }
            var params = {
                pageType : paperString,
                problems : problems
            }
        }
        
        var result = Post('/api/v3/students/me/getProblemsFile/',params);  
        result.then((response)=>{
            if(response.status === 200){
                this.setState({
                    PDF : response.data.pdfurl
                })
            }
        })
    }
    
}

export default TestTopic;