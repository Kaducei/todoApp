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
        {
          label: 'Porsche Cayman',
          done: false,
          id: 2,
          creationTime: 1666181630482,
          dateDistance: 'less than a minute ago',
          editing: false,
        },
        {
          label: 'Porsche Turbo S',
          done: false,
          id: 3,
          creationTime: 1666181630482,
          dateDistance: 'less than a minute ago',
          editing: false,
        },
      ],
    };
  }

  onToggleDone = (id) => {
    this.setState(({ taskList }) => {
      const newList = taskList.map((task) => ({
        ...task,
        done: task.id === id ? !task.done : task.done,
      }));
      return { taskList: newList };
    });
  };

  deleteTask = (id) => {
    this.setState(({ taskList }) => {
      const indx = taskList.findIndex((el) => el.id === id);
      const newTaskList = [...taskList.slice(0, indx), ...taskList.slice(indx + 1)];
      return {
        taskList: newTaskList,
      };
    });
  };

  addTask = (label) => {
    const newTask = {
      label,
      done: false,
      id: this.maxId + 1,
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

  changeLabel = (id, text) => {
    this.setState(({ taskList }) => ({
      taskList: taskList.map((elem) => {
        const newElem = elem;
        if (newElem.id === id) {
          newElem.label = text;
          newElem.editing = false;
        }
        return newElem;
      }),
    }));
  };

  onEdit = (id) => {
    this.setState(({ taskList }) => ({
      taskList: taskList.map((elem) => {
        const newElem = elem;
        if (newElem.id === id) {
          newElem.editing = true;
        }
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
          <TaskList
            onEdit={this.onEdit}
            changeLabel={this.changeLabel}
            taskList={filtredTasks}
            onToggleDone={this.onToggleDone}
            done={done}
            onDestroy={this.onDestroy}
            onDeleted={this.deleteTask}
          />
          <Footer doneCount={doneCount} changeFilter={this.changeFilter} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    );
  }
}
