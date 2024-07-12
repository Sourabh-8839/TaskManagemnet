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
import UserList from './UserList';

import { useDispatch } from 'react-redux';
import { addTask, getTask, getUserTask } from '../redux/actions/taskActions';

const AddTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState('');
  const [team, setTeam] = useState([]);
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');
  const [stage, setStage] = useState('pending');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const formSubmitHandler = () => {
    const data = {
      title,
      team,
      priority,
      date,
      stage,
      description,
    };

    dispatch(addTask(data));

    dispatch(getTask());

    setDate('');
    setTitle('');
    setDescription('');
    setStage('pending');
    setPriority('medium');
    setTeam([]);
  };
  return (
    <div>
      <Button
        onClick={onOpen}
        background={'rgb(37 99 235 / var(--tw-bg-opacity))'}
      >
        Create Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
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
                    onChange={(e) => {
                      setStage(e.target.value);
                    }}
                  >
                    <option value='pending' selected>
                      pending
                    </option>
                    <option value='in-progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </Select>
                </FormLabel>

                <FormLabel>
                  Date
                  <Input
                    type='date'
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </FormLabel>
              </Box>

              <FormLabel>Priority Level</FormLabel>
              <Select
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

export default AddTask;
