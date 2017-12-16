import React from 'react';
import {Button} from 'antd';
import { Document, Page } from 'react-pdf';
import{Post} from '../../../../fetch/data.js';
class Answer extends React.Component{
    constructor(){
        super();
        this.state={
            PDF:'',
            numPages: null,
            pageNumber: 1,
            scale:1.5,
            data:[]
        }
    }
    // onDocumentLoad({ numPages }) {
    //     this.setState({ numPages });
    //   }
    render(){
        console.log('答案')
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
                    dataObj[item2.problemId+'_'] = item2.index
                })
            })
            for(var key in dataObj){
                dataParams.push({
                    problemId: key.split('_')[0],
                    index: dataObj[key],
                })
            }
            console.log('YYYYYYYY',dataParams)
            var result = Post('http://118.31.16.70/api/v3/students/me/getAnswers/',dataParams);  
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
        if(JSON.stringify(nextProps.data)!==JSON.stringify(this.state.data)|| nextState.PDF!==this.state.PDF){
            console.log('答案不一样')
            return true;
        }else{
            console.log('答案一样')
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
                dataObj[item2.problemId+'_'] = item2.index
            })
        })
        for(var key in dataObj){
            dataParams.push({
                problemId: key.split('_')[0],
                index: dataObj[key],
            })
        }
        console.log('YYYYYYYY',dataParams)
        var result = Post('http://118.31.16.70/api/v3/students/me/getAnswers/',dataParams);  
        result.then((response)=>{
            if(response.status === 200){
                this.setState({
                    PDF : response.data.pdfurl
                })
            }
        })
    }
    
}

export default Answer;