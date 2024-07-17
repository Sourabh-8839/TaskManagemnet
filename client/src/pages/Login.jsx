import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useData } from '../contexts/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/UserAction.js';

const Login = () => {
  const { user, error } = useSelector((state) => state.Login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const { account, setAccount } = useData();

  useEffect(() => {
    if (user?.data) {
      toast({
        title: 'Login Successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });

      setAccount(user?.data || {});
      setLoading(false);

      navigate('/tasks');
    }

    if (error) {
      toast({
        title: error,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  }, [user, error]);

  const handleSubmit = () => {
    setLoading(true);

    if (!email || !password) {
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

    dispatch(loginUser(email, password));
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
          <FormControl isRequired>
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

            <Button
              type='submit'
              colorScheme='blue'
              rounded={'20px'}
              className='my-5 h-10 w-full rounded-full'
              onClick={handleSubmit}
              isLoading={Loading}
            >
              Login
            </Button>
          </FormControl>
          <Button
            type='submit'
            rounded={'20px'}
            className='my-5 h-10 w-full rounded-full border'
            onClick={() => {
              navigate('/Signup');
            }}
          >
            SignUp
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
