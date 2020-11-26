import React from 'react';

import classes from './About.module.scss';
import Heading from '../typography/Heading/Heading';
import Paragraph from '../typography/Paragraph/Paragraph';
import Container from '../Layout/Container/Container';
import Image from '../UI/Image/Image';
import DataBar from '../UI/DataBar/DataBar';

const About = (props) => {
  const skills = [
    { group: 'Utvikling', title: 'HTML', percent: 75 },
    { group: 'Utvikling', title: 'CSS', percent: 75 },
    { group: 'Utvikling', title: 'JavaScript', percent: 75 },
    { group: 'Utvikling', title: 'React.js', percent: 60 },
    { group: 'Utvikling', title: 'Firebase', percent: 55 },
    { group: 'Utvikling', title: 'Node.js', percent: 40 },
    { group: 'Utvikling', title: 'MongoDB', percent: 40 },
    { group: 'Design', title: 'Photoshop', percent: 85 },
    { group: 'Design', title: 'AfterEffects', percent: 85 },
    { group: 'Design', title: 'Premiere Pro', percent: 85 },
    { group: 'Design', title: '3D Studio Max', percent: 85 },
  ];

  const createSkillContent = (skills, group) => {
    const filteredSkills = skills.filter((skill) => skill.group === group);

    return filteredSkills.map((skill) => {
      return <DataBar title={skill.title} percent={skill.percent} />;
    });
  };

  const utviklingSkills = createSkillContent(skills, 'Utvikling');
  const designSkills = createSkillContent(skills, 'Design');

  return (
    <Container>
      <div id="about" className={classes.About}>
        <Heading type="Secondary" theme="dark" noBorder center uppercase>
          Om Meg
        </Heading>
        <div className={classes.About__ContentContainer}>
          <div className={classes.About__Content}>
            <div className={classes.About__Image}>
              <Image src={props.user.image} alt="Øyvind" />
            </div>
            <Heading type="Quaternary" center noBorder>
              Kven er eg?
            </Heading>
            <div className={classes.About__Text}>
              <Paragraph>{props.user.description}</Paragraph>
            </div>
          </div>
          <div className={classes.About__Content}>
            {utviklingSkills}
            {designSkills}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
