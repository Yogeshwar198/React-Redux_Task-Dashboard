import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus, deleteTask } from '../features/todo/taskSlice';

const TodoPages = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, searchQuery } = useSelector((state) => state.tasks); 
  
  // Function to move task to "On Progress"
  const handleMoveToProgress = (taskId) => {
    dispatch(updateTaskStatus({ id: taskId, status: 'inProgress' }));
  };

  // Function to move task to "Done"
  const handleMoveToDone = (taskId) => {
    dispatch(updateTaskStatus({ id: taskId, status: 'done' }));
  };

  // Function to delete task
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // Filter tasks based on status being 'To Do' or 'Expired' and searchQuery
  const filteredTasks = tasks.filter(
    (task) =>
      (task.status === 'Todo' || task.status === 'Expired') &&
    task.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '') 
  );

  return (
    <div className="min-w-full mt-6 p-6 rounded-2xl">
      {/* Header displaying the number of tasks in "To Do" or "Expired" */}
      <h1 className="text-2xl font-semibold text-textColor mb-4">To Do Tasks</h1>
      <p className="text-gray-400 mb-4">
        You have {filteredTasks.length} task{filteredTasks.length === 1 ? '' : 's'} to complete.
      </p>

      {/* Table for displaying tasks */}
      <table className="overflow-x-auto min-w-full table-auto border-collapse opacity-0 animate-fadeIn">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2 text-left">Task</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Deadline</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">{error}</td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-black/50">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium ${
                      task.status === 'Expired'
                        ? 'text-red-600 bg-red-100'
                        : 'text-blue-600 bg-blue-100'
                    } rounded-full`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {/* Action buttons */}
                  <button
                    onClick={() => handleMoveToProgress(task.id)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-full text-xs hover:bg-yellow-500"
                  >
                    Progress
                  </button>
                  <button
                    onClick={() => handleMoveToDone(task.id)}
                    className="px-3 py-1 bg-green-400 text-white rounded-full text-xs hover:bg-green-500"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-400 text-white rounded-full text-xs hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoPages;
