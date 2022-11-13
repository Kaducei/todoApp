import React, { useState } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';

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
  ]);
  const [filtredTasks, setFiltredTasks] = useState([]);
  const [maxId, setMaxId] = useState(100);
  const [filter, setFilter] = useState('all');
  const doneCount = taskList.length - taskList.filter((task) => task.done).length;
  const { done } = taskList;

  const onToggleDone = (id) => {
    const newList = taskList.map((task) => ({
      ...task,
      done: task.id === id ? !task.done : task.done,
    }));
    setTaskList(newList);
  };
  const deleteTask = (id) => {
    const indx = taskList.findIndex((el) => el.id === id);
    const newTaskList = [...taskList.slice(0, indx), ...taskList.slice(indx + 1)];
    setTaskList(newTaskList);
  };
  const addTask = (label) => {
    setMaxId(maxId + 1);
    const newTask = {
      label,
      done: false,
      id: maxId,
      creationTime: Number(new Date()),
      dateDistance: 'created less than a minute ago',
      editing: false,
    };
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
  };

  const changeFilter = (filtrus) => {
    setFilter(filtrus);
  };

  const clearCompleted = () => {
    setTaskList(taskList.filter((item) => !item.done));
  };

  const refreshTime = () => {
    taskList.map((elem) => {
      const newElem = elem;
      newElem.dateDistance = formatDistanceToNow(new Date(Number(newElem.creationTime)), { addSuffix: true });
      return newElem;
    });
  };
  setInterval(refreshTime, 10000);
  const changeLabel = (id, text) => {
    taskList.map((elem) => {
      const newElem = elem;
      if (newElem.id === id) {
        newElem.label = text;
        newElem.editing = false;
      }
      return newElem;
    });
  };

  const onEdit = (id) => {
    taskList.map((elem) => {
      const newElem = elem;
      if (newElem.id === id) {
        newElem.editing = true;
      }
      return newElem;
    });
  };

  if (filter === 'all') {
    setFiltredTasks(taskList);
  }
  if (filter === 'completed') {
    setFiltredTasks(taskList.filter((task) => task.done));
  }
  if (filter === 'active') {
    setFiltredTasks(taskList.filter((task) => !task.done));
  }

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          onEdit={onEdit}
          changeLabel={changeLabel}
          taskList={filtredTasks}
          onToggleDone={onToggleDone}
          done={done}
          onDeleted={deleteTask}
        />
        <Footer doneCount={doneCount} changeFilter={changeFilter} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
}
export default App;
