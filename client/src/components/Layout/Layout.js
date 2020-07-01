import React from 'react';
import { useStore } from '../../store/store';

import classes from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Link from '../UI/Link/Link';
import Spinner from '../UI/Spinner/Spinner';

const Layout = (props) => {
  const { user, isLoggedIn } = useStore()[0];

  let footerContent = <Spinner />;

  if (isLoggedIn) {
    footerContent = (
      <Link href="/logg-out" icon="sign-out-alt">
        Logg av
      </Link>
    );
  } else if (user) {
    footerContent = (
      <>
        <Link href={`tel:${user.phone}`} icon="phone">
          <span className={classes.Layout__LinkText}>{user.phone}</span>
          <span
            className={[
              classes.Layout__LinkText,
              classes['Layout__LinkText--alt'],
            ].join(' ')}
          >
            Mobil
          </span>
        </Link>
        <Link href={`mailto:${user.email}`} icon="envelope">
          <span className={classes.Layout__LinkText}>{user.email}</span>
          <span
            className={[
              classes.Layout__LinkText,
              classes['Layout__LinkText--alt'],
            ].join(' ')}
          >
            Epost
          </span>
        </Link>
      </>
    );
  }

  return (
    <>
      <Header showcase={props.showcase} heading={props.heading} user={user} />
      <main className={classes.Main}>{props.children}</main>
      <Footer>{footerContent}</Footer>
    </>
  );
};

export default Layout;
