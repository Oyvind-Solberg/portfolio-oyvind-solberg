import React from 'react';

import classes from './VideoCard.module.scss';
import Button from '../../UI/Button/Button';

const VideoCard = (props) => {
  return (
    <div tabIndex="0" className={classes.Card}>
      <div className={classes.Card__VideoContainer}>
        <iframe
          title="Showreel 2019"
          className={classes.Card__Video}
          width="100%"
          height="100%"
          src={props.videoLink}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
      <div className={classes.Card__Text}>
        <h4>{props.title}</h4>
        <p className={classes.Card__SubText}>{props.description}</p>
        <div className={classes.Card__Button}>
          <Button fitContent uppercase center link={props.buttonLink}>
            {props.children}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
