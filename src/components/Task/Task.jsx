import React, { useState, useEffect } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

function Task({ id, onDeleted, label, onToggleDone, creationTime, done, seconds, minutes }) {
  const [name, setLabel] = useState(label);
  const [editingClass, setEditingClass] = useState(null);
  const [dateDistance, setDatedistance] = useState(`${formatDistanceToNow(new Date(Number(creationTime)))} ago`);
  const [isCounting, setIsCounting] = useState(false);
  const transMins = minutes * 60;
  const startingTime = +transMins + +seconds;
  const [timeLeft, setTimeLeft] = useState(Number(startingTime));
  const mins = Math.floor(timeLeft / 60);
  const sec = timeLeft - mins * 60;
  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setTimeLeft((timeleft) => timeleft + 1);
        if (timeLeft < 0) {
          setIsCounting(false);
          setTimeLeft(startingTime);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isCounting, timeLeft]);

  const handleStart = () => {
    setIsCounting(true);
  };
  const handleStop = () => {
    setIsCounting(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDatedistance(formatDistanceToNow(new Date(Number(creationTime)), { addSuffix: true }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dateDistance]);

  const changeLabel = (text, taskId) => {
    if (taskId === id) {
      setLabel(text);
      setEditingClass('none');
    }
  };
  const onEdit = (taskId) => {
    if (taskId === id) {
      setEditingClass('editing');
    }
  };
  return (
    <li className={editingClass}>
      <div className="view">
        <input
          defaultChecked={done}
          className="toggle"
          type="checkbox"
          onClick={() => {
            if (editingClass === 'completed') {
              setEditingClass(null);
            } else {
              setEditingClass('completed');
            }
            onToggleDone(id);
          }}
          id={id}
        />
        <label className="taskLabel" htmlFor={id}>
          <span className="description">{name}</span>
          <span className="item-timer">
            <button type="button" className="icon-play" onClick={handleStart} />
            <button type="button" className="icon-pause" onClick={handleStop} />
            <span className="total-time">{`${mins} min ${sec} sec`}</span>
          </span>
          <span className="created">{dateDistance}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => {
            onEdit(id);
          }}
        />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={label}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            changeLabel(e.target.value, id);
          }
        }}
      />
    </li>
  );
}

export default Task;
