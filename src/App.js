import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.svg';
import classNames from 'classnames';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [{ title: "Go to cinema", isCompleted: true },
      { title: "Travel to Canada", isCompleted: false },
      { title: "Learn Reactjs", isCompleted: false }],
      isCheckAll: false,
      isFilter: "all",
      todoItemsNoneFilter: []
    }

    this.onItemClicked = this.onItemClicked.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onAllItemClick = this.onAllItemClick.bind(this);
    this.onFilter = this.onFilter.bind(this);
  };

  

  onItemClicked(item) {
    return (event) => {
      const isCompleted = item.isCompleted;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      const newTodoitems = [...todoItems.slice(0, index),
        {
          ...item,
          isCompleted: !isCompleted
        },
        ...todoItems.slice(index + 1)]
      const isCheckAll = newTodoitems.find(item => item.isCompleted === false) ? false : true;
      this.setState(
        {
          todoItems: newTodoitems,
          isCheckAll: isCheckAll
        }
      )
    }
  }

  onKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      if (!text) { return; }

      text = text.trim();
      if (!text) { return; }

      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isCompleted: false },
          ...this.state.todoItems,
        ]
      })
    } else {
      this.setState({
        newItem: text
      })
    }
  }

  onAllItemClick() {
    const todoItems = this.state.todoItems;
    if (this.state.isCheckAll === false) {
      this.setState({
        todoItems: todoItems.map(item => ({ title: item.title, isCompleted: true })),
        isCheckAll: true
      })
    }
    else {
      this.setState({
        todoItems: todoItems.map(item => ({ title: item.title, isCompleted: false })),
        isCheckAll: false
      })
    }
  }

  onFilter(filter) {
    return () =>
    {
      this.setState({
        isFilter: filter
      }
      )
    }
  }

  render() {
    const { newItem, isCheckAll, isFilter } = this.state;
    let {todoItems} = this.state
    const tickCheckAll = classNames({ 'all-active': isCheckAll }, { 'none-active': !isCheckAll });
    switch (isFilter) {
      case 'active':
         todoItems = todoItems.filter(item => item.isCompleted === false);
         break;
      case 'completed':
         todoItems = todoItems.filter(item => item.isCompleted === true);
         break;
      default:
          todoItems = todoItems;
          break;
    };

    return (
      <div className="App">
        <div className="Header">
          <img className={tickCheckAll} src={tick} width={32} height={32} onClick={this.onAllItemClick} />
          <input
            type="text"
            placeholder="Add a new item"
            value={newItem}
            onChange={this.onKeyUp}
            onKeyUp={this.onKeyUp} />
        </div>
        {
          todoItems.length > 0 && todoItems.map((item, index) =>
            <TodoItem key={index}
              item={item}
              onItemClicked={this.onItemClicked(item)} />)
        }
        {
          todoItems.length === 0 && ' Sorry, No find any record ....'
        }
        <div className="Footer">
          <a className={classNames({ 'selected': isFilter === 'all' })} onClick={this.onFilter('all')} href="#">All</a>
          <a className={classNames({ 'selected': isFilter === 'active' })} onClick={this.onFilter('active')} href="#">Active</a>
          <a className={classNames({ 'selected': isFilter === 'completed' })} onClick={this.onFilter('completed')} href="#">Completed</a>
        </div>
      </div>
    );
  }
}

export default App;
