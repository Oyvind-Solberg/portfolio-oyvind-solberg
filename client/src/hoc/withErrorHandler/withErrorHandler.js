import React, { useEffect } from 'react';
import { useStore } from '../../store/store';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const dispatch = useStore(false)[2];

    const reqInterceptor = axios.interceptors.request.use(
      (req) => req,
      (err) => Promise.reject(err)
    );

    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        dispatch('SET_MESSAGE', {
          type: 'error',
          text: err.response ? err.response.data.message : err.message,
        });
        return Promise.reject(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.request.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    return (
      <>
        <WrappedComponent {...props} />;
      </>
    );
  };
};

export default withErrorHandler;
