import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  onInputChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onInputSubmit = (event) => {
    const { label } = this.state;
    const { addTask } = this.props;
    event.preventDefault();
    addTask(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>todo</h1>
        <form className="newTaskForm" onSubmit={this.onInputSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            value={label}
          />
        </form>
      </header>
    );
  }
}
