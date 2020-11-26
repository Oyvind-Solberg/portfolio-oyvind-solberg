import React from 'react';

import classes from './Portfolio.module.scss';
import ProjectCard from './ProjectCard/ProjectCard';
import Heading from '../typography/Heading/Heading';
import Container from '../Layout/Container/Container';
import VideoCard from '../Portfolio/VideoCard/VideoCard';

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

  const animasjonContent = (
    <li className={classes.Portfolio__Section}>
      <Heading type="Tertiary" theme="dark" noBorder center filled>
        3D Design/Animasjon
      </Heading>
      <div className={classes.Portfolio__VideoProjects}>
        <VideoCard
          videoLink="https://www.youtube.com/embed/Q-vSYjaZdrE"
          buttonLink="https://firebasestorage.googleapis.com/v0/b/portfolio-oyvind-solberg.appspot.com/o/Portfolio%20Design%20%C3%98yvind%20Solberg.pdf?alt=media&token=dba8a446-9c87-4f36-8987-e6fcd6511032"
          title="Showreel 2019"
          description="3D Studio Max/After Effects"
        >
          Portfolio Design/Animasjon
        </VideoCard>
      </div>
    </li>
  );

  return (
    <Container color="light">
      <div id="portfolio" className={classes.Portfolio}>
        <Heading type="Secondary" theme="dark" noBorder center uppercase>
          Prosjekter
        </Heading>
        <ul>
          {content}
          {animasjonContent}
        </ul>
      </div>
    </Container>
  );
};

export default Portfolio;
