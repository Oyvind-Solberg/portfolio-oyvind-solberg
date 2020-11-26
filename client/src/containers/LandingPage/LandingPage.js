import React, { useEffect } from 'react';
import { useStore } from '../../store/store';

import Layout from '../../components/Layout/Layout';
import Portfolio from '../../components/Portfolio/Portfolio';
import About from '../../components/About/About';

const LandingPage = (props) => {
  const { user, sections } = useStore()[0];
  const asyncDispatch = useStore(false)[1];

  // Get user and section data
  useEffect(() => {
    if (!user) {
      asyncDispatch('GET_USER');
    }

    if (!sections) {
      asyncDispatch('GET_SECTIONS');
    }
  }, []);

  let content;

  if (user) {
    content = (
      <Layout showcase user={user} sections={sections}>
        <About user={user} />
        <Portfolio sections={sections} />
      </Layout>
    );
  }

  return <>{user && sections ? content : null}</>;
};

export default LandingPage;
