import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/todo/taskSlice';
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-primaryColor shadow-md shadow-primary">
      {/* Search Bar */}
      <div className="relative flex items-center w-full">
        <FiSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          className="pl-10 w-full p-2 border bg-primaryColor text-whiteColor border-gray-500 rounded shadow-md shadow-primaryColor outline-none focus:ring-1 focus:ring-primaryColorLight"
          aria-label="Search project"
        />
      </div>

      {/* User Icon */}
      <div className="relative flex items-center rounded-full border-2 ml-2 border-gray-500 p-2">
        <AiOutlineUser className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
