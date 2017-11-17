import React, { Component } from 'react';
import {Table } from 'antd';
import './style.css';
class Tables extends Component{
    render(){
        return(
            <div>
                <Table
                    columns={this.props.columns}
                    dataSource={this.props.data}
                    bordered
                    pagination={false}
                    // pagination={{
                    //         total: 50,
                    //         pageSize: 10,
                    //         defaultPageSize:5,
                    //         showQuickJumper : true,
                    //         showSizeChanger: true,
                    //         pageSizeOptions:['5','10']
                    //     }
                    // }
                    scroll={{ y: 387 }}
                />
            </div>
        )
    }
}

export default Tables;