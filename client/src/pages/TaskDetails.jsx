import { Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTaskByID } from '../redux/actions/taskActions';
import { getInitials, PRIOTITYSTYELS, TASK_TYPE } from '../utilis';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdTaskAlt,
} from 'react-icons/md';
import clsx from 'clsx';

const bgColor = {
  high: 'bg-red-200',
  medium: 'bg-yellow-200',
  low: 'bg-blue-200',
};
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};
const TaskDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getTaskByID(id));
  }, []);

  const { task } = useSelector((state) => state.getTaskByID);

  return (
    <>
      {task ? (
        <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto'>
          <Box className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden '>
            <h1 className='text-2xl text-gray-600 font-bold uppercase'>
              {task?.title}
            </h1>

            <Box display={'flex'} alignItems={'center'} gap={'1.25rem'}>
              <div
                className={clsx(
                  'flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full',
                  PRIOTITYSTYELS[task?.priority],
                  bgColor[task?.priority]
                )}
              >
                <span className='text-lg'>{ICONS[task?.priority]}</span>
                <span className='uppercase'>{task?.priority} Priority</span>
              </div>

              <div className={clsx('flex items-center gap-2')}>
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full',
                    TASK_TYPE[task.stage]
                  )}
                />
                <span className='text-black uppercase'>{task?.stage}</span>
              </div>
            </Box>
            <p className='text-gray-500'>
              Created At: {new Date(task?.date).toDateString()}
            </p>

            <div className='space-y-4 py-6'>
              <p className='text-gray-600 font-semibold test-sm'>TASK TEAM</p>
              <div className='space-y-3'>
                {task?.team?.map((m, index) => (
                  <div
                    key={index}
                    className='flex gap-4 py-2 items-center border-t border-gray-200 uppercase'
                  >
                    <div
                      className={
                        'w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600'
                      }
                    >
                      <span className='text-center'>
                        {getInitials(m?.username)}
                      </span>
                    </div>

                    <div>
                      <p className='text-lg font-semibold'>{m?.username}</p>
                      <span className='text-gray-500'>{m?.Role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Box>
          <Box className='border-gray-200 uppercase' width={'40vw'}>
            <p className='text-gray-600 font-semibold test-sm uppercase '>
              Description
            </p>
            <Text className='border-t-2 my-4'>{task?.description}</Text>
          </Box>
        </div>
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export default TaskDetails;
