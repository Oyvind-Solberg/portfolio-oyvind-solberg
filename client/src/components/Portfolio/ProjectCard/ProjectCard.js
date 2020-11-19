import React from 'react';

import classes from './ProjectCard.module.scss';
import Button from '../../UI/Button/Button';
import Paragraph from '../../typography/Paragraph/Paragraph';

const ProjectCard = (props) => {
  const website = (
    <>
      <Button uppercase center link={props.project.website}>
        Nettside
      </Button>
    </>
  );

  const styleCard = {
    backgroundImage: `url('${props.project.image}')`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  };

  return (
    <div className={classes.Card} style={styleCard} tabIndex="0">
      <div className={classes.Card__Content}>
        <div className={classes.Card__Text}>
          <h4>{props.project.name}</h4>
          <p className={classes.Card__SubText}>{props.project.description}</p>
        </div>

        <div className={classes.Card__Buttons}>
          {props.project.code ? website : null}
          <Button uppercase center link={props.project.code}>
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
