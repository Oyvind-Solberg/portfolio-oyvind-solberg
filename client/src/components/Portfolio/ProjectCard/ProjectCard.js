import React from 'react';

import classes from './ProjectCard.module.scss';
import Button from '../../UI/Button/Button';
import Paragraph from '../../typography/Paragraph/Paragraph';

const ProjectCard = (props) => {
  const website = (
    <>
      <Button link={props.project.website} icon="globe">
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
      <div className={classes.Card__TextArea}>
        <div className={classes.Card__Title}>
          <h4>{props.project.name}</h4>
        </div>
        <div className={classes.Card__Content}>
          <Paragraph>{props.project.description}</Paragraph>
          <div className={classes.Card__Buttons}>
            {props.project.code ? website : null}
            <Button link={props.project.code} icon="code">
              Kode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
