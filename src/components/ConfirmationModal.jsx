import React from 'react';
import { BsInfoLg } from 'react-icons/bs'; // Import the BsInfoLg icon

const ConfirmationModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center -top-10 items-center z-50">
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 p-6 bg-opacity-50 rounded-2xl shadow-lg w-1/3 fadeInUp">
        <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
          {/* Circle around the icon */}
          <div className="bg-whiteColor text-primaryColor rounded-full p-3">
            <BsInfoLg className="text-3xl" />
          </div>
        </h2>
        <p className="text-center mb-4 text-white">
          Confirm Deletion <br /> "{taskTitle}"?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-gradient-to-r from-secondaryColor via-secondaryColor hover:bg-gradient-to-l hover:from-secondaryColor hover:via-secondaryColor text-white px-4 py-2 rounded-md hover:scale-[1.1] duration-300"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="text-black px-4 py-2 rounded-md hover:scale-[1.1] duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
