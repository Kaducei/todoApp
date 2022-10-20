import React from 'react';

import Task from '../Task';

import './TaskList.css';

function TaskList({ taskList, onToggleDone, onDeleted, changeLabel, onEdit }) {
  const elements = taskList.map((item) => (
    <Task
      editing={item.editing}
      onEdit={onEdit}
      changeLabel={changeLabel}
      dateDistance={item.dateDistance}
      label={item.label}
      done={item.done}
      key={item.id}
      id={item.id}
      onToggleDone={onToggleDone}
      onDeleted={() => {
        onDeleted(item.id);
      }}
    />
  ));

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
