import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames';
import checkImg from '../img/check.svg';
import checkCompleteImg from '../img/check-complete.svg';


class TodoItem extends Component {
    render() {
        const { item, onItemClicked } = this.props; 
        let classRender = classNames('TodoItem', {'TodoItem-complete' : item.isCompleted});
        let url = checkImg;
        if(item.isCompleted)
        {
            url = checkCompleteImg;
        }
        return (
            <div className={classRender} >
                <img onClick={onItemClicked} src={url} alt="checkImg" width={32} height={32}/>
                <p>{item.title}</p>
            </div>
        );
    }
}

export default TodoItem;