import React, { Component } from 'react';
import {Table, Switch, Button,Radio} from 'antd';
// import {Post} from '../../../fetch/data.js';
import './style.css';
const RadioGroup = Radio.Group;
var dataTest = [
    {
        key : '1',
        position : `1`,
        result : false,
        status : '',
    },
    {
        key : '2',
        position : `2`,
        result : false,
        status : '',
    },
    {
        key : '3',
        position : `3`,
        result : false,
        statust : '',
    },
    {
        key : '4',
        position : `4`,
        result : false,
        status : '',
    }

]
class ResultMark extends Component{
   constructor(){
     super();
     this.state={
       data : dataTest
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
      data[index].result = e.target.value;
      data[index].status =  e.target.value;
    //   if(data[index].status){
    //     data[index].status  = false
    //   }else{
    //     data[index].status  = true
    //   }
    //   data[index].isCorrect = true;
      this.setState({
        data : data
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
    // componentWillMount(){
    // //   const {page,topicAll} = this.props;
    // var topicAll = [];
    //   let data = [];
    //   topicAll.map((item,index)=>{
    //     if(item.subIdx===-1){
    //       data.push({
    //         key : index +1,
    //         position : `${item.column}/${item.idx}`,
    //         status : false,
    //         isCorrect : false,
    //         problemId : item.problemId,
    //       })
    //     }else{
    //       data.push({
    //         problemId : item.problemId,
    //         key : index +1,
    //         position : `${item.column}/${item.idx}/(${item.subIdx})`,
    //         status : false,
    //         isCorrect : false,
    //         problemId : item.problemId,
    //       })
    //     }
    //   })
    //  this.setState({
    //    data : data
    //  })
    // }
    render(){
      const columns = [{
        title: '题目序号',
        className: 'column-position',
        dataIndex: 'position',
        width:100
      }, {
        title: '做题结果',
        className: 'column-result',
        dataIndex: 'result',
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
        a.result = <RadioGroup onChange={this.resultClick.bind(this,i)}>
                        <Radio value={true} ref='test'>做对了</Radio>
                        <Radio value={false}>做错了</Radio>
                    </RadioGroup>
        if(data.status ==='' || data.status === undefined){
            a.status = null;
        }else if(!data.status){
            a.status = <RadioGroup>
                           <Radio value={true}>学懂了</Radio>
                            <Radio value={false}>没学懂</Radio>
                            </RadioGroup>
        }else{
                a.status = <RadioGroup>
                        <Radio value={true}>顺利</Radio>
                        <Radio value={false}>不顺利</Radio>
                        </RadioGroup>
        }
        // if(!data.result){
        //   a.result = <RadioGroup onChange={this.resultClick.bind(this,i)}>
        //                 <Radio value={true}>做对了</Radio>
        //                 <Radio value={false}>做错了</Radio>
        //              </RadioGroup>
        //   a.status = null
        // } else{
        //   a.result = <RadioGroup onChange={this.resultClick.bind(this,i)}>
        //                 <Radio value={true}>做对了</Radio>
        //                 <Radio value={false}>做错了</Radio>
        //              </RadioGroup>
        //   if(!data.status){
        //     a.status = <RadioGroup>
        //                 <Radio value={true}>学懂了</Radio>
        //                 <Radio value={false}>没学懂</Radio>
        //                 </RadioGroup>
        //   } else{
        //     a.status = <RadioGroup>
        //                 <Radio value={true}>顺利</Radio>
        //                 <Radio value={false}>不顺利</Radio>
        //                 </RadioGroup>
        //   }
        // }
        data1.push(a)
      })
    //   this.state.data.map((data, i)=>{
    //     let a ={};
    //     a.key = data.key;
    //     a.position = data.position;
    //     if(!data.status){
    //       a.status = <Switch checkedChildren="布置了" unCheckedChildren="没布置" checked={false}/>
    //       a.isCorrect = null
    //     } else{
    //       a.status = <Switch checkedChildren="布置了" unCheckedChildren="没布置" checked/>
    //       if(!data.isCorrect){
    //         a.isCorrect = <Switch checkedChildren="做对了" unCheckedChildren="做错了" checked={false}/>
    //       } else{
    //         a.isCorrect = <Switch checkedChildren="做对了" unCheckedChildren="做错了" checked/>
    //       }
    //     }
    //     data1.push(a)
    //   })
        return(
                <div className='topic-result'>
                    <Table
                        columns={columns}
                        dataSource={data1}
                        bordered
                        pagination={false}
                        scroll={{ y: 255 }}
                        style={{marginTop:20}}
                        rowClassName={(record, index)=>{
                            console.log(record);

                            //可以用switch来做替换，它switch 隐藏
                        //   if(record.isCorrect){
                        //     if(record.isCorrect.props.checked){
                        //       return ''
                        //     }else{
                        //       return 'wrong-row'
                        //     }
                        //   }else{
                        //     return ''
                        //   }
                        }}
                    />
                   
                </div>
        )
    }
}

export default ResultMark;
