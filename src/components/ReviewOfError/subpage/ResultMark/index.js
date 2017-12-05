import React, { Component } from 'react';
import {Table, Switch, Button,Radio,message} from 'antd';
import {Post} from '../../../../fetch/data.js';
import './style.css';
const RadioGroup = Radio.Group;

class ResultMark extends Component{
   constructor(props){
     super();
     this.state={
       data : [],
     }
   }
    saveBtnHandle(){
        let msg = [];
        this.state.data.map((item,index)=>{
          if(item.status){
            let position = item.position.split('/');
            if(position.length === 3){
              msg.push({
                  isCorrect : item.isCorrect,
                  problemId: item.problemId,
                  subIdx : -1
                })
            }else{
              var subIdx = Number(position[3].split('')[1]);
              msg.push({
                isCorrect : item.isCorrect,
                problemId: item.problemId,
                subIdx : subIdx
              })
            }
          }
        })
        const url = 'http://118.31.16.70/api/v3/students/me/problems/';
        var params = {
          time : this.props.date,
          problems : msg
        }
        // var response = Post(url,params);
        // response.then((status)=>{
        //   if(status === 200){
        //     this.props.handleDetail();
        //   }
        // })
        
     }
     resultClick(index,e){
         console.log(index,e.target.value)
      let data = this.state.data;
      data[index].isCorrect = e.target.value;
      if(e.target.value){
        data[index].understood = -1
      }else{
        data[index].smooth = -1
      }
      data[index].status =  e.target.value;
      this.setState({
        data : data,
        checked:e.target.value
      })
    }
    tdClick2(index){
      let data = this.state.data;
      if(data[index].isCorrect){
        data[index].isCorrect  = false
      }else{
        data[index].isCorrect  = true
      }
      this.setState({
        data : data
      })
    }
    isUnderstoodClick(index,e){
      let data = this.state.data;
      if(e.target.value){
        data[index].understood = 1
      }else{
        data[index].understood = 2
      }
      this.setState({
        data : data
      })
    }
    isSmoothClick(index,e){
      let data = this.state.data;
      if(e.target.value){
        data[index].smooth = 1
      }else{
        data[index].smooth = 2
      }
      this.setState({
        data : data
      })
    }
    componentWillReceiveProps(nextProps){
      const {detailData} = nextProps;
      console.log('77',detailData)
      let data = [];
      if(detailData !==undefined){
      detailData.map((item,i1)=>{
        console.log(item)
        item.map((item2,i2)=>{
          if(item2.subIdx === -1){
            data.push({
              key : `${i1}${i2}`,
              position : item2.index,
              subIdx:item2.subIdx,
              isCorrect : '',
              status : '',
              problemId : item2.problemId,
              smooth:'',
              understood:''
            })
          }else{
            data.push({
              key : `${i1}${i2}`,
              position : `${item2.index}/(${item2.subIdx})`,
              subIdx:item2.subIdx,
              isCorrect : '',
              status : '',
              problemId : item2.problemId,
              smooth:'',
              understood:''
            })
          }
        })
      })
      console.log(data)
    }
     this.setState({
       data : data
     })
    }
    saveHandle(){
      var timestamp = Date.parse(new Date())/1000; 
      var data = JSON.parse(JSON.stringify(this.state.data));
      console.log('88888',data)
      var newData = [];
      var saveMsg = {};
      data.map((item,index)=>{
        if(item.isCorrect !==''){
          delete item.key;
          delete item.position;
          delete item.status;
          newData.push(item)
        }
      })
      saveMsg={
        time : timestamp,
        problems : newData
      }
      var result = Post('http://118.31.16.70/api/v3/students/me/problemsRevised/',saveMsg);
      result.then((response)=>{
        if(response.status ===200){
          if(this.props.category ==='1'){
            this.props.saveHandle(false);
          }else{
            this.props.nextOneHandle();
            console.log(this.props.currentIndex,this.props.allNum)
            if(this.props.currentIndex === this.props.allNum){
              // this.props.saveHandle(false);
              console.log('最后一题')
            }
          }
          message.success('结果标记成功',1.5);
        }else{
          message.error('结果标记失败',1.5);
        }
      })
    }
    render(){
      console.log(this.state.data)
      const columns = [{
        title: '题目序号',
        className: 'column-position',
        dataIndex: 'position',
        width:100
      }, {
        title: '做题结果',
        className: 'column-result',
        dataIndex: 'isCorrect',
        width:290,
      },
      {
        title: '状态信息',
        className: 'column-status',
        dataIndex: 'status',
      },
    ];
      let data1=[];
      this.state.data.map((data, i)=>{
        let a ={};
        a.key = data.key;
        a.position = data.position;
        a.isCorrect = <div>
                        <RadioGroup onChange={this.resultClick.bind(this,i)}>
                          <Radio value={true}>做对了</Radio>
                          <Radio value={false}>做错了</Radio>
                        </RadioGroup>
                        <Switch checkedChildren="做对了" unCheckedChildren="做错了" checked={data.isCorrect===''?true : data.isCorrect} style={{display:'none'}}/>
                    </div>
        if(data.status ==='' || data.status === undefined){
            a.status = null;
        }else if(!data.status){
            a.status =    <div>
                                <span className='status-font'>学习答案: </span>
                                <RadioGroup onChange={this.isUnderstoodClick.bind(this,i)}>
                                  <Radio value={true}>学懂了</Radio>
                                  <Radio value={false}>没学懂</Radio>
                                </RadioGroup>
                            </div>
        }else{
                a.status = <div>
                            <span className='status-font'>做题过程: </span>
                            <RadioGroup onChange={this.isSmoothClick.bind(this,i)}>
                              <Radio value={true}>顺利<span style={{visibility:'hidden'}}>了</span></Radio>
                              <Radio value={false}>不顺利</Radio>
                            </RadioGroup>
                          </div>
        }
        data1.push(a)
      })
        return(
          <div>
                <div className='topic-result'>
                    <Table
                        columns={columns}
                        dataSource={data1}
                        bordered
                        pagination={false}
                        scroll={{ y: 255 }}
                        style={{marginTop:20}}
                        rowClassName={(record, index)=>{
                            //可以用switch来做替换，switch 隐藏
                          if(record.isCorrect){
                            if(record.isCorrect.props.children[1].props.checked){
                              return ''
                            }else{
                              return 'wrong-row'
                            }
                          }else{
                            return ''
                          }
                        }}
                    />
                </div>
                <div className='save_btn'>
                  {
                    this.props.category === '1'?<Button type="primary" size='large' style={{width:240,height:35}} onClick={this.saveHandle.bind(this)}>保存</Button>:null
                  }
                  {
                    this.props.category === '2'? <Button type="primary" size='large' style={{width:240,height:35}} onClick={this.saveHandle.bind(this)}>下一题</Button>:null
                  }
                </div>
          </div>
        )
    }
}

export default ResultMark;
