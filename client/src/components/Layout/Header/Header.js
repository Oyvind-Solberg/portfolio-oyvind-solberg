import React from 'react';

import classes from './Header.module.scss';
import Heading from '../../typography/Heading/Heading';
import Showcase from '../../Showcase/Showcase';

const Header = (props) => {
  return (
    <header className={classes.Header}>
      {props.showcase ? (
        <Showcase user={props.user} />
      ) : (
        <div className={classes.Header__Heading}>
          <Heading type="Primary">{props.heading}</Heading>
        </div>
      )}
    </header>
  );
};

export default Header;
