import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Get, Post} from '../../fetch/data.js';
import { withRouter } from 'react-router';
import ErrorSum from '../ErrorSum/index.js';
import InfoInput from '../InfoInput/index.js';
import UserMsgForm from '../UserMsg/index.js';
import PassWordForm from '../PassWord/index.js';
import ReviewOfError from '../ReviewOfError/index.js';
import QuestionTest from '../QuestionTest/index.js';
import Homepage from '../Homepage/index.js';
import ErrorDetection from '../ErrorDetection/index.js';
import TestDetection from '../TestDetection/index.js';
import StudentMsg from '../StudentMsg/index.js';
import './style.css';
const { Header, Sider, Content} = Layout;
class Navigation extends Component {
  state = {
    collapsed: true,
    key: '0',
    showUser : 'none',
    contentHeight :　0,
    userMsg : {},
    userName : '',
    phone:'',
    gender:'',
    hideMenu : false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  clickHandle(e) {
    this.setState({
      key: e.key
    })
  }
  usermsgHandle(){
    this.setState({
      key : '3'
    })
  }
  passwordHandle(){
    this.setState({
      key : '4'
    })
  }
  userMouseEnter(e){
    this.setState({
      showUser : 'block'
    })
  } 
  userMouseLeave(e){
    this.setState({
      showUser : 'none'
    })
  }
  logoutHandle(){
    var result =Post('http://118.31.16.70/api/v3/students/me/logout/');
    result.then((response)=>{
      if(response.status === 200){
        // sessionStorage.removeItem('userId');
        this.props.history.push('/')
      }
    })
  }
  menuHandle(){
    sessionStorage.hideMenu = true;
    this.setState({
      hideMenu : true
    })
  }
  componentWillMount(){
    // console.log(sessionStorage.userId);
     if(sessionStorage.userId === undefined){
        this.props.history.push('/');
     }
     const hideMenu = sessionStorage.hideMenu;
     var flag;
     if(hideMenu === undefined || hideMenu === "false"){
        flag = false;
     }else{
        flag = true;
     }
     this.setState({
       hideMenu : flag
     })
  }
  render() {
    const {userMsg,userName,phone,gender,school,classId,grade,hideMenu} = this.state;
    console.log('xxxxxxx',hideMenu)
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={130}
        >
          <div className='head-font'>
            达摩纠错本
            <span className='pushin' 
                  onClick={this.menuHandle.bind(this)} 
                  style={!hideMenu?{display:'inline-block'}:{display:'none'}}>
              <Icon type="pushpin"/>
            </span>
          </div>
          <Icon
            className="trigger trigger-icon"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <Menu theme="dark" mode="inline" onClick={this.clickHandle.bind(this)}>
            <Menu.Item key="0">
                <Icon type="rocket" />
                <span>首页</span>
            </Menu.Item>
            <Menu.Item key="9">
                <Icon type="user-add" />
                <span>学生信息录入</span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="book" />
              <span>错题标记</span>
            </Menu.Item>
            
            <Menu.Item key="2"  style={hideMenu?{display:'block'}:{display:'none'}}>
              <Icon type="appstore" />
              <span>错题归类</span>
            </Menu.Item>
            <Menu.Item key="7" style={hideMenu?{display:'block'}:{display:'none'}}>
              <Icon type="bar-chart" />
              <span>错题测试</span>
            </Menu.Item>
            <Menu.Item key="8" style={hideMenu?{display:'block'}:{display:'none'}}>
              <Icon type="link" />
              <span>检验题测试</span>
            </Menu.Item>
            <Menu.Item key="5" style={hideMenu?{display:'block'}:{display:'none'}}>
              <Icon type="scan" />
              <span>错题复习</span>
            </Menu.Item>
            <Menu.Item key="6" style={hideMenu?{display:'block'}:{display:'none'}}>
              <Icon type="database" />
              <span>考题检验</span>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ /*position: 'fixed',*/ width: '100%', padding: 0 }}>
           <div className='user-main' onMouseLeave={this.userMouseLeave.bind(this)}>
            <div className='user-msg' onMouseEnter={this.userMouseEnter.bind(this)}>
              <div className='user-icon-content'>
                <Icon type="user" className='user-icon'/>
              </div>
              <div className='user-name'>{userName ||userMsg.learnId}</div>
            </div>
            <ul className='user-content' onMouseLeave={this.userMouseLeave.bind(this)} style={{display:this.state.showUser}}>
              <li onClick={this.usermsgHandle.bind(this)}>个人信息</li>
              <li onClick={this.passwordHandle.bind(this)}>修改密码</li>
              <li onClick={this.logoutHandle.bind(this)}>退出登录</li>
            </ul>
          </div>
          </Header>
          <Content style={{ margin: '16px 16px', padding: 24, background: '#fff', minHeight:this.state.contentHeight,/*marginTop:80 */ }}>
            {
                 this.state.key === '0' ? <Homepage/> : null
            }
            {
                 this.state.key === '1' ? <InfoInput /> : null
            }
            {
                this.state.key === '2' ? <ErrorSum /> : null
            }
            {
                 this.state.key === '3' ? <UserMsgForm userMsg={userMsg}
                                                       school={school}
                                                       classId={classId}
                                                       grade={grade}
                                                       name={userName}
                                                       phone={phone}
                                                       gender={gender}
                                                       modifyUserMsg={this.modifyUserMsg.bind(this)}/> : null
            }
            {
                 this.state.key === '4' ? <PassWordForm/> : null
            }
            {
                this.state.key === '5' ? <ReviewOfError/> : null
            }
            {
                this.state.key === '6' ? <QuestionTest/> : null
            }
            {
                this.state.key === '7' ? <ErrorDetection/> : null
            }
            {
                this.state.key === '8' ? <TestDetection/> : null
            }
            {
              this.state.key === '9' ? <StudentMsg/> : null
            }
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
  modifyUserMsg(name,phone,gender,school,classId,grade){
    this.setState({
      userName : name,
      phone:phone,
      gender:gender,
      school : school,
      classId : classId,
      grade: grade
    })
  }
  componentDidMount(){
    let that = this;
    let allHeight = document.documentElement.clientHeight;
    this.setState({
      contentHeight :　allHeight-112
    })
    window.onresize = function(){
      let allHeight = document.documentElement.clientHeight;
      that.setState({
        contentHeight :　allHeight-112
      })
    }
    var msg =Get('http://118.31.16.70/api/v3/students/me/profile/');
    msg.then((response)=>{
      if(response.status ===200){
        this.setState({
            userMsg : response.data,
            userName : response.data.realName,
            phone : response.data.telephone,
            gender:response.data.gender,
            school :response.data.school,
            classId :response.data.classId,
            grade : response.data.grade
        })
      }else if(response.status ===401){
        this.props.history.push('/');
    }
    })
  }
}
export default withRouter(Navigation);
