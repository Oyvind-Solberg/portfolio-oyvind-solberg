import React from 'react';

import classes from './Container.module.scss';

const Container = (props) => {
  const inputClasses = [classes.Container];

  if (props.color === 'light') {
    inputClasses.push(classes['Container--light']);
  }

  if (props.color === 'grey') {
    inputClasses.push(classes['Container--grey']);
  }

  return <div className={inputClasses.join(' ')}>{props.children}</div>;
};

export default Container;
