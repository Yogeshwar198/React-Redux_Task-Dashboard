import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTodo } from '../features/todo/taskSlice';
import { RxCross2 } from "react-icons/rx";

const Completed = () => {
  const dispatch = useDispatch();
  const { tasks, searchQuery } = useSelector((state) => state.tasks);

  // Fetch completed tasks from the API when the component mounts
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  // Handle delete task
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // Filter tasks based on status being 'Completed' and matching the search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.status === 'Completed' && task.title.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className="p-6">
      {/* Header with title and task count */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-textColor">Completed Tasks</h1>
        <span className="text-sm text-gray-600 bg-gray-300 rounded-full px-2 py-1">
          {filteredTasks.length}Task{filteredTasks.length !== 1 && 's'}
        </span>
      </div>

      {/* Grid of completed task cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-0 animate-fadeIn">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="relative p-4 bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-white rounded-xl shadow-lg border border-green-400 hover:bg-gradient-to-r hover:from-green-700 hover:via-green-500 hover:to-green-300 hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-lg font-bold">{task.title}</h2>
            <p className="text-sm mt-2">{task.description}</p>
            <p className="text-xs mt-2">
              Deadline:{" "}
              <span className="font-medium">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
              </span>
            </p>

            {/* Delete Button */}
            <div className="absolute right-2 top-2">
              <button
                onClick={() => handleDelete(task.id)}
                className="text-white hover:text-gray-200 text-sm font-semibold"
              >
                <RxCross2 className="w-6 text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Completed;
