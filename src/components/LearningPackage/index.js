import React, { Component } from 'react';
import {Row , Col, Icon, Button} from 'antd';
import { withRouter } from 'react-router';
import {Get,Post} from '../../fetch/data.js';
import './style.css'
class LearningPackage extends Component{
   constructor(props){
       super();
       this.state={
           
       }
   }
   componentWillReceiveProps(nextProps){
   }
    render(){
        const learns = [
            {
                title : '入门型',
                title_2 : '错题人工定义',
                text_1 : '第一代错题学习处理器EPU1',
                text_2 : '支持校本作业和课本'
            },
            {
                title : '进阶型',
                title_2 : '错题智能滚动',
                text_1 : '第二代错题学习处理器EPU2',
                text_2 : '支持试卷、校本作业和课本'
            },
            {
                title : '高阶型',
                title_2 : '错题变式检验',
                text_1 : '第三代错题学习处理器EPU3',
                text_2 : '支持变式检验、试卷、校本作业和课本'
            }
        ]
        return(
           <Row>
               <Col span={1}></Col>
               <Col span={22}>
                    <div className='learning-title'>多种规格学习包</div>
                    <div className='learning-content'>
                    <Row>
                        {/* <Col span={8}>
                            <div className='content-tab'>
                                <div className='tab'>
                                    <TabContent/>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='content-tab'>
                                 <div className='tab'></div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='content-tab'>
                                <div className='tab'></div>
                            </div>
                        </Col> */}
                        {
                            learns.map((item,index)=>
                                    <Col span={8}>
                                        <div className='content-tab'>
                                            <div className='tab'>
                                                <TabContent data={item}/>
                                            </div>
                                        </div>
                                    </Col>
                             )
                        }
                    </Row>
                    </div>
               </Col>
               <Col span={1}></Col>
           </Row>
        )
    }
}

class TabContent extends Component{
    render(){
        const {data} = this.props;
        return(
            <div className='tabs'>
                <div className='tab-title'>{data.title}</div>
                <div className='tab-title-2'>{data.title_2}</div>
                <div className='tab-box'>
                    <div className='tab-text'>
                        <Icon type="check" style={{color:'#108ee9',fontSize:18,paddingRight:10}}/>
                        <span>{data.text_1}</span>
                    </div>
                    <div className='tab-text'>
                        <Icon type="check" style={{color:'#108ee9',fontSize:18,paddingRight:10}}/>
                        <span>{data.text_2}</span>
                    </div>
                </div>
                <div className='btn-box'>
                    <Button style={{color:'#108ee9',border:'none',float:'right',marginRight:20,marginTop:10,fontSize:13}}>立即选择</Button>
                </div>
            </div>
        )
    }
}


export default withRouter(LearningPackage);
