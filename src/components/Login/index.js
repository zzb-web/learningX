import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import './style.css';
import {Post} from '../../fetch/data.js'
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    var that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.learnId = Number(values.learnId);
        let status = Post('http://118.31.16.70/api/v3/students/login/',values);
        status.then(function(response){
            if(response === undefined){
                alert('用户名或者密码错误！')
            }else if(response.status === 200){
                sessionStorage.userId = values.learnId;	    
                that.props.history.push('/index');
            }else{
                alert('用户名或者密码错误！');
            }
          })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <div>
        <Row>
            <Col span={8}></Col>
            <Col span={8}>
                <div className='login-box'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                        {getFieldDecorator('learnId', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <Button type="primary" htmlType="submit" size='large' 
                                    style={{width:'100%'}}>
                            登录
                        </Button>
                        </FormItem>
                    </Form>
                </div>
            </Col>
            <Col span={8}></Col>
      </Row>
    </div>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm;
