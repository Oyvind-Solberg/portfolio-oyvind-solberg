import React from 'react';

import classes from './Image.module.scss';

const Image = (props) => {
  return (
    <>
      <img className={classes.Image} src={props.src} alt={props.alt} />
    </>
  );
};

export default Image;
