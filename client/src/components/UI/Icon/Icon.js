import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Icon.module.scss';

const Icon = (props) => {
  return (
    <>
      <span className={classes.Icon}>
        <FontAwesomeIcon icon={props.icon} />
      </span>
    </>
  );
};

export default Icon;
