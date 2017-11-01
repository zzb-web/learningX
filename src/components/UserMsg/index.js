import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

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
            <div>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="学习号"
                                hasFeedback
                            >
                                {getFieldDecorator('studyNum', {
                                    // rules: [
                                    //  {
                                    //     required: true, message: 'Please input your E-mail!',
                                    // }],
                                })(
                                    <Input type='text' disabled placeholder='唯一固定值，用户不可更改。服务器发过来。' />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                        学校
                                    </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('school', {
                                    rules: [{ required: true, message: '请输入您的学校!', whitespace: true }],
                                })(
                                    <Input disabled/>
                                    )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                        年级
                                    </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('grade', {
                                    rules: [{ required: true, message: '请输入您的年级!', whitespace: true }],
                                })(
                                    <Input disabled/>
                                    )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                        班级
                                    </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('class', {
                                    rules: [{ required: true, message: '请输入您的班级!', whitespace: true }],
                                })(
                                    <Input disabled/>
                                    )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                        姓名
                                    </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入您的姓名!', whitespace: true }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="性别"
                            >
                                {getFieldDecorator('radio-group')(
                                    <RadioGroup>
                                        <Radio value="man">男</Radio>
                                        <Radio value="woman">女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                        手机
                                    </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请输入您的手机号!', whitespace: true }],
                                })(
                                    <Input/>
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

const UserMsgForm = Form.create()(RegistrationForm);

export default UserMsgForm;