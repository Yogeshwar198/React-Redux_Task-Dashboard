import React, { useState, useEffect } from 'react';
import { PiDotsThreeBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus, deleteTask, markExpiredTasks } from '../features/todo/taskSlice';
import ConfirmationModal from './ConfirmationModal'; // Import the modal

const OnProgress = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    dispatch(markExpiredTasks());
  }, [tasks, dispatch]);

  // Function to move task to "Done"
  const handleMoveToDone = (taskId) => {
    dispatch(updateTaskStatus({ id: taskId, status: 'done' }));
  };

  // Function to move task to "Todo"
  const handleMoveToTodo = (taskId) => {
    dispatch(updateTaskStatus({ id: taskId, status: 'To Do' }));
  };

  // Handle delete task
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    closeModal();
  };

  const openModal = (task) => {
    setTaskToDelete(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  // Filter tasks to show only tasks with status 'inProgress' and matching search query
  const filteredTasks = tasks.filter((task) => {
    const lowerCaseSearchQuery = searchQuery?.toLowerCase() || "";
    return (
      task.status === 'inProgress' &&
      (task.title?.toLowerCase()?.includes(lowerCaseSearchQuery) || '')
    );
  });

  return (
    <div className="min-w-[22vw] xl:min-w-[24.5vw] mt-6 p-4 rounded-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full w-2 h-2 bg-yellow-500"></div>
          <h1 className="text-lg font-semibold text-whiteColor">On Progress</h1>
          <p className="w-4 h-4 text-center text-[10px] font-medium text-gray-700 bg-gray-300 rounded-full">
            {filteredTasks.length}
          </p>
        </div>
        <hr className="h-1 bg-yellow-500" />
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div key={task.id} className="relative p-4 bg-white border rounded-xl shadow-md opacity-0 animate-fadeIn hover:scale-[1.1] duration-300">
              <p
                className={`inline-block mb-2 px-3 py-1 text-xs font-medium ${task.status === 'Expired' ? 'text-red-600 bg-red-100 hover:bg-red-200' : 'text-blue-600 bg-blue-100 hover:bg-blue-200'} rounded-full`}
              >
                {task.status}
              </p>
              <div className="relative group">
                <button className="absolute right-2 -top-8 text-gray-400 hover:text-gray-600">
                  <PiDotsThreeBold />
                </button>
                <div className="hidden group-hover:flex flex-col absolute right-0 -top-5 w-24 text-whiteColor bg-primaryColor border border-gray-500 rounded-md shadow-lg z-10">
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-black/25"
                    onClick={() => openModal(task)} // Open modal for confirmation
                  >
                    Delete
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-black/25"
                    onClick={() => handleMoveToTodo(task.id)}
                  >
                    Todo
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-black/25"
                    onClick={() => handleMoveToDone(task.id)}
                  >
                    Done
                  </button>
                </div>
              </div>
              <h2 className="text-sm font-semibold text-gray-800">{task.title}</h2>
              <p className="text-xs text-gray-600 mt-1">{task.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Deadline: <span className="font-medium text-gray-700">{task.deadline?.toLocaleDateString()}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Render Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => handleDelete(taskToDelete?.id)}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
};

export default OnProgress;
