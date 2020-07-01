import React, { useEffect } from 'react';
import { useStore } from '../../../store/store';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  const asyncDispatch = useStore(false)[1];

  useEffect(() => {
    asyncDispatch('LOGOUT');
  });
  return <Redirect to="/" />;
};

export default Logout;
