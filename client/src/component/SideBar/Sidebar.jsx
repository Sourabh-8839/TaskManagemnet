import React from 'react';
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from 'react-icons/md';
import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useData } from '../../contexts';

const linkData = [
  // {
  //   label: 'Dashboard',
  //   link: 'dashboard',
  //   icon: <MdDashboard />,
  // },
  {
    label: 'Tasks',
    link: 'tasks',
    icon: <FaTasks />,
  },
  {
    label: 'Completed',
    link: 'completed/completed',
    icon: <MdTaskAlt />,
  },
  {
    label: 'In Progress',
    link: 'in-progress/in progress',
    icon: <MdOutlinePendingActions />,
  },
  {
    label: 'To Do',
    link: 'todo/todo',
    icon: <MdOutlinePendingActions />,
  },
  // {
  //   label: 'Team',
  //   link: 'team',
  //   icon: <FaUsers />,
  // },
  // {
  //   label: 'Trash',
  //   link: 'trashed',
  //   icon: <FaTrashAlt />,
  // },
];

const Sidebar = () => {
  const { account } = useData();

  const user = account.user;

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const NavLinkElements = ({ val }) => {
    return (
      <NavLink
        to={val.link}
        className={({
          isActive,
        }) => `w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d] 
            ${isActive ? 'bg-blue-700 text-neutral-100' : ''}
            `}
      >
        {val.icon}
        <span className='hover:text-[#2564ed]'>{val.label}</span>
      </NavLink>
    );
  };
  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <p className='bg-blue-600 p-2 rounded-full'>
          <MdOutlineAddTask className='text-white text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-black'>TaskMe</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8 text-black'>
        {sidebarLinks.map((link) => (
          <NavLinkElements val={link} key={link.label} />
        ))}
      </div>

      <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
