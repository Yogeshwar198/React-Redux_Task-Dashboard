import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PiDotsThreeBold } from 'react-icons/pi';
import { fetchTodo, editTask, deleteTask, updateTaskStatus, markExpiredTasks } from '../features/todo/taskSlice'; 
import TaskForm from './TaskForm';
import ConfirmationModal from './ConfirmationModal'; 

const Todo = () => {
  const { tasks, loading, error, searchQuery } = useSelector((state) => state.tasks); 
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null); 

  useEffect(() => {
    dispatch(fetchTodo()); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(markExpiredTasks()); 
  }, [tasks, dispatch]);

  const openEditModal = (task) => {
    setEditableTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditableTask(null);
  };

  const handleSaveTask = (task) => {
    dispatch(editTask(task)); 
    closeModal(); 
  };

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  // Open the delete confirmation modal
  const handleDeleteClick = (task) => {
    setTaskToDelete(task); 
  };

  // Confirm the deletion and delete the task
  const handleDeleteConfirm = () => {
    dispatch(deleteTask(taskToDelete.id)); 
    setTaskToDelete(null); 
  };

  // Cancel the deletion
  const handleDeleteCancel = () => {
    setTaskToDelete(null); 
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (task.status === 'Todo' || task.status === 'Expired') &&
      task.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '') 
  );

  return (
    <div className="min-w-[22vw] xl:min-w-[24.5vw] mt-6 p-4 rounded-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full w-2 h-2 bg-blue-600"></div>
          <h1 className="text-lg font-semibold text-whiteColor">To Do</h1>
          <p className="w-4 h-4 text-center text-[10px] font-medium text-gray-700 bg-gray-300 rounded-full">
            {filteredTasks.length}
          </p>
        </div>

        <hr className="h-1 bg-blue-600" />

        <div className="space-y-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{`Error: ${error}`}</div> 
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id || index}
                className="relative p-4 bg-white rounded-xl opacity-0 animate-fadeIn hover:scale-[1.1] duration-300"
              >
                <p
                  className={`inline-block mb-2 px-3 py-1 text-xs font-medium ${
                    task.status === 'Expired'
                      ? 'text-red-600 bg-red-100 hover:bg-red-200'
                      : 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                  } rounded-full`}
                >
                  {task.status}
                </p>
                <div className="relative group">
                  <button className="absolute right-2 -top-8 text-gray-400 hover:text-gray-600">
                    <PiDotsThreeBold />
                  </button>
                  <div className="hidden group-hover:flex flex-col absolute right-6 -top-16 text-whiteColor w-24 bg-primaryColor border border-gray-500 rounded-md shadow-lg z-10">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-black/25"
                      onClick={() => openEditModal(task)} 
                    >
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-black/25"
                      onClick={() => handleDeleteClick(task)} 
                    >
                      Delete
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-black/25"
                      onClick={() => handleStatusChange(task.id, 'inProgress')}
                    >
                      Progress
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm  hover:bg-black/25"
                      onClick={() => handleStatusChange(task.id, 'Completed')} 
                    >
                      Done
                    </button>
                  </div>
                </div>

                <h2 className="text-sm font-semibold text-gray-800">{task.title}</h2>
                <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Deadline: <span className="font-medium text-gray-700">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                </p>
              </div>
            ))
          )}
        </div>

        {/* Modal for editing task */}
        {isModalOpen && (
          <TaskForm onClose={closeModal} onSave={handleSaveTask} task={editableTask} />
        )}

        {/* Confirmation Modal for Deleting */}
        <ConfirmationModal
          isOpen={taskToDelete !== null}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          taskTitle={taskToDelete?.title}
        />
      </div>
    </div>
  );
};

export default Todo;
