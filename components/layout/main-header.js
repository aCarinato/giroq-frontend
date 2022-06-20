import Link from 'next/link';
import classes from './main.header.module.css';
import Image from 'next/image';
// import Link from 'next/link';
import { Icon } from '@iconify/react';
import * as ga from '../../lib/google-analytics';

import { useMainContext } from '../../context/Context';
import { useRouter } from 'next/router';

function MainHeader() {
  const { authState, mobileView } = useMainContext();
  const router = useRouter();

  const goToProfile = () => {
    router.push('/profilo');
  };

  const clickOnPostEvent = () => {
    window.open('https://www.giroq.com/posta-evento');
    // console.log('posteoo');

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
        {authState !== null ? (
          <div onClick={goToProfile}>{authState.username}</div>
        ) : (
          <div>EVENTI PER TE</div>
        )}
        <div>
          <button className={classes.btnPost} onClick={clickOnPostEvent}>
            Posta il tuo Evento{'  '}
            <Icon
              icon="akar-icons:arrow-forward-thick-fill"
              className={classes.icon}
            />
          </button>
        </div>
      </div>

      {/* {mobileView && (
        <div className={classes.btnContainer}>
          <button className={classes.btnPost} onClick={clickOnPostEvent}>
            Posta il tuo Evento{'  '}
            <Icon
              icon="akar-icons:arrow-forward-thick-fill"
              className={classes.icon}
            />
          </button>
        </div>
      )} */}
      <div className={classes.logo}>
        <Link href="/">
          {/* <Image src="/BRAND.png" alt="giroq" width="64" height="64" /> */}
          <img src="/BRAND-giroQ.svg" alt="giroQ" />
        </Link>
      </div>
      {/* <div className={classes.slogan}>
        <Link href="/">cose da fare attorno a te</Link>
      </div> */}
    </header>
  );
}

export default MainHeader;
