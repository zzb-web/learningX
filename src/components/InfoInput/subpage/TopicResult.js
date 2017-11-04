import React, { Component } from 'react';
import {Table, Switch, Button} from 'antd';
import './style.css';
class TopicResult extends Component{
   constructor(){
     super();
     this.state={
       data : [
        {
          key: '1',
          position: 'P55/基础夯实/5 (1)',
          status: false,
          result : false
        },
        {
          key: '2',
          position: 'P55/基础夯实/5 (2)',
          status: false,
          result : false
        },
        {
          key: '3',
          position: 'P55/基础夯实/6',
          status: false,
          result : false
        },
        {
          key: '4',
          position: 'P55/基础夯实/7',
          status: false,
          result : false
        },
        {
          key: '5',
          position: 'P55/基础夯实/8',
          status: false,
          result : false
        },
        {
          key: '6',
          position: 'P55/基础夯实/9',
          status: false,
          result : false
        },
        {
          key: '7',
          position: 'P55/基础夯实/10',
          status: false,
          result : false
        }
      ]
     }
   }
    saveBtnHandle(){
        this.props.handleDetail();
     }
    cancelBtnHandle(){
      this.props.handleCancel();
    }
    change(e){
      let data = this.state.data;
      if(e){
        data.forEach((item,index)=>{
          data[index].status = true;
          data[index].result = true;
        })
      }else{
        data.forEach((item,index)=>{
          data[index].status = false;
        })
      }
      this.setState({
        data : data
      })
    }
    tdClick(index){
      let data = this.state.data;
      if(data[index].status){
        data[index].status  = false
      }else{
        data[index].status  = true
      }
      this.setState({
        data : data
      })
    }
    tdClick2(index){
      let data = this.state.data;
      if(data[index].result){
        data[index].result  = false
      }else{
        data[index].result  = true
      }
      this.setState({
        data : data
      })
    }
    render(){
      const columns = [{
        title: '题目位置',
        className: 'column-position',
        dataIndex: 'position',
        width:280
      }, {
        title: <Switch checkedChildren="全布置了" unCheckedChildren="全没布置" onChange={this.change.bind(this)}/>,
        className: 'column-status',
        dataIndex: 'status',
        width:200,
        render : (text, record, index)=><div onClick={()=>this.tdClick(index)}>{text}</div>
      },
      {
        title: '做题结果',
        className: 'column-result',
        dataIndex: 'result',
        render : (text, record, index)=>{console.log(text, record)
                                          return(
                                          <div onClick={()=>this.tdClick2(index)}>{text}</div>
                                          )
                                        }
      },
    ];
      let data1=[];
      this.state.data.map((data, i)=>{
        let a ={};
        a.key = data.key;
        a.position = data.position;
        if(!data.status){
          a.status = <Switch checkedChildren="布置了" unCheckedChildren="没布置" checked={false}/>
          a.result = null
        } else{
          a.status = <Switch checkedChildren="布置了" unCheckedChildren="没布置" checked/>
          if(!data.result){
            a.result = <Switch checkedChildren="做对了" unCheckedChildren="做错了" checked={false}/>
          } else{
            a.result = <Switch checkedChildren="做对了" unCheckedChildren="做错了" checked/>
          }
        }
        data1.push(a)
      })
     /* const data = [{
        key: '1',
        position: 'P55/基础夯实/5 (1)',
        status: <Switch checkedChildren="布置了" unCheckedChildren="没布置" defaultChecked/>,
        result : <Switch checkedChildren="做对了" unCheckedChildren="做错了" />
      }, {
        key: '2',
        position: 'P55/基础夯实/5 (2)',
        status: <Switch checkedChildren="布置了" unCheckedChildren="没布置" />,
        result : <Switch checkedChildren="做对了" unCheckedChildren="做错了" />
      }, {
        key: '3',
        position: 'P55/基础夯实/6',
        status: <Switch checkedChildren="布置了" unCheckedChildren="没布置" />,
        result : <Switch checkedChildren="做对了" unCheckedChildren="做错了" />
      }
      ];*/
        return(
                <div className='topic-result'>
                    <h2 className='select-info-h2'>选择做题结果</h2>
                    <Table
                        columns={columns}
                        dataSource={data1}
                        bordered
                        pagination={false}
                        scroll={{ y: 255 }}
                        style={{marginTop:20}}
                        rowClassName={(record, index)=>{
                          if(record.result){
                            if(record.result.props.checked){
                              return ''
                            }else{
                              return 'wrong-row'
                            }
                          }else{
                            return ''
                          }
                        }}
                    />
                    <div className='btn-content'>
                        <Button type="primary"
                                size='large'
                                style={{width:150,height:40,marginRight:'20px'}}
                                onClick={this.saveBtnHandle.bind(this)}>保存</Button>
                        <Button size='large'
                                style={{width:150,height:40,marginLeft:'20px'}}
                                onClick={this.cancelBtnHandle.bind(this)}
                                >取消</Button>
                    </div>
                </div>
        )
    }
}

export default TopicResult;
