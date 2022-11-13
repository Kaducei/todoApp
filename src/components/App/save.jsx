import React, { Component } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

export default class App extends Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      filter: 'all',
      taskList: [
        {
          label: 'Porsche911',
          done: false,
          id: 1,
          creationTime: 1666181630482,
          dateDistance: 'less than a minute ago',
          editing: false,
        },
      ],
    };
  }

  deleteTask = (id) => {
    this.setState(({ taskList }) => {
      const indx = taskList.findIndex((el) => el.id === id);
      const newTaskList = [...taskList.slice(0, indx), ...taskList.slice(indx + 1)];
      return {
        taskList: newTaskList,
      };
    });
  };

  addTask = (name) => {
    this.maxId += 1;
    const newTask = {
      label: name,
      done: false,
      id: this.maxId,
      creationTime: Number(new Date()),
      dateDistance: 'created less than a minute ago',
      editing: false,
    };
    this.setState(({ taskList }) => {
      const newListTask = [...taskList, newTask];
      return {
        taskList: newListTask,
      };
    });
  };

  changeFilter = (filter) => {
    this.setState(() => ({ filter }));
  };

  clearCompleted = () => {
    this.setState(({ taskList }) => ({ taskList: taskList.filter((item) => !item.done) }));
  };

  refreshTime = () => {
    this.setState(({ taskList }) => ({
      taskList: taskList.map((elem) => {
        const newElem = elem;
        newElem.dateDistance = formatDistanceToNow(new Date(Number(newElem.creationTime)), { addSuffix: true });
        return newElem;
      }),
    }));
  };

  render() {
    setInterval(this.refreshTime, 10000);
    let filtredTasks = [];
    const { filter, taskList } = this.state;
    if (filter === 'all') {
      filtredTasks = taskList;
    }
    if (filter === 'completed') {
      filtredTasks = taskList.filter((task) => task.done);
    }
    if (filter === 'active') {
      filtredTasks = taskList.filter((task) => !task.done);
    }
    const doneCount = taskList.length - taskList.filter((task) => task.done).length;
    const { done } = taskList;
    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList taskList={filtredTasks} done={done} onDeleted={this.deleteTask} />
          <Footer doneCount={doneCount} changeFilter={this.changeFilter} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    );
  }
}
