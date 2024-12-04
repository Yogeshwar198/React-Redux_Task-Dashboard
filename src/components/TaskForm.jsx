import React, { useState, useEffect } from 'react';

const TaskForm = ({ onClose, onSave, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  // Populate the form with task data when the component mounts or when the task prop changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
      });
    }
  }, [task]);

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Save the updated task data
    onSave({
      ...task,
      title: formData.title,
      description: formData.description || 'No description',
      dueDate: formData.dueDate || 'No due date',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primaryColor bg-opacity-50">
      {/* Modal Form */}
      <form
        onSubmit={handleSave}
        className="bg-gradient-to-r from-blue-500 via-purple-500 bg-opacity-50 w-3/4 md:w-1/2 lg:w-1/3 p-6 rounded-3xl shadow-lg relative fadeInUp"
      >
        <h2 className="text-xl font-bold mb-4">
          {task ? 'Edit Task' : 'Add Task'}
        </h2>

        {/* Task Title */}
        <input
          type="text"
          name="title"
          className="w-full mb-4 p-2 border text-whiteColor bg-primaryColor border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Task Description */}
        <textarea
          name="description"
          className="w-full mb-4 p-2 border border-gray-300 bg-primaryColor text-whiteColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Due Date */}
        <label className="block mb-2 text-sm font-medium text-whiteColor">
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          className="w-full mb-4 p-2 border text-whiteColor bg-primaryColor border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-whiteColor hover:text-primaryColor hover:scale-[1.1] duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-2xl bg-gradient-to-r from-primaryColor hover:bg-gradient-to-r hover:from-blue-800 hoverto-purple-800 hover:scale-[1.1] duration-300"
          >
            {task ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
