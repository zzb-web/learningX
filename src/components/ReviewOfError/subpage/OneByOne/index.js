import React from 'react';
import {Radio} from 'antd';
import ResultMark  from '../ResultMark/index.js';
import './style.css';
class OneByOne extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          mode: 'resultMark',
        };
      }
      handleModeChange(e){
        const mode = e.target.value;
        console.log(mode)
        this.setState({ mode });
      }
    render(){
        const { mode } = this.state;
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
                    {mode === 'error'?<div>错题</div>:null}
                    {mode === 'knowledgePoint'?<div>知识点</div>:null}
                    {mode === 'answer'?<div>答案</div>:null}
                    {mode === 'resultMark'?<ResultMark/>:null}
                </div>
            </div>
        )
    }
}
export default OneByOne;