import { Avatar, Box, Table, Th, Thead, Tr } from '@chakra-ui/react';
import clsx from 'clsx';
import React from 'react';
import moment from 'moment';
import { BGS, PRIOTITYSTYELS } from '../../utilis';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from 'react-icons/md';

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <Thead className='border-b border-gray-300 '>
      <Tr>
        <Th>Task Title</Th>
        <Th>Priority</Th>
        <Th>Team</Th>
        <Th>Created At</Th>
      </Tr>
    </Thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div className={clsx('w-4 h-4 rounded-full')} />

          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx('text-lg', PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <Box
              key={index}
              className={clsx(
                'w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1',
                BGS[index % BGS.length]
              )}
            >
              <Avatar name={m.name} size={'sm'} />
            </Box>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <Table className='w-full'>
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskTable;
