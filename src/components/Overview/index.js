import React, { Component } from 'react';
import {Row , Col,Steps, Button, message} from 'antd';
import Star from '../Star/index.js';
import './style.css'

const Step = Steps.Step;
class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
      }
      next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }
    render(){
        const { current } = this.state;
        const steps = [{
            title: 'First',
            content: <div className='step1'>
                        <div className='step1-title'>解一元一次方程</div>
                        <div className='step1-content'>
                            <div className='step1-score'><span>8</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>分</span></div>
                            <div>{
                            this.state.current < 2
                            &&
                            <Button type="primary" size='large' onClick={() => this.next()}>开始</Button>
                        }</div>
                        </div>
                        <div className='step1-line'></div>
                        <div className='step1-star'>
                            <Star title='重要程度' star={5}/>
                            <Star title='掌握程度' star={2}/>
                            <div className='star-score'>
                                <span>拿分措施:</span>
                                <div className='step-getscore'>
                                  <Steps>
                                    <Step title="订正"/>
                                    <Step title="检验"/>
                                    <Step title="查漏洞"/>
                                  </Steps>
                                </div>
                            </div>

                        </div>
                     </div>,
            desc : <div><div>指导详情</div><div>20分钟</div></div>
          }, {
            title: 'Second',
            content: 'Second-content',
            desc : <div><div>指导详情</div><div>20分钟</div></div>
          }, {
            title: 'Last',
            content: 'Last-content',
            desc : <div><div>指导详情</div><div>20分钟</div></div>
          }];
        return(
            <div>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                    <div className='step1-all'>
                        <Steps current={current}>
                            {steps.map(item => <Step key={item.title} title={item.title} description={item.desc}/>)}
                        </Steps>
                        <div className="steps-content" ref='stepsContent'>{steps[this.state.current].content}</div>
                        <div className="steps-action">

                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                        }
                        {
                            this.state.current > 0
                            &&
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                            </Button>
                        }
                        </div>
                    </div>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
        )
    }
    componentDidMount(){
        // setTimeout()
        let stepsContent = this.refs.stepsContent;
        setTimeout(function(){
            stepsContent.style.display = 'block';
        },5000)
    }
}
export default Overview;
