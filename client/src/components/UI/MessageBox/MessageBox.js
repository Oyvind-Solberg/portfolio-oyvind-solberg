import React, { useEffect } from 'react';
import { useStore } from '../../../store/store';
import classes from './MessageBox.module.scss';

import Paragraph from '../../typography/Paragraph/Paragraph';

const MessageBox = (props) => {
  const dispatch = useStore(false)[2];

  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      dispatch('SET_MESSAGE', false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const messageBoxClasses = [classes.MessageBox];

  if (props.type) {
    if (props.type === 'success') {
      messageBoxClasses.push(classes['MessageBox--success']);
    } else if (props.type === 'error') {
      messageBoxClasses.push(classes['MessageBox--danger']);
    }
  }

  return (
    <div className={messageBoxClasses.join(' ')}>
      <Paragraph>{props.text ? props.text : null}</Paragraph>
    </div>
  );
};

export default MessageBox;
