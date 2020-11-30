import React, { useEffect } from 'react';
import { useStore } from '../../store/store';

import Layout from '../../components/Layout/Layout';
import Portfolio from '../../components/Portfolio/Portfolio';
import About from '../../components/About/About';

const LandingPage = (props) => {
  const { user, sections, skills } = useStore()[0];
  const asyncDispatch = useStore(false)[1];

  // Get user and section data
  useEffect(() => {
    if (!user) {
      asyncDispatch('GET_USER');
    }

    if (!sections) {
      asyncDispatch('GET_SECTIONS');
    }

    if (!skills) {
      asyncDispatch('GET_SKILLS');
    }
  }, []);

  let content;

  if (user) {
    content = (
      <Layout showcase user={user} sections={sections}>
        <About user={user} skills={skills} />
        <Portfolio sections={sections} />
      </Layout>
    );
  }

  return <>{user && sections ? content : null}</>;
};

export default LandingPage;
