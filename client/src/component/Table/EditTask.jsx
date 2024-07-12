import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import UserList from '../UserList';
import moment from 'moment';
import { getAllAdminTask, updateTask } from '../../redux/actions/taskActions';

const EditTask = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Date = moment(task.date, 'DD-MM-YYYY').format('YYYY-MM-DD');

  const [title, setTitle] = useState(task.title);
  const [team, setTeam] = useState(task.team);
  const [priority, setPriority] = useState(task.priority);
  const [date, setDate] = useState(Date);
  const [stage, setStage] = useState(task.stage);
  const [description, setDescription] = useState(task.description);

  const dispatch = useDispatch();

  const formSubmitHandler = async () => {
    const data = {
      title,
      team,
      priority,
      date,
      stage,
      description,
    };

    dispatch(updateTask(task._id, data)).then(() => {
      dispatch(getAllAdminTask());
    });

    onClose();
    // setDate('');
    // setTitle('');
    // setDescription('');
    // setStage('pending');
    // setPriority('medium');
    // setTeam([]);
  };
  return (
    <div>
      <Button onClick={onOpen} color={'blue'}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task Title</FormLabel>
              <Input
                value={title}
                placeholder='Task Title'
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                placeholder='Description'
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <UserList setTeam={setTeam} team={team} />

              <Box display={'flex'} marginTop={'20px'}>
                <FormLabel>
                  Task Stage
                  <Select
                    value={stage}
                    onChange={(e) => {
                      setStage(e.target.value);
                    }}
                  >
                    <option value='pending'>pending</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </Select>
                </FormLabel>

                <FormLabel>
                  Date
                  <Input
                    type='date'
                    forma
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </FormLabel>
              </Box>

              <FormLabel>Priority Level</FormLabel>
              <Select
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
              >
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={formSubmitHandler}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditTask;
