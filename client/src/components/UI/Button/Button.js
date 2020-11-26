import React from 'react';

import classes from './Button.module.scss';
import Icon from '../Icon/Icon';
import Paragraph from '../../typography/Paragraph/Paragraph';

const Button = (props) => {
  const buttonClasses = [classes.Button];

  if (props.fitContent) {
    buttonClasses.push(classes['Button--fitContent']);
  }

  if (props.center) {
    buttonClasses.push(classes['Button--center']);
  }

  if (props.uppercase) {
    buttonClasses.push(classes['Button--uppercase']);
  }

  if (props.light) {
    buttonClasses.push(classes['Button--light']);
    buttonClasses.push(classes['Button__Link--light']);
  }

  const icon = props.icon ? <Icon icon={props.icon} /> : null;
  const content = (
    <p className={classes.Button__Text}>
      {icon}
      {props.children}
    </p>
  );

  if (props.link) {
    return (
      <>
        <a
          className={[...buttonClasses, classes.Button__Link].join(' ')}
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </>
    );
  } else if (props.internLink) {
    return (
      <>
        <a
          className={[...buttonClasses, classes.Button__Link].join(' ')}
          href={props.internLink}
        >
          {content}
        </a>
      </>
    );
  } else if (props.submit) {
    return (
      <>
        <button
          className={buttonClasses.join(' ')}
          onClick={props.onClick}
          disabled={props.disabled}
          type="submit"
        >
          {content}
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          className={buttonClasses.join(' ')}
          onClick={props.onClick}
          disabled={props.disabled}
          type="button"
        >
          {content}
        </button>
      </>
    );
  }
};

export default Button;
