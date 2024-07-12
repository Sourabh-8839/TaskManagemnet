import { useEffect, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import Loading from '../component/Loading';
import { Button, Tabs } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import AddTask from '../component/AddTask';

import {
  getAllAdminTask,
  getTask,
  getUserTask,
} from '../redux/actions/taskActions';
import { useDispatch, useSelector } from 'react-redux';
import { useData } from '../contexts';

import TableTask from '../component/Table/TableTask';

// const TASK_TYPE = {
//   todo: 'bg-blue-600',
//   'in progress': 'bg-yellow-600',
//   completed: 'bg-green-600',
// };

const Tasks = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { account } = useData();

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const admin = account?.user?.isAdmin;

  useEffect(() => {
    admin ? dispatch(getAllAdminTask()) : dispatch(getUserTask());
  }, [admin]);

  const check = useSelector((state) =>
    admin ? state.getAllTask : state.getUserTask
  );

  const tasks = check.tasks || [];

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4 '>
        <h2 className={'text-2xl font-semibold capitalize'}>Task</h2>
        {account?.user?.isAdmin && <AddTask />}
      </div>

      <TableTask tasks={tasks} />
    </div>
  );
};

export default Tasks;
