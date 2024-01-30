import React from 'react';

const TaskList = ({ tasks, onEdit, onToggleStatus, onDelete }) => {
  return (
    <div className='taskList'>
      {tasks.map((task) => (
        <tr key={task.id}>
          <td>{task.title}</td>
          <td>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => onToggleStatus(task)}
            />
          </td>
          <td>
            <img src='edit.svg' onClick={() => onEdit(task)}></img>
            <img src='delete.svg' onClick={() => onDelete(task)}></img>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default TaskList;
