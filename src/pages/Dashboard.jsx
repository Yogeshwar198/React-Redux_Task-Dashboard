import React, { useState } from 'react';
import { FaTasks, FaCheckCircle, FaSpinner, FaClipboardList } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks) || []; 
  const searchQuery = useSelector((state) => state.tasks.searchQuery) || ""; 

  const [selectedFilter, setSelectedFilter] = useState('All'); 

  // Filter tasks based on searchQuery
  const filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to apply filter based on selected filter (status)
  const applyFilter = (tasks) => {
    switch (selectedFilter) {
      case 'Completed':
        return tasks.filter((task) => task.status === 'Completed');
      case 'Pending':
        return tasks.filter((task) => task.status !== 'Completed');
      case 'Overdue':
        return tasks.filter((task) => {
          const currentDate = new Date();
          return task.dueDate && new Date(task.dueDate) < currentDate;
        });
      default:
        return tasks;
    }
  };

  // Apply selected filter
  const filteredBySelection = applyFilter(filteredTasks);

  // Calculate the counts for each category
  const totalTasks = filteredBySelection.length; 
  const completedTasks = filteredBySelection.filter((task) => task.status === 'Completed').length;
  const tasksInProgress = filteredBySelection.filter((task) => task.status === 'inProgress').length;
  const todoTasks = filteredBySelection.filter((task) => task.status === 'Todo').length;

  return (
    <div className="space-y-8">
     

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 opacity-0 animate-fadeIn">
        {/* Total Task */}
        <div className="card bg-gradient-to-r from-blue-500 to-purple-500 border-b-2 border-white hover:border-blue-800 cursor-pointer duration-300 bg-opacity-70 p-4 rounded-lg backdrop-blur-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-white uppercase font-medium">Total Tasks</h3>
            <FaTasks className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-white">{totalTasks}</h1>
        </div>

        {/* Completed Task */}
        <div className="card bg-gradient-to-r from-green-500 to-teal-500 bg-opacity-70 border-b-2 border-white hover:border-green-800 cursor-pointer duration-300 p-4 rounded-lg backdrop-blur-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-white uppercase font-medium">Completed Tasks</h3>
            <FaCheckCircle className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-white">{completedTasks}</h1>
        </div>

        {/* Task in Progress */}
        <div className="card bg-gradient-to-r from-blue-400 to-blue-700 bg-opacity-70 border-b-2 border-white hover:border-blue-800 cursor-pointer duration-300 p-4 rounded-lg backdrop-blur-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-white uppercase font-medium">Tasks in Progress</h3>
            <FaSpinner className="text-3xl text-white animate-spin duration-500" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-white">{tasksInProgress}</h1>
        </div>

        {/* Todos */}
        <div className="card bg-gradient-to-r from-yellow-400 to-orange-500 bg-opacity-70 border-b-2 border-white hover:border-orange-800 duration-300 cursor-pointer p-4 rounded-lg backdrop-blur-md">
          <div className="flex justify-between items-center">
            <h3 className="text-base text-white uppercase font-medium">Todos</h3>
            <FaClipboardList className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-white">{todoTasks}</h1>
        </div>
      </div>

       {/* Filter Section */}
       <div className="w-52 mb-4">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-500 bg-primaryColor  rounded-md  text-whiteColor"
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed Tasks</option>
          <option value="Pending">Pending Tasks</option>
          <option value="Overdue">Overdue Tasks</option>
        </select>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto bg-primaryColor border border-gray-500 rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Title</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Description</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Status</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {filteredBySelection.map((task) => (
              <tr key={task.id} className="hover:bg-black/50">
                <td className="py-3 px-4 border-b text-sm text-whiteColor">{task.title}</td>
                <td className="py-3 px-4 border-b text-sm text-whiteColor">{task.description}</td>
                <td className="py-3 px-4 border-b text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${task.status === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : task.status === 'inProgress'
                          ? 'bg-blue-100 text-blue-600'
                          : task.status === 'To Do'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b text-sm text-textColor">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
