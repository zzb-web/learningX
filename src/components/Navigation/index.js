import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Get, Post} from '../../fetch/data.js';
import { withRouter } from 'react-router';
import UserMsgForm from '../UserMsg/index.js';
import ErrorCorrectionBuild from '../ErrorCorrectionBuild/index.js'
import {HomepageLoadable , 
        ErrorSumLoadable ,
        InfoInputLoadable ,
        PassWordFormLoadable,
        ReviewOfErrorLoadable,
        QuestionTestLoadable,
        ErrorDetectionLoadable,
        TestDetectionLoadable,
        StudentMsgLoadable,
        TestErrorMarkerLoadable,
        TestErrorDetectionLoadable,
        // ErrorCorrectionBuildLoadable
      } from '../Loadable/homepageaComponent.js';
import axios from 'axios';
import './style.css';
const { Header, Sider, Content,Footer} = Layout;
const {SubMenu} = Menu;
class Navigation extends Component {
  state = {
    collapsed: false,
    key: '12',
    subKey : ['sub1'],
    showUser : 'none',
    contentHeight :　0,
    userMsg : {},
    userName : '',
    phone:'',
    gender:'',
    hideMenu : false,
    schools : [],
    schoolID_name :{},
    name_schoolID : {}
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
    var result =Post('/api/v3/students/me/logout/');
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
    axios.defaults.withCredentials = true;
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
  setKey(value){
    const {subKey} = this.state;
    if(subKey.indexOf('sub2') === -1){
      subKey.push('sub2')
    }
    this.setState({
      key : value,
      subKey
    })
  }
  onOpenChange(e){
    this.setState({
      subKey : e
    })
  }
  render() {
    const {userMsg,userName,subKey,phone,gender,schoolID,classId,grade,hideMenu,schoolID_name,name_schoolID,schools,key} = this.state;
    console.log('xxxxxxx',hideMenu)
    return (
      <Layout>
        <Sider
          trigger={null}  
          collapsible
          collapsed={this.state.collapsed}
          width={135}
        >
          <div className='head-font'>
            错题标记
            <span className='pushin' 
                  onClick={this.menuHandle.bind(this)} 
                  style={!hideMenu?{display:'none'}:{display:'none'}
                  }>
              <Icon type="pushpin"/>
            </span>
          </div>
          <Icon
            className="trigger trigger-icon"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <Menu theme="dark"
                mode="inline" 
                onClick={this.clickHandle.bind(this)} 
                selectedKeys={[key]}
                openKeys={subKey}
                onOpenChange={this.onOpenChange.bind(this)}
                // defaultOpenKeys={['sub1']}
                >
            <SubMenu key="sub1" title={<span><Icon type="shopping-cart"/><span>选择学习包</span></span>}>
              <Menu.Item key="12">
                 <span>选择学习包</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="pushpin"/><span>标记错题</span></span>}>
              <Menu.Item key="0">
                  <span>纠错本</span>
              </Menu.Item>
              <Menu.Item key="1">
                <span>平时作业</span>
              </Menu.Item>
              <Menu.Item key="9">
                <span>试卷</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="file-add"/><span>生成纠错本</span></span>}>
              <Menu.Item key="7">
                 <span>EPU1</span>
              </Menu.Item>
              <Menu.Item key="11">
                 <span>EPU2</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="user"/><span>用户信息</span></span>}>
              <Menu.Item key="3">
                 <span>个人信息</span>
              </Menu.Item>
              <Menu.Item key="4">
                 <span>修改密码</span>
              </Menu.Item>
            </SubMenu>
            {hideMenu ?
            <SubMenu key="sub5" title={<span><Icon type="lock"/><span>隐藏</span></span>}>
                <Menu.Item key="2"  style={hideMenu?{display:'block'}:{display:'none'}}>
                  <span>错题归类</span>
                </Menu.Item>
                <Menu.Item key="10" style={hideMenu?{display:'block'}:{display:'none'}}>
                  <span>试卷错题测试</span>
                </Menu.Item>
                <Menu.Item key="8" style={hideMenu?{display:'block'}:{display:'none'}}>
                  <span>检验题测试</span>
                </Menu.Item>
                <Menu.Item key="5" style={hideMenu?{display:'block'}:{display:'none'}}>
                  <span>错题复习</span>
                </Menu.Item>
                <Menu.Item key="6" style={hideMenu?{display:'block'}:{display:'none'}}>
                  <span>考题检验</span>
                </Menu.Item>
            </SubMenu> : null
            }
           
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ /*position: 'fixed',*/ width: '100%', padding: 0 }}>
           <div className='user-main'>
            <div className='user-msg'>
              <div className='user-icon-content'>
                <Icon type="user" className='user-icon'/>
              </div>
              <div className='user-name'>{userName ||userMsg.learnId}</div>
              <div className='logout' title='登出' onClick={this.logoutHandle.bind(this)}><Icon type="logout" /></div>
            </div>
            
            {/* <ul className='user-content' onMouseLeave={this.userMouseLeave.bind(this)} style={{display:this.state.showUser}}>
              <li onClick={this.usermsgHandle.bind(this)}>个人信息</li>
              <li onClick={this.passwordHandle.bind(this)}>修改密码</li>
              <li onClick={this.logoutHandle.bind(this)}>退出登录</li>
            </ul> */}
          </div>
          </Header>
          <Content style={{ margin: '16px 16px 0px 16px', padding: '24px', background: '#fff', minHeight:this.state.contentHeight,/*marginTop:80 */ }}>
            {
                 this.state.key === '0' ? <HomepageLoadable/> : null
            }
            {
                 this.state.key === '1' ? <InfoInputLoadable /> : null
            }
            {
                this.state.key === '2' ? <ErrorSumLoadable /> : null
            }
            {
                 this.state.key === '3' ? <UserMsgForm modifyUserMsg={this.modifyUserMsg.bind(this)}/> : null
            }
            {
                 this.state.key === '4' ? <PassWordFormLoadable/> : null
            }
            {
                this.state.key === '5' ? <ReviewOfErrorLoadable/> : null
            }
            {
                this.state.key === '6' ? <QuestionTestLoadable/> : null
            }
            {
                this.state.key === '7' ? <ErrorDetectionLoadable/> : null
            }
            {
                this.state.key === '8' ? <TestDetectionLoadable/> : null
            }
            {
              this.state.key === '9' ? <TestErrorMarkerLoadable/> : null
            }
            {
              this.state.key === '10' ? <TestErrorDetectionLoadable/> : null
            }
            {
              // this.state.key === '11' ? <ErrorCorrectionBuildLoadable setKey={this.setKey.bind(this)}/> : null
              this.state.key === '11' ? < ErrorCorrectionBuild setKey={this.setKey.bind(this)}/> : null
            }
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            皖ICP备18007473号
          </Footer>
        </Layout>
      </Layout>
    );
  }
  modifyUserMsg(name){
    this.setState({
      userName : name,
    })
  }
  componentDidMount(){
    
    let that = this;
    let allHeight = document.documentElement.clientHeight;
    this.setState({
      contentHeight :　allHeight-114
    })
    window.onresize = function(){
      let allHeight = document.documentElement.clientHeight;
      that.setState({
        contentHeight :　allHeight-114
      })
    }
    var msg =Get('/api/v3/students/me/profile/');
    msg.then((response)=>{
      if(response.status ===200){
        this.setState({
            userName : response.data.realName,
        })
      }else if(response.status ===401){
        this.props.history.push('/');
    }
    })
  }
}
export default withRouter(Navigation);
