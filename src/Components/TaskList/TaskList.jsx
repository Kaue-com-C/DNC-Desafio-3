import React from 'react';

const TaskList = ({ tasks, onEdit, onToggleStatus, onDelete, onPriorityChange }) => {
  const handlePriorityChange = (task, e) => {
    const priority = e.target.value;
    onPriorityChange(task, priority);
  };

  return (
    <div className='taskList'>
      {tasks.map((task) => (
        <tr key={task.id} className={task.priority}>
          <td>{task.title}</td>
          <td>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => onToggleStatus(task)}
            />
          </td>
          <td>
            <select
              value={task.priority}
              onChange={(e) => handlePriorityChange(task, e)}
              style={{ backgroundColor: task.priority === 'low' ? '#0C70F2' : task.priority === 'medium' ? 'yellow' : 'red' }}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </td>
          <td>
            <img src='edit.svg' onClick={() => onEdit(task)} alt="Edit Task" />
            <img src='delete.svg' onClick={() => onDelete(task)} alt="Delete Task" />
          </td>
        </tr>
      ))}
    </div>
  );
};

export default TaskList;
