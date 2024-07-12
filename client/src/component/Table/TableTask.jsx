import React, { useState } from 'react';
import { BiMessageAltDetail } from 'react-icons/bi';
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from 'react-icons/md';

import {
  BGS,
  PRIOTITYSTYELS,
  TASK_TYPE,
  formatDate,
} from '../../utilis/index.js';
import clsx from 'clsx';
import { FaList } from 'react-icons/fa';
import { Avatar, Button, Table, Tbody } from '@chakra-ui/react';
import ConfirmationDialog from './ConfirmationDialog.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import AddTask from '../AddTask.jsx';
import EditTask from './EditTask.jsx';
// import UserInfo from '../UserInfo';
// import Button from '../Button';
// import ConfirmatioDialog from '../Dialogs';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TableTask = (props) => {
  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-black  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => {
    const navigate = useNavigate();
    const openTaskhandler = () => {
      navigate(`/task/${task._id}`);
    };
    return (
      <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10a'>
        <td className='py-2'>
          <div
            className='flex items-center gap-2 cursor-pointer uppercase'
            onClick={openTaskhandler}
          >
            <div
              className={clsx('w-4 h-4 rounded-full', TASK_TYPE[task.stage])}
            />
            <p className='w-full line-clamp-2 text-base text-black'>
              {task?.title}
            </p>
          </div>
        </td>

        <td className='py-2'>
          <div className={'flex gap-1 items-center'}>
            <span className={clsx('text-lg', PRIOTITYSTYELS[task?.priority])}>
              {ICONS[task?.priority]}
            </span>
            <span className='capitalize line-clamp-1'>
              {task?.priority} Priority
            </span>
          </div>
        </td>

        <td className='py-2'>
          <span className='text-sm text-gray-600'>
            {formatDate(new Date(task?.date))}
          </span>
        </td>

        <td className='py-2'>
          <div className='flex'>
            {task?.team?.map((m, index) => (
              <div
                key={m?._id}
                className={clsx(
                  'w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1',
                  BGS[index % BGS?.length]
                )}
              >
                <Avatar size={'sm'} />
              </div>
            ))}
          </div>
        </td>

        <td className='py-2 flex gap-2 md:gap-4 justify-end'>
          <EditTask task={task} />

          <ConfirmationDialog taskId={task?._id} />
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <Table className='w-full '>
            <TableHeader />
            <Tbody>
              {props.tasks.map((task) => (
                <TableRow key={task?._id} task={task} />
              ))}
            </Tbody>
          </Table>
        </div>
      </div>

      {/* TODO */}
    </>
  );
};

export default TableTask;
