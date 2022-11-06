import React from 'react';
import './Task.css';

function Task({ label, onToggleDone, id, done, onDeleted, dateDistance, changeLabel, onEdit, editing }) {
  let className = '';
  if (editing) {
    className = 'editing';
  }
  if (done) {
    className = 'completed';
  }

  return (
    <li className={className}>
      <div className="view">
        <input
          defaultChecked={done}
          className="toggle"
          type="checkbox"
          onClick={() => {
            onToggleDone(id);
          }}
          id={id}
        />
        <label className="taskLabel" htmlFor={id}>
          <span className="description">{label}</span>
          <span className="created">created {dateDistance}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => {
            onEdit(id);
          }}
        />
        button
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={label}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            changeLabel(id, e.target.value);
          }
        }}
      />
    </li>
  );
}

export default Task;
