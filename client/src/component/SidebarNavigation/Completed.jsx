// import { useEffect } from 'react';
// import TableTask from '../Table/TableTask';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTaskByStage } from '../../redux/actions/taskActions';

// const Completed = () => {
//   const { status } = useParams();
//   const dispatch = useDispatch();

//   console.log(status);

//   useEffect(() => {
//     dispatch(getTaskByStage(status));
//   }, [dispatch]);

//   const { tasks } = useSelector((state) => state.getTaskByQuery);

//   return (
//     <div>
//       <TableTask tasks={[]} />
//     </div>
//   );
// };

// export default Completed;
