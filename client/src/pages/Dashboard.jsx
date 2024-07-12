import React from 'react';
import TaskTable from '../component/Dashboard/TaskTable';
import { summary } from '../assets/data';
import CardValues from '../component/Dashboard/CardValues';

const Dashboard = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        <CardValues />
        <CardValues />
        <CardValues />
        <CardValues />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}

        <TaskTable tasks={summary.last10Task} />

        {/* /right */}

        {/* <UserTable users={summary.users} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
