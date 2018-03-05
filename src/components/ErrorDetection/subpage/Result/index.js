import React from 'react';
import {Radio, Button} from 'antd';
import ResultMark from '../ResultMark/index.js';
import TestTopic from '../../../QuestionTest/subpage/TestTopic/index.js'
import KnowledgePoint from '../../../QuestionTest/subpage/KnowledgePoint/index.js'
import Answer from '../../../QuestionTest/subpage/Answer/index.js'
import './style.css';
class Result extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          mode: 'test',
          timestamp : 0
        };
      }
      handleModeChange(e){
        const mode = e.target.value;
        this.setState({ mode });
      }
      saveHandle(value){
          this.props.saveHandle(value);
      }
      getTimeStamp(time){
        this.setState({
            timestamp : time
        })
      }
    render(){
        const { mode, timestamp} = this.state;
        const {data} = this.props;
        var detailData = data;
        return(
            <div className='main-content'>
                <div className='selects'>
                    <Radio.Group onChange={this.handleModeChange.bind(this)} value={mode} style={{ marginBottom: 8 }}>
                        <Radio.Button value="test">错题</Radio.Button>
                        <Radio.Button value="knowledgePoint">知识点</Radio.Button>
                        <Radio.Button value="answer">答案</Radio.Button>
                        <Radio.Button value="resultMark">结果标记</Radio.Button>
                    </Radio.Group>
                </div>
                <div className='select-content'>
                    <div style={mode === 'test'?{display:'block'}:{display:'none'}}><TestTopic data={detailData} category='1' current='00' getTimeStamp={this.getTimeStamp.bind(this)}/></div>
                    <div style={mode === 'knowledgePoint'?{display:'block'}:{display:'none'}}><KnowledgePoint data={detailData} category='1'/></div>
                    <div style={mode === 'answer'?{display:'block'}:{display:'none'}}><Answer data={detailData} category='1'/></div>
                    <div style={mode === 'resultMark'?{display:'block'}:{display:'none'}}><ResultMark detailData={detailData} saveHandle={this.saveHandle.bind(this)} markTime={timestamp}/></div>
                </div>
            </div>
        )
    }
}
export default Result;