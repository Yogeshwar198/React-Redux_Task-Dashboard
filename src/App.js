import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Task from './pages/Task'
import Completed from './pages/Completed'
import TodoPages from './pages/TodoPages'


const App = () => {
  
  return (
    <div className="bg-primaryColor flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        {/* Content Goes Here */}
        <div className="p-6 text-white">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/todo' element={<TodoPages />} />
            <Route path='/task' element={<Task />} />
            <Route path='/completed' element={<Completed />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App