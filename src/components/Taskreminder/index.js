import React, { Component } from 'react';
import {Row , Col, Badge, Menu, Dropdown, Icon} from 'antd';
import './style.css'
class Taskreminder extends Component {
  constructor(){
    super();
    this.state={
      date : ''
    }
  }
  componentWillMount(){
    const time = new Date();
    const date = time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate();
    this.setState({
      date : date
    })
  }
    render() {
      const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">{this.state.date}发展态势</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">{this.state.date}错题检验</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">{this.state.date}分数提升</a>
          </Menu.Item>
        </Menu>
      );     
      return (
        <div>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <div className='growth-content'>
                <Row>
                  <Col span={8}></Col>
                  <Col span={8}>
                    <div className='growth'>
                      <div className='growth-img'>
                        <img src={require('../../static/imgs/tree.jpg')}/>
                      </div>
                      <div className='growth-select'>
                        <Badge count={3} style={{ backgroundColor: '#87d068'}}>
                        <Dropdown overlay={menu}>
                          <a className="ant-dropdown-link">
                            我的成长 <Icon type="down" />
                          </a>
                        </Dropdown>   
                        </Badge>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}></Col>
                </Row>
              </div>
              <div className='mian-content'>
                <Row>
                  <Col span={8}>
                    <div className='part'>
                      <div className='part-img'>
                        <img src={require('../../static/imgs/jobentry.jpg')}/>
                      </div>
                      <div className='part-content'>
                      <Badge count={3} overflowCount={3}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                              作业录入 <Icon type="down" />
                            </a>
                          </Dropdown>
                      </Badge>   
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                  <div className='part'>
                    <div className='part-img'>
                       <img src={require('../../static/imgs/wrong.jpg')}/>  
                    </div>
                    <div className='part-content'>
                    <Badge count={4} overflowCount={3}>
                      <Dropdown overlay={menu}>
                          <a className="ant-dropdown-link">
                            错题检验 <Icon type="down" />
                          </a>
                        </Dropdown> 
                    </Badge>
                    </div>
                    </div>
                  </Col>
                  <Col span={8}>
                  <div className='part'>
                    <div className='part-img'>
                      <img src={require('../../static/imgs/score.jpg')}/>
                    </div>
                    <div className='part-content'>
                    <Badge count={2} overflowCount={3}>
                        <Dropdown overlay={menu}>
                              <a className="ant-dropdown-link">
                                分数提升 <Icon type="down" />
                              </a>
                        </Dropdown> 
                    </Badge>
                    </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={4}></Col>
          </Row>
        </div>
      );
    }
  }
  
  export default Taskreminder;