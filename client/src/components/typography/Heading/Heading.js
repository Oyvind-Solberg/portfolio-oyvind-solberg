import React from 'react';

import classes from './Heading.module.scss';

const Heading = (props) => {
  const headingClasses = [classes[`Heading${props.type}`]];

  if (props.theme === 'light') {
    headingClasses.push(classes[`Heading${props.type}--light`]);
  }

  if (props.type === 'Primary' && props.sub) {
    headingClasses.push(classes['HeadingPrimary--sub']);
  } else if (props.type === 'Primary') {
    headingClasses.push(classes['HeadingPrimary--main']);
  }

  if (props.type === 'Secondary' || props.type === 'Tertiary') {
    if (props.noBorder) {
      headingClasses.push(classes[`Heading${props.type}--noBorder`]);
    }

    if (props.center) {
      headingClasses.push(classes[`Heading${props.type}--center`]);
    }
  }

  if (!props.nonSemantic) {
    switch (props.type) {
      case 'Primary':
        return <h1 className={headingClasses.join(' ')}>{props.children}</h1>;
      case 'Secondary':
        return <h2 className={headingClasses.join(' ')}>{props.children}</h2>;
      case 'Tertiary':
        return <h3 className={headingClasses.join(' ')}>{props.children}</h3>;
      default:
        return <h1 className={headingClasses.join(' ')}>{props.children}</h1>;
    }
  }

  return <p className={headingClasses.join(' ')}>{props.children}</p>;
};

export default Heading;
