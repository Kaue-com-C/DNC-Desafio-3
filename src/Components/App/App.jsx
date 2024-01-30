import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import Header from '../Header/Header';
import './index.scss';


const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: tasks.length + 1,
        title: newTask,
        status: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTaskObject]);
      setNewTask('');
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleToggleStatus = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, status: !t.status } : t))
    );
  };

  const handleUpdateTask = () => {
    if (editTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === editTask.id ? { ...t, title: editTask.title } : t))
      );
      setEditTask(null);
    }
  };

  const handleDeleteTask = (task) => {
    console.log('Deleting task:', task);
    setConfirmDelete(task);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      console.log('Confirmed deletion of task:', confirmDelete);
      const taskId = confirmDelete.id;
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      console.log('Updated tasks after deletion:', updatedTasks);
      setTasks(updatedTasks);
      setConfirmDelete(null);
      setConfirmationModalOpen(false);
    }
  };

  return (
    <div>
      <Header />
      <div className='body'>
      <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>

      <table className="task-table">
        <thead>
          <tr>
            <th>Tarefas</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
          <div id='border'></div>
        </thead>
        <tbody>
          <TaskList tasks={tasks} onEdit={handleEditTask} onToggleStatus={handleToggleStatus} onDelete={handleDeleteTask} />

          {editTask && (
            <tr key={editTask.id}>
              <td colSpan="2">
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                />
              </td>
              <td>
                {!editTask.status && (
                  <>
                    <button onClick={handleUpdateTask}>Salvar</button>
                    <button onClick={() => setEditTask(null)}>Cancelar</button>
                  </>
                )}
              </td>
            </tr>
          )}

          {isConfirmationModalOpen && confirmDelete && (
            <tr>
              <td colSpan="3">
                Tem certeza que deseja excluir a tarefa "{confirmDelete.title}"?
                <button onClick={handleConfirmDelete}>Sim</button>
                <button onClick={() => setConfirmationModalOpen(false)}>Não</button>
              </td>
            </tr>
          )}

          <tr>
            <td>
              <input
                type="text"
                placeholder="Nova Tarefa"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{fontWeight: 'light'}}
              />
            </td>
            <td></td>
            <td>
              <button onClick={handleAddTask}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default App;
