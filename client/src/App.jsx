import React, { useEffect } from 'react';
import Login from './pages/Login';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import TaskDetails from './pages/TaskDetails';
import { useData } from './contexts/index.js';

import Sidebar from './component/SideBar/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './component/Navbar/Navbar.jsx';
import { useDispatch } from 'react-redux';
import { getTask } from './redux/actions/taskActions.js';
import SignUp from './pages/SignUp.jsx';
// import Completed from './component/SidebarNavigation/Completed.jsx';

const Layout = () => {
  const { account } = useData();

  return account ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' />
  );
};

const App = () => {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/' element={<Navigate to='/tasks' />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          <Route path='/tasks' element={<Tasks />} />
          {/* <Route path='/completed/:status' element={<Completed />} /> */}
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>
        <Route path='/log-in' element={<Login />} />
        <Route path='/Signup' element={<SignUp />} />
      </Routes>
    </main>
  );
};

export default App;
