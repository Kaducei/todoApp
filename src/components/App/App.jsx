import React, { useState, useEffect } from 'react';
import './App.css';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

function App() {
  const [taskList, setTaskList] = useState([
    {
      label: 'Porsche911',
      done: false,
      id: 1,
      creationTime: 1666181630482,
      dateDistance: 'less than a minute ago',
      editing: false,
      minutes: 0,
      seconds: 0,
    },
    {
      label: 'Nissan Skyline',
      done: false,
      id: 2,
      creationTime: 1666181630482,
      dateDistance: 'less than a minute ago',
      editing: false,
      minutes: 0,
      seconds: 0,
    },
    {
      label: 'Dodge Stealth',
      done: false,
      id: 3,
      creationTime: 1666181630482,
      dateDistance: 'less than a minute ago',
      editing: false,
      minutes: 0,
      seconds: 0,
    },
  ]);
  const [filtredTasks, setFiltredTasks] = useState(taskList);
  const [filter, setFilter] = useState('all');

  const changeFilter = (filtrus) => {
    setFilter(filtrus);
  };

  useEffect(() => {
    if (filter === 'all') {
      setFiltredTasks(taskList.filter((task) => task));
    }
    if (filter === 'completed') {
      setFiltredTasks(taskList.filter((task) => task.done));
    }
    if (filter === 'active') {
      setFiltredTasks(taskList.filter((task) => !task.done));
    }
  }, [filter, taskList]);
  const clearCompleted = () => {
    setTaskList(taskList.filter((item) => !item.done));
  };
  const doneCount = taskList.length - taskList.filter((task) => task.done).length;
  return (
    <section className="todoapp">
      <NewTaskForm setTaskList={setTaskList} taskList={taskList} />
      <section className="main">
        <TaskList taskList={filtredTasks} setTaskList={setTaskList} />
        <Footer doneCount={doneCount} changeFilter={changeFilter} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
}
export default App;
