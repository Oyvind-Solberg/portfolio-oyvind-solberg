import React from 'react';

import classes from './Paragraph.module.scss';

const Paragraph = (props) => {
  const paragraphClasses = [classes.Paragraph];

  if (props.theme === 'light') {
    paragraphClasses.push(classes[`Paragraph--light`]);
  }

  return <p className={paragraphClasses.join(' ')}>{props.children}</p>;
};

export default Paragraph;
