import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignUpUser } from '../redux/actions/UserAction';

const SignUp = () => {
  const { user, error } = useSelector((state) => state.SignUp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [Role, setRole] = useState('Other');
  const [isAdmin, setAdmin] = useState(false);
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false); // Ensure the loading state is reset
      navigate('/log-in');
    }

    if (error) {
      toast({
        title: error,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false); // Ensure the loading state is reset
    }
  }, [user, error]);

  const handleSubmit = () => {
    setLoading(true);

    if (!username || !email || !password) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    const userData = {
      email,
      password,
      username,
      Role,
      isAdmin,
    };

    dispatch(SignUpUser(userData));
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='p-5 bg-white shadow-md rounded'>
        <Box width={'full'}>
          <FormControl isRequired width={'30vw'}>
            <FormLabel className='my-4'>Username</FormLabel>
            <Input
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel className='my-4'>Email address</FormLabel>
            <Input
              type='email'
              placeholder='email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel className='my-4'>Password</FormLabel>
            <Input
              type='password'
              placeholder='your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel className='my-4'>Role</FormLabel>
            <Select value={Role} onChange={(e) => setRole(e.target.value)}>
              <option value='Software Engineer'>Software Engineer</option>
              <option value='HR Department'>HR Department</option>
              <option value='Manager'>Manager</option>
              <option value='Admin'>Admin</option>
            </Select>
            <Checkbox
              className='my-4'
              onChange={(e) => setAdmin(e.target.checked)}
            >
              isAdmin
            </Checkbox>
            <Button
              type='submit'
              colorScheme='blue'
              rounded={'20px'}
              className='my-5 h-10 w-full rounded-full'
              onClick={handleSubmit}
              isLoading={Loading}
            >
              Signup
            </Button>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default SignUp;
