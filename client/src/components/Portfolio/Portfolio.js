import React from 'react';

import classes from './Portfolio.module.scss';
import ProjectCard from './ProjectCard/ProjectCard';
import Heading from '../typography/Heading/Heading';

const Portfolio = (props) => {
  const content = props.sections.map((section) => {
    const filteredProjects = section.projects.filter(
      (project) => project.published
    );

    const projects = filteredProjects.map((project) => {
      return <ProjectCard project={project} key={project._id} />;
    });

    if (projects.length === 0) return null;

    return (
      <li key={section._id} className={classes.Portfolio__Section}>
        <Heading type="Tertiary" theme="light">
          {section.name}
        </Heading>
        <div className={classes.Portfolio__Projects}>{projects}</div>
      </li>
    );
  });

  return (
    <div className={classes.Portfolio}>
      <Heading type="Secondary" theme="light" noBorder center>
        Prosjekter
      </Heading>
      <ul>{content}</ul>
    </div>
  );
};

export default Portfolio;
