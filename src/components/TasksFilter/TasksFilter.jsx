import React from 'react';
import './TasksFilter.css';

function TasksFilter({ changeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          onClick={() => {
            changeFilter('all');
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            changeFilter('active');
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            changeFilter('completed');
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
export default TasksFilter;
