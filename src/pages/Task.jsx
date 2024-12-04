import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Complete from '../components/Complete';
import OnProgress from '../components/OnProgress';
import Todo from '../components/Todo';
import TaskForm from '../components/TaskForm';
import { addTask } from '../features/todo/taskSlice';

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Function to handle adding a task
  const handleAddTask = (task) => {
    const newTask = {
      id: Date.now(), 
      ...task,
      status: 'To Do', 
    };
    dispatch(addTask(newTask)); 
    setIsModalOpen(false); 
  };

  return (
    <div className="p-6">
      {/* Add Task Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative inline-block px-6 py-3 font-medium text-white rounded-3xl shadow-md 
                     bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 
                     hover:scale-110 transition-transform duration-300 
                     animate-[gradientMove_4s_linear_infinite] bg-[length:200%] overflow-hidden"
        >
          <span className="relative z-10">Add Task</span>
          <div className="absolute inset-0 rounded-lg bg-inherit blur-md opacity-60 -z-10"></div>
        </button>
      </div>

      {/* Modal for Task Form */}
      {isModalOpen && (
        <TaskForm
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddTask}
        />
      )}

      {/* Task Sections */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* To Do Tasks */}
        <div className="space-y-4">
          <Todo />
        </div>

        {/* On Progress Tasks */}
        <div className="space-y-4">
          <OnProgress />
        </div>

        {/* Completed Tasks */}
        <div className="space-y-4">
          <Complete />
        </div>
      </div>
    </div>
  );
};

export default Task;
