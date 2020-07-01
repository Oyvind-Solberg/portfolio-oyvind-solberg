import React from 'react';

import classes from './Footer.module.scss';

const Footer = (props) => {
  return <footer className={classes.Footer}>{props.children}</footer>;
};

export default Footer;
