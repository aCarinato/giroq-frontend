import Link from 'next/link';
import classes from './main.header.module.css';
import Image from 'next/image';
// import Link from 'next/link';
import { Icon } from '@iconify/react';

// CUSTOM COMPONENTS
import BtnLightCTA from '../UI/BtnLightCTA';
import BtnDarkCTA from '../UI/BtnDarkCTA';

import * as ga from '../../lib/google-analytics';

import { useMainContext } from '../../context/Context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MainHeader() {
  const { authState } = useMainContext();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authState !== null && authState.username !== '') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authState]);

  const goToProfile = () => {
    router.push('/profilo');
  };

  const goToRegister = () => {
    router.push('/user-login');
  };

  const clickOnPostEvent = () => {
    window.open('https://www.giroq.com/posta-evento');
    // console.log('posteoo');

    //

    ga.event({
      action: 'Click posta il tuo evento - Mobile',
      category: '',
      label: '',
      value: '9',
    });
  };

  return (
    <header className={classes.header}>
      <div className={classes.CTAcontainer}>
        {isLoggedIn ? (
          <div className={classes.cta} onClick={goToProfile}>
            <Icon icon="healthicons:ui-user-profile" /> {authState.username}
          </div>
        ) : (
          <div className={classes.cta}>
            <BtnDarkCTA
              type="button"
              label="Gli eventi per te"
              onCLickAction={goToRegister}
            />
          </div>
        )}
        <div className={classes.cta}>
          <BtnLightCTA
            type="button"
            label="Posta il tuo evento"
            onCLickAction={clickOnPostEvent}
          />
        </div>
      </div>
      <div className={classes.logo}>
        <Link href="/">
          <img src="/BRAND-giroQ.svg" alt="giroQ" />
        </Link>
      </div>
    </header>
  );
}

export default MainHeader;
