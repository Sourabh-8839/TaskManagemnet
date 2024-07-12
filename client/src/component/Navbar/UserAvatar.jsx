import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { FaUser, FaUserLock } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { useData } from '../../contexts/data.context';

const UserAvatar = () => {
  const { account, setAccount } = useData();

  const user = account.user;

  const logouthandler = () => {
    localStorage.removeItem('userInfo');
    setAccount(null);
  };

  return (
    <Menu>
      <MenuButton className='mx-3'>
        <Avatar name={user?.username || 'default'} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <FaUser className='mr-2' aria-hidden='true' />
          Profile
        </MenuItem>
        <MenuItem>
          <FaUserLock className='mr-2' aria-hidden='true' />
          Change password
        </MenuItem>
        <MenuItem onClick={logouthandler}>
          <IoLogOutOutline className='mr-2' aria-hidden='true' />
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserAvatar;
