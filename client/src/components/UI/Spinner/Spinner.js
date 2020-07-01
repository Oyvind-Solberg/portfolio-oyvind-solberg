import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = (props) => {
  const spinnerClasses = [classes.Spinner];

  if (props.theme === 'light') {
    spinnerClasses.push(classes[`Spinner--light`]);
  }

  return (
    <div className={classes.SpinnerContainer}>
      <div className={spinnerClasses.join(' ')}></div>
    </div>
  );
};

export default Spinner;
