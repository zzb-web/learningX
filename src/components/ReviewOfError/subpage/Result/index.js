import React from 'react';
import {Radio, Button} from 'antd';
import ResultMark from '../ResultMark/index.js';
import ErrorTopic from  '../ErrorTopic/index.js';
import KnowledgePoint from '../KnowledgePoint/index.js';
import Answer from '../Answer/index.js';
import './style.css';
// import { Button } from 'antd/lib/radio';
class Result extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          mode: 'error',
          currentIndex : 1,
        };
      }
      handleModeChange(e){
        const mode = e.target.value;
        // console.log(mode)
        this.setState({ mode });
      }
      nextOneHandle(){
          if(this.state.currentIndex<this.props.allNum){
            // console.log('下一题');
          this.setState({
              currentIndex : this.state.currentIndex+1,
              mode: 'error'
          })
          this.props.currentIndex(this.state.currentIndex);
        }
      }
      saveHandle(value){
          this.props.saveHandle(value);
      }
    render(){
        const { mode, currentIndex } = this.state;
        // console.log(currentIndex)
        const {category,data} = this.props;
        // console.log('??????????',data)
        var detailData;
        if(category === '1'){
            //显示全部的数据
            detailData = data;
            
        }else if(category === '2'){
            //只显示一条
            var data2 = [];
            data.map((item,i)=>{
                item.map((item2,i2)=>{
                    if(item2.index === currentIndex){
                        data2.push(item2)
                    }
                })
            })
            detailData = [data2];
            // console.log(detailData)
        }
        // console.log('11111111111',detailData);
        return(
            <div className='main-content'>
                <div className='selects'>
                    <Radio.Group onChange={this.handleModeChange.bind(this)} value={mode} style={{ marginBottom: 8 }}>
                        <Radio.Button value="error">错题</Radio.Button>
                        <Radio.Button value="knowledgePoint">知识点</Radio.Button>
                        <Radio.Button value="answer">答案</Radio.Button>
                        <Radio.Button value="resultMark">结果标记</Radio.Button>
                    </Radio.Group>
                </div>
                <div className='select-content'>
                    {/* {mode === 'error'?
                                    <div style={{display:'block'}}><ErrorTopic data={detailData} category={this.props.category}/></div>
                                   :<div style={{display:'none'}}><ErrorTopic data={detailData} category={this.props.category}/></div>} */}
                    <div style={mode === 'error'?{display:'block'}:{display:'none'}}><ErrorTopic data={detailData} category={this.props.category}/></div>
                    <div style={mode === 'knowledgePoint'?{display:'block'}:{display:'none'}}><KnowledgePoint data={detailData} category={this.props.category}/></div>
                    <div style={mode === 'answer'?{display:'block'}:{display:'none'}}><Answer data={detailData} category={this.props.category}/></div>
                    <div style={mode === 'resultMark'?{display:'block'}:{display:'none'}}><ResultMark category={this.props.category} allNum={this.props.allNum} currentIndex={this.state.currentIndex} detailData={detailData} saveHandle={this.saveHandle.bind(this)} nextOneHandle={this.nextOneHandle.bind(this)}/></div>
                    {/* {mode === 'knowledgePoint'?
                                     <div style={{display:'block'}}><KnowledgePoint data={detailData} category={this.props.category}/></div>
                                     :<div style={{display:'none'}}><KnowledgePoint data={detailData} category={this.props.category}/></div>} */}
                    {/* {mode === 'answer'?
                                    <div style={{display:'block'}}><Answer data={detailData} category={this.props.category}/></div>
                                     :<div style={{display:'none'}}><Answer data={detailData} category={this.props.category}/></div>} */}
                    {/* {mode === 'resultMark'?<div style={{display:'block'}}><ResultMark category={this.props.category} allNum={this.props.allNum} currentIndex={this.state.currentIndex} detailData={detailData} saveHandle={this.saveHandle.bind(this)} nextOneHandle={this.nextOneHandle.bind(this)}/></div>
                                    :<div style={{display:'none'}}><ResultMark category={this.props.category} allNum={this.props.allNum} currentIndex={this.state.currentIndex} detailData={detailData} saveHandle={this.saveHandle.bind(this)} nextOneHandle={this.nextOneHandle.bind(this)}/></div>} */}
                </div>
                <div className='currentTopicPosition'>
                    {
                      category === '2' && mode != 'resultMark' ?<div>
                                        {detailData[0][0].subIdx===-1? `${detailData[0][0].book}/P${detailData[0][0].page}/${detailData[0][0].column}/${detailData[0][0].idx}`
                                                                        :`${detailData[0][0].book}/P${detailData[0][0].page}/${detailData[0][0].column}/${detailData[0][0].idx}(${detailData[0][0].subIdx})`}
                                         </div>:null
                    }
                </div>
            </div>
        )
    }
}
export default Result;