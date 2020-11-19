import React from 'react';

import classes from './Portfolio.module.scss';
import ProjectCard from './ProjectCard/ProjectCard';
import Heading from '../typography/Heading/Heading';
import Container from '../Layout/Container/Container';

const Portfolio = (props) => {
  const content = props.sections.map((section) => {
    const filteredProjects = section.projects.filter(
      (project) => project.published
    );

    // Only for testing purpose
    // for (let i = 0; i < 4; i++) {
    //   filteredProjects.push(filteredProjects[0]);
    // }

    const projects = filteredProjects.map((project) => {
      return <ProjectCard project={project} key={project._id} />;
    });

    if (projects.length === 0) return null;

    return (
      <li key={section._id} className={classes.Portfolio__Section}>
        <Heading type="Tertiary" theme="dark" noBorder center filled>
          {section.name}
        </Heading>
        <div className={classes.Portfolio__Projects}>{projects}</div>
      </li>
    );
  });

  return (
    <Container color="light">
      <div id="portfolio" className={classes.Portfolio}>
        <Heading type="Secondary" theme="dark" noBorder center uppercase>
          Prosjekter
        </Heading>
        <ul>{content}</ul>
      </div>
    </Container>
  );
};

export default Portfolio;
