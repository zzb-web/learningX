import React, { Component } from 'react';
import {Table, Switch, Button,Radio,message} from 'antd';
import {Post,Delete} from '../../../../fetch/data.js';
import './style.css';
const RadioGroup = Radio.Group;

class ResultMark extends Component{
   constructor(props){
     super();
     this.state={
       data : [],
       taskTime : props.taskTime,
       showSure: true,
       detailData : props.detailData
     }
   }
     resultClick(index,value){
      let data = this.state.data;
      data[index].isCorrect = value;
      if(value){
        data[index].understood = -1
      }else{
        data[index].smooth = -1
      }
      data[index].status =  value;
      this.setState({
        data : data,
        checked:value
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
    componentWillMount(){
      const {detailData , taskTime} = this.props;
      const data = this._dataHandle(detailData)
     this.setState({
       data : data,
       taskTime : taskTime
     })
    }
    componentWillReceiveProps(nextProps){
      const {detailData} = nextProps;
      const data = this._dataHandle(detailData)
     this.setState({
       data : data,
       taskTime : nextProps.taskTime,
       detailData : nextProps.detailData
     })
    }
    _dataHandle(detailData){
      console.log(detailData)
      let data = [];
      if(detailData !==undefined){
      detailData.map((item,i1)=>{
        item.map((item2,i2)=>{
          if(item2.subIdx === -1){
            data.push({
              key : `${i1}${i2}`,
              position : item2.index,
              subIdx:item2.subIdx,
              // isCorrect : '',
              isCorrect : true,
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
              // isCorrect : '',
              isCorrect : true,
              status : '',
              problemId : item2.problemId,
              smooth:'',
              understood:''
            })
          }
        })
      })
    }
    return data;
    }
    saveHandle(){
      this.setState({showSure : false})
      setTimeout(()=>{
          this.setState({showSure:true})
      },500)
      var timestamp = Date.parse(new Date())/1000; 
      
      var data = JSON.parse(JSON.stringify(this.state.data));
      const {taskTime} = this.state;
      var newData = [];
      var saveMsg = {};
      data.map((item,index)=>{
        if(item.isCorrect !==''){
          delete item.key;
          delete item.position;
          delete item.status;
          item.smooth = -1
          item.understood = -1
          newData.push(item)
        }
      })
      saveMsg={
        taskTime : taskTime,
        time : timestamp,
        type : 5,
        problems : newData
      }
      console.log(saveMsg)
      if(newData.length !== 0){
        var result = Post('/api/v3/students/me/problems/',saveMsg);
        result.then((response)=>{
          if(response.status ===200){
            this.props.saveHandle(false);
            message.success('结果标记成功',1.5);
            console.log(taskTime)
            var url = `/api/v3/students/me/uploadTasks/${taskTime}/`
            Delete(url).then(resp=>{
              if(resp.status === 200){
                this.props.saveHandle(false);
              }
            }).catch(err=>{
      
            })
            Post('/api/v3/students/me/problemFileState/',{state:0})
          }else{
            message.error('结果标记失败',1.5);
          }
        })
      }else{
        this.props.saveHandle(false);
      }
    }
    render(){
      const {showSure , detailData} = this.state;
      console.log(this.state.taskTime , detailData)
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
      // {
      //   title: '状态信息',
      //   className: 'column-status',
      //   dataIndex: 'status',
      // },
    ];
      var data1=[];
      this.state.data.map((data, i)=>{
        var a ={};
        a.key = data.key;
        a.position = data.position;
        // a.isCorrect = <div>
        //                 <RadioGroup onChange={this.resultClick.bind(this,i)} value={data.isCorrect}>
        //                   <Radio value={true}>做对了</Radio>
        //                   <Radio value={false}>做错了</Radio>
        //                 </RadioGroup>
        //                 <Switch checkedChildren="做对了" unCheckedChildren="做错了" checked={data.isCorrect===''?true : data.isCorrect} style={{display:'none'}}/>
        //             </div>
        a.isCorrect = <Switch style={{width:60}} checkedChildren="√" unCheckedChildren="×" onChange={this.resultClick.bind(this,i)} checked={data.isCorrect}/>
        /*if(data.status ==='' || data.status === undefined){
            a.status = null;
        }else if(!data.status){
            a.status =  <div>
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
        }*/
        data1.push(a)
      })
        return(
          <div>
                <div className='topic-result error-work'>
                    <Table
                        columns={columns}
                        dataSource={data1}
                        bordered
                        pagination={false}
                        scroll={{ y: 255 }}
                        style={{marginTop:20}}
                        rowClassName={(record, index)=>{
                          if(record.isCorrect.props.checked){
                          return ''
                          }else{
                          return 'wrong-row'
                          }
                        }}
                        // rowClassName={(record, index)=>{
                        //     //可以用switch来做替换，switch 隐藏
                        //   if(record.isCorrect){
                        //     if(record.isCorrect.props.children[1].props.checked){
                        //       return ''
                        //     }else{
                        //       return 'wrong-row'
                        //     }
                        //   }else{
                        //     return ''
                        //   }
                        // }}
                    />
                </div>
                <div className='save_btn'>
                    <Button type="primary" 
                            size='large' 
                            style={{width:240,height:35}} 
                            onClick={this.saveHandle.bind(this)}
                            disabled={!showSure}>保存</Button>
                </div>
          </div>
        )
    }
}

export default ResultMark;
