import React, { Component } from 'react';
// import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Radio } from 'antd';
import { Form, Input,Row, Col, Button,message} from 'antd';
import {Put} from '../../fetch/data.js';
const FormItem = Form.Item;
// const Option = Select.Option;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var params = {
                    password : values.password
                }
                var result = Put('/api/v3/students/me/password/',params)
                result.then((response)=>{
                    if(response.status ===200){
                        message.success('操作成功',1.5);
                    }else{
                        message.error('操作失败',1.5);
                    }
                })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <div style={{marginTop:80}}>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Form onSubmit={this.handleSubmit}>    
                            <FormItem
                                {...formItemLayout}
                                label="新密码"
                                hasFeedback
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: '请输入新密码!',
                                    }, {
                                        validator: this.checkConfirm,
                                    }],
                                })(
                                    <Input type="password" />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="确认新密码"
                                hasFeedback
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: '请再次输入密码!',
                                    }, {
                                        validator: this.checkPassword,
                                    }],
                                })(
                                    <Input type="password" onBlur={this.handleConfirmBlur} />
                                    )}
                            </FormItem>   
                            <FormItem {...tailFormItemLayout}>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    size='large' 
                                    style={{width:'100%'}}>保存</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        );
    }
}

const PassWordForm = Form.create()(RegistrationForm);

export default PassWordForm;