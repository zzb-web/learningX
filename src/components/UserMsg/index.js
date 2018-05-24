import React, { Component } from 'react';
// import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Radio } from 'antd';
import { Form, Input, Row, Col, Button, Radio,message,Select , InputNumber } from 'antd';
import {Patch ,Get} from '../../fetch/data.js'; 
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
        userMsg : {},
        schools : [],
        name_schoolID : {},
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {name_schoolID} = this.state;
                console.log(name_schoolID , values.schoolID)
                var params = {
                    schoolID:name_schoolID[values.schoolID],
                    grade:values.grade,
                    classId:values.class,
                    realName: values.name,
                    gender: values.gender,
                    telephone: values.phone
                }
                // console.log(params)
                var result = Patch('/api/v3/students/me/profile/',params)
                result.then((response)=>{
                    if(response.status ===200){
                     this.props.modifyUserMsg(values.name);
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
    componentWillMount(){
        Get('/api/v3/students/me/schools/').then(resp=>{
            if(resp.status === 200){
            const {name_schoolID} = this.state;
            resp.data.map((item,index)=>{
                name_schoolID[item.name] = item.schoolID;
            })
           this.setState({
               schools : resp.data,
               name_schoolID : name_schoolID
           })
           var msg =Get('/api/v3/students/me/profile/');
           msg.then((response)=>{
             if(response.status ===200){
               this.setState({
                   userMsg : response.data,
               },()=>{
                   const {userMsg,name_schoolID} = this.state;
                   console.log('??')
                   let schoolName;
                   for(var key in name_schoolID){
                       if(name_schoolID[key] === userMsg.schoolID){
                           schoolName = key;
                           break;
                       }
                   }
                   this.props.form.setFieldsValue({
                       studyNum: userMsg.learnId,
                       schoolID:schoolName,
                       grade :userMsg.grade,
                       class: userMsg.classId,
                       phone: userMsg.telephone,
                       name:userMsg.realName,
                       gender : userMsg.gender
                   });
               })
             }else if(response.status ===401){
               this.props.history.push('/');
           }
           })
            }
        }).catch(err=>{
      
        }) 
    }
    componentWillReceiveProps(nextProps){

    }

    
    render() {
        const { getFieldDecorator } = this.props.form;
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
        const {schools} = this.state;
        let children = [];
        schools.map((item,index)=>{
            children.push(
                <Option key={index} value={item.name}>{item.name}</Option>
            )
        })
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
                                {getFieldDecorator('schoolID', {
                                    rules: [{ required: true, message: '请输入您的学校!', whitespace: true }],
                                })(
                                    // <Input/>
                                    <Select
                                            combobox
                                            placeholder="填写学校的规范全称"
                                            tabIndex={0}
                                        >
                                            {children}
                                    </Select>
                                    
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
                                    <InputNumber min={0} style={{width:'100%'}}/>
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
                                        <Radio value="男">男</Radio>
                                        <Radio value="女">女</Radio>
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