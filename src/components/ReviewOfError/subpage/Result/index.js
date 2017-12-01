import React from 'react';
import {Radio, Button} from 'antd';
import ResultMark  from '../ResultMark/index.js';
import './style.css';
// import { Button } from 'antd/lib/radio';
class Result extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          mode: 'error',
          currentIndex : 1
        };
      }
      handleModeChange(e){
        const mode = e.target.value;
        console.log(mode)
        this.setState({ mode });
      }
      nextOneHandle(){
          this.setState({
              currentIndex : this.state.currentIndex+1,
              mode: 'error'
          })
      }
    render(){
        const { mode, currentIndex } = this.state;
        console.log(currentIndex)
        const {category,data} = this.props;
        console.log(data)
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
        }
        console.log('11111111111',detailData)
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
                    {mode === 'resultMark'?<ResultMark detailData={detailData}/>:null}
                </div>
                <div style={{width:240,margin:'0 auto'}}>
                    {
                        (this.props.category === '2' && mode === 'resultMark') ? <Button type="primary" size='large' style={{width:240,height:35}} onClick={this.nextOneHandle.bind(this)}> 下一题</Button>
                                                     : null
                    }
                    {
                        this.props.category === '1' ? <Button type="primary" size='large' style={{width:240,height:35}}>保存</Button>
                        : null
                    }
                </div>
            </div>
        )
    }
}
export default Result;