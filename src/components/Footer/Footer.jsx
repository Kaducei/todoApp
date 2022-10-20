import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

import './Footer.css';

function Footer({ doneCount, changeFilter, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TasksFilter changeFilter={changeFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
Footer.defaultProps = {
  doneCount: 0,
  changeFilter: () => {},
  clearCompleted: () => {},
};
Footer.propTypes = {
  doneCount: PropTypes.number,
  changeFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
