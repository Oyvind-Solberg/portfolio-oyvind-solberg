import React from 'react';
import { useStore } from '../../store/store';

import MessageBox from '../../components/UI/MessageBox/MessageBox';

const withMessageHandler = (WrappedComponent) => {
  return (props) => {
    const { message } = useStore()[0];

    return (
      <>
        {message ? (
          <MessageBox type={message.type} text={message.text} />
        ) : null}
        <WrappedComponent {...props} />;
      </>
    );
  };
};

export default withMessageHandler;
