import React from 'react';

import classes from './Showcase.module.scss';
import Image from '../UI/Image/Image';
import Button from '../UI/Button/Button';
import Heading from '../typography/Heading/Heading';
import Spinner from '../UI/Spinner/Spinner';

const Showcase = (props) => {
  return props.user ? (
    <>
      <div className={classes.Showcase}>
        <div className={classes.Showcase__TextContent}>
          <span className={classes.Showcase__Text}>
            Hei, mitt navn er{' '}
            <h1
              className={[
                classes.Showcase__Text,
                classes['Showcase__Text--Name'],
              ].join(' ')}
            >
              {props.user.name}.
            </h1>
          </span>
          <p className={classes.Showcase__Text}>
            Eg er ein front end utviklar.
          </p>
        </div>
        <Button internLink="#about" fitContent="true" light>
          Meir om meg
        </Button>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Showcase;
