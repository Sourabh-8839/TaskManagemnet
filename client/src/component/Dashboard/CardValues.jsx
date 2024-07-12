import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  flexbox,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const CardValues = () => {
  return (
    <Card
      flexDirection={'row'}
      className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'
    >
      <Box display={'flex'} flexDirection={'column'}>
        <Text>Total Task</Text>
        <Text>10</Text>
      </Box>
      <Box>
        <Avatar />
      </Box>
    </Card>
  );
};

export default CardValues;
