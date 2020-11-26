import React from 'react';
import classes from './DataBar.module.scss';

const DataBar = (props) => {
  return (
    <div className={classes.Bar}>
      <div className={classes.Bar__Title}>{props.title}</div>
      <div className={classes.Bar__ProgressGroup}>
        <div
          style={{ width: props.percent + '%' }}
          className={classes.Bar__Progress}
        ></div>
        <div className={classes.Bar__ProgressNumber}>{props.percent}%</div>
      </div>
    </div>
  );
};

export default DataBar;
