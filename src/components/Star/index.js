import React, { Component } from 'react';
import { Rate } from 'antd';
import './style.css';
class Star extends Component{
    render(){
        return(
            <div className='star'>
                <span>{this.props.title}:</span>
                <Rate value={this.props.star} disabled></Rate>
            </div>
        )
    }
}

export default Star;
