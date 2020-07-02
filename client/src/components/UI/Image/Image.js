import React from 'react';

import classes from './Image.module.scss';

const Image = (props) => {
  const imageClasses = [classes.Image];

  if (props.showcase) {
    imageClasses.push(classes['Image--showcase']);
  }

  return (
    <>
      <img className={imageClasses.join(' ')} src={props.src} alt={props.alt} />
    </>
  );
};

export default Image;
