import React, { useEffect } from 'react';
import { useStore } from '../../store/store';

import Layout from '../../components/Layout/Layout';
import UserData from './UserData/UserData';
import ProjectData from './ProjectData/ProjectData';
import SectionData from './SectionData/SectionData';
import SkillData from './SkillData/SkillData';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Admin.module.scss';
import Container from '../../components/Layout/Container/Container';

const Admin = (props) => {
  const { user, projects, sections, skills } = useStore()[0];
  const dispatch = useStore(false)[1];
  let content = <Spinner />;

  if (user && projects && sections && skills) {
    content = (
      <div className={classes.Admin}>
        <UserData user={user} />
        <SkillData skills={skills} />
        <ProjectData projects={projects} sections={sections} />
        <SectionData sections={sections} />
      </div>
    );
  }

  // Get data
  useEffect(() => {
    if (!user) {
      dispatch('GET_USER');
    }

    if (!projects) {
      dispatch('GET_PROJECTS');
    }

    if (!sections) {
      dispatch('GET_SECTIONS');
    }

    if (!skills) {
      dispatch('GET_SKILLS');
    }
  }, []);

  return (
    <Layout heading="Admin">
      <Container color="light">{content}</Container>
    </Layout>
  );
};

export default Admin;
