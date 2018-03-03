import React, { Component } from 'react';
// import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Radio } from 'antd';
import { Form, Input, Row, Col, Button, Radio,message,Select , InputNumber } from 'antd';
import {Patch} from '../../fetch/data.js'; 
import './style.css';
const FormItem = Form.Item;
const Option = Select.Option;
// const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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
                console.log('Received values of form: ', values);
                var params = {
                    school:values.school,
                    grade:values.grade,
                    classId:values.class,
                    realName: values.name,
                    gender: values.gender,
                    telephone: values.phone
                }
                // console.log(params)
                var result = Patch('http://118.31.16.70/api/v3/students/me/profile/',params)
                result.then((response)=>{
                    if(response.status ===200){
                     this.props.modifyUserMsg(values.name,values.phone,values.gender,values.school,values.class,values.grade);
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
    componentDidMount(){
        const {learnId} = this.props.userMsg;
        const {name,phone,gender,school, grade,classId} = this.props;
            this.props.form.setFieldsValue({
                studyNum: this.props.userMsg.learnId,
                school:school,
                grade :grade,
                class: classId,
                phone: phone,
                name:name,
                gender : gender
            });
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
            <div className='userMsg'>
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
                                        <Input type='text' disabled/>
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
                                    <Input/>
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
                                    <Select>
                                        <Option value='七'>七</Option>
                                        <Option value='八'>八</Option>
                                        <Option value='九'>九</Option>
                                    </Select>
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
                                    rules: [{ required: true,type:'number', message: '请输入您的班级(班级为数字)!', whitespace: true }],
                                })(
                                    <InputNumber min={1} style={{width:'100%'}}/>
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
                                {getFieldDecorator('gender',{
                                     rules: [{ required: true, message: '请选择性别', whitespace: true }],
                                })(
                                    <RadioGroup>
                                        <Radio value="male">男</Radio>
                                        <Radio value="female">女</Radio>
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