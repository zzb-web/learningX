import React from 'react';
import {Radio, Button} from 'antd';
import ResultMark from '../ResultMark/index.js';
import './style.css';
class Result extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          mode: 'resultMark',
        };
      }
      handleModeChange(e){
        const mode = e.target.value;
        this.setState({ mode });
      }
      saveHandle(value){
          this.props.saveHandle(value);
      }
    render(){
        const { mode } = this.state;
        const {data,taskTime} = this.props;
        var detailData = data;
        console.log(detailData)
        return(
            <div className='main-content'>
                <div className='selects'>
                    <Radio.Group onChange={this.handleModeChange.bind(this)} value={mode} style={{ marginBottom: 8 }}>
                        {/* <Radio.Button value="content">作业内容</Radio.Button> */}
                        <Radio.Button value="resultMark">结果标记</Radio.Button>
                    </Radio.Group>
                </div>
                <div className='select-content'>
                    {/* <div style={mode === 'answer'?{display:'block'}:{display:'none'}}><div>作业内容</div></div> */}
                    <div style={mode === 'resultMark'?{display:'block'}:{display:'none'}}><ResultMark taskTime={taskTime} detailData={detailData} saveHandle={this.saveHandle.bind(this)}/></div>
                </div>
            </div>
        )
    }
}
export default Result;