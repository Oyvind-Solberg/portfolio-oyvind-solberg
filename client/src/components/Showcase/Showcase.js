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
        <div className={classes.Showcase__TextArea}>
          <Heading type="Secondary" nonSemantic>
            Portfolio
          </Heading>

          <div>
            <Heading type="Primary">{props.user.name}</Heading>

            <Heading type="Primary" sub nonSemantic>
              {props.user.description}
            </Heading>
          </div>

          <Button link={props.user.cv} icon="file-alt" fitContent="true">
            Last ned CV
          </Button>
        </div>
        <div className={classes.Showcase__Image}>
          <Image showcase src={props.user.image} alt="Øyvind" />
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Showcase;
