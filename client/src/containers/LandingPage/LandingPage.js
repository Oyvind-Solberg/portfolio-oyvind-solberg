import React, { useEffect } from 'react';
import { useStore } from '../../store/store';

import Layout from '../../components/Layout/Layout';
import Portfolio from '../../components/Portfolio/Portfolio';

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
  }, [user, sections, asyncDispatch]);

  let content;

  if (user) {
    content = (
      <Layout showcase user={user} sections={sections}>
        <Portfolio sections={sections} />
      </Layout>
    );
  }

  return <>{user && sections ? content : null}</>;
};

export default LandingPage;
