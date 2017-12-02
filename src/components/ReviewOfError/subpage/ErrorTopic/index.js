import React from 'react';
import { Document, Page } from 'react-pdf';
import{Post} from '../../../../fetch/data.js';
class ErrorTopic extends React.Component{
    constructor(){
        super();
        this.state={
            PDF:'',
            numPages: null,
            pageNumber: 0,
        }
    }
    onDocumentLoad({ numPages }) {
        this.setState({ numPages });
      }
    render(){
        const {PDF,pageNumber, numPages} = this.state;
        return (
            <div>
              <Document
                file={`http://118.31.16.70${PDF}`}
                onLoadSuccess={this.onDocumentLoad.bind(this)}
              >
                {/* <Page pageNumber={pageNumber} /> */}
              </Document>
              {/* <p>Page {pageNumber} of {numPages}</p> */}
            </div>
          );
    }
    componentWillMount(){
        var data = this.props.data;
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
        var result = Post('http://118.31.16.70/api/v3/students/me/getWrongProblems/',dataParams);  
        result.then((response)=>{
            if(response.status === 200){
                this.setState({
                    PDF : response.data
                })
            }
        })
    }
}

export default ErrorTopic;