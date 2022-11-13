import React, { useState, useRef } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ setTaskList, taskList }) {
  const [label, setLabel] = useState(null);
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const maxId = useRef(100);
  const onInputChange = (event) => {
    setLabel(event.target.value);
  };
  const onMinChange = (event) => {
    setMin(event.target.value > 59 ? 59 : event.target.value);
  };
  const onSecChange = (event) => {
    setSec(event.target.value > 59 ? 59 : event.target.value);
  };

  const onInputSubmit = (event) => {
    maxId.current += 1;
    event.preventDefault();
    setTaskList([
      ...taskList,
      {
        id: maxId.current,
        label,
        done: false,
        creationTime: Number(new Date()),
        dateDistance: 'less than a minute ago',
        minutes: min,
        seconds: sec,
      },
    ]);
    setSec('');
    setMin('');
    setLabel(' ');
  };

  return (
    <header className="header">
      <h1>todo</h1>
      <form className="newTaskForm" onSubmit={onInputSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={onInputChange} value={label} />
        <input
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          value={min}
          placeholder="Min"
          onChange={onMinChange}
          onKeyDown={1}
        />
        <input
          type="number"
          min="0"
          max="59"
          value={sec}
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecChange}
          onKeyDown={1}
        />
        <input className="new-todo-form__submit" type="submit" />
      </form>
    </header>
  );
}

export default NewTaskForm;
