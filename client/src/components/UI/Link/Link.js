import React from 'react';

import classes from './Link.module.scss';
import Icon from '../Icon/Icon';

const Link = (props) => {
  return (
    <>
      <a className={classes.Link} href={props.href}>
        {props.icon ? (
          <span className={classes.Link__Icon}>
            <Icon icon={props.icon} />
          </span>
        ) : null}
        {props.children}
      </a>
    </>
  );
};

export default Link;
