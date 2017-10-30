import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
// import ErrorSum from '../ErrorSum/index.js';
import ErrorSum from '../ErrorSum/index.js';
import InfoInput from '../InfoInput/index.js';
import UserMsgForm from '../UserMsg/index.js';
import './style.css';
const { Header, Sider, Content, Footer } = Layout;
class Navigation extends Component {
  state = {
    collapsed: true,
    key: '0',
    showUser : false,
    contentHeight :　0
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
  userHandle(){
    this.setState({
      key : 3,
      // showUser : false
    })
  }
  userMouseEnter(){
    this.setState({
      showUser : true
    })
  }
  userMouseLeave(){
    this.setState({
      showUser : false
    })
  }
  userClick(){
    this.setState({
      showUser : !this.state.showUser
    })
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Icon
            className="trigger trigger-icon"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <Menu theme="dark" mode="inline" onClick={this.clickHandle.bind(this)}>
            <Menu.Item key="1">
              <Icon type="book" />
              <span>信息录入</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="appstore" />
              <span>错题归类</span>
            </Menu.Item>
            {/* <Menu.Item key="3">
              <Icon type="user" />
              <span>个人信息</span>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ /*position: 'fixed',*/ width: '100%', padding: 0 }}>
            <div className='user-msg' onMouseEnter={this.userMouseEnter.bind(this)}>
              <div className='user-icon-content'>
                <Icon type="user" className='user-icon' />
              </div>
              <div className='user-name'>李婷</div>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight:this.state.contentHeight,/*marginTop:80 */ }}>
            <ul className='user-content' onMouseLeave={this.userMouseLeave.bind(this)} style={this.state.showUser ? {display:'block'} : {display:'none'}}>
              <li onClick={this.userHandle.bind(this)}>个人信息</li>
              <li>退出登录</li>
            </ul>
            {
              this.state.key === '0' ? <div>0000</div> :
                this.state.key === '1' ? <InfoInput /> :
                  this.state.key === '2' ? <ErrorSum /> : <UserMsgForm/>
            }
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
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
  }
}

export default Navigation;
