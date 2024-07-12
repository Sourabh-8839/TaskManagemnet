import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignInUser } from '../redux/actions/UserAction';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [Role, setRole] = useState('Other');
  const [isAdmin, setAdmin] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      username,
      Role,
      isAdmin,
    };

    dispatch(SignInUser(userData));

    navigate('/log-in');
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <Box className='border shadow-lg p-10'>
          <div className=''>
            <p className='text-blue-600 text-3xl font-bold text-center'>
              Welcome back!
            </p>
            <p className='text-center text-base text-gray-700 '>
              Keep all your credential safe.
            </p>
          </div>
          <FormControl isRequired width={'30vw'}>
            <FormLabel className='my-4'>UserName</FormLabel>
            <Input
              placeholder='Username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <FormLabel className='my-4'>Email address</FormLabel>
            <Input
              type='email'
              placeholder='email@example.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <FormLabel className='my-4'>Password</FormLabel>
            <Input
              type='password'
              placeholder='your password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormLabel className='my-4'>Role</FormLabel>
            <Select
              value={Role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value='Software Engineer'>Software Engineer</option>
              <option value='HR Department'> Hr Department</option>
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
              onClick={(e) => handleSubmit(e)}
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
