import React from 'react';
import {Button,Modal} from 'antd';
import { Document, Page } from 'react-pdf';
import{Post} from '../../../../fetch/data.js';
class ErrorTopic extends React.Component{
    constructor(){
        super();
        this.state={
            PDF:'',
            numPages: null,
            pageNumber: 1,
            scale: 1.5,
            data :[]
        }
    }
    // onDocumentLoad({ numPages }) {
    //     this.setState({ numPages });
    //   }
    render(){
        console.log('错题');
        const {PDF,pageNumber, numPages} = this.state;
        return (
            <div>
            <div style={{height:350,overflow:'auto',border:'1px solid #d9d9d9'}}>
              <Document
                file={PDF}
                scale={this.state.scale}
                // onLoadSuccess={this.onDocumentLoad.bind(this)}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              {/* <p>Page {pageNumber} of {numPages}</p> */}
            </div>
           
            <div className='save_btn'>
                {
                    this.props.category === '1'?<a download={PDF} href={PDF} target="blank"><Button type="primary" size='large' style={{width:240,height:35}}>
                                                     下载</Button></a>
                                                :null
                }
            </div>
            </div>
          );
    }
    componentWillReceiveProps(nextProps){
        console.log('willreceive');
        var data = nextProps.data;
        if(JSON.stringify(this.state.data)!==JSON.stringify(nextProps.data)){
            console.log('不一样')
            this.setState({
                data : data
            })
            var dataObj = {};
            var dataParams = []
            data.map((item,i)=>{
                item.map((item2,i2)=>{
                    dataObj[item2.problemId+'_'] = {
                                                    index : item2.index,
                                                    subIdx : item2.subIdx,
                                                    full : item2.full,
                                                    type : item2.type
                                                    }
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
            var params = [];
            for(var key in dataParams){
                params.push({
                    type : key,
                    problems : dataParams[key]
                })
            }
            console.log(params);
            var result = Post('http://118.31.16.70/api/v3/students/me/getWrongProblems/',params);  
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
        if(JSON.stringify(nextProps.data)!==JSON.stringify(this.state.data) || nextState.PDF!==this.state.PDF){
            console.log('错题不一样')
            return true;
        }else{
            console.log('错题一样')
            return false;
        }
       
    }

   componentDidMount(){
       console.log('componentDidMount');
        var data = this.props.data;
        this.setState({
            data:data
        })
        var dataObj = {};
        var dataParams = []
        data.map((item,i)=>{
            item.map((item2,i2)=>{
                dataObj[item2.problemId+'_'] = {
                                                index : item2.index,
                                                subIdx : item2.subIdx,
                                                full : item2.full,
                                                type : item2.type
                                                }
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
        var params = [];
        for(var key in dataParams){
            params.push({
                type : key,
                problems : dataParams[key]
            })
        }
        console.log(params)
        var result = Post('http://118.31.16.70/api/v3/students/me/getWrongProblems/',params);  
        result.then((response)=>{
            if(response.status === 200){
                this.setState({
                    PDF : response.data.pdfurl
                })
            }
        })
    }
    
}

export default ErrorTopic;