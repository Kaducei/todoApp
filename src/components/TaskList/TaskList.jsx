import React from 'react';

import Task from '../Task';

import './TaskList.css';

function TaskList({ taskList, setTaskList }) {
  const onDeleted = (id) => {
    const newTaskList = [...taskList].filter((item) => item.id !== id);
    setTaskList(newTaskList);
  };
  const onToggleDone = (id) => {
    const newTaskList = [...taskList].filter((item) => {
      if (item.id === id) {
        const newItem = item;
        newItem.done = !item.done;
      }
      return item;
    });
    setTaskList(newTaskList);
  };

  const elements = taskList.map((item) => (
    <Task
      minutes={item.minutes}
      seconds={item.seconds}
      creationTime={item.creationTime}
      onToggleDone={onToggleDone}
      dateDistance={item.dateDistance}
      label={item.label}
      done={item.done}
      key={item.id}
      id={item.id}
      onDeleted={() => {
        onDeleted(item.id);
      }}
    />
  ));

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
