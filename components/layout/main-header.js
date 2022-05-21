import Link from 'next/link';
import classes from './main.header.module.css';
import Image from 'next/image';
// import Link from 'next/link';
import { Icon } from '@iconify/react';
import * as ga from '../../lib/google-analytics';

import { useMainContext } from '../../context/Context';

function MainHeader() {
  const { mobileView } = useMainContext();

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
      {mobileView && (
        <div className={classes.btnContainer}>
          {/* <Link href="/posta-evento">
          <a target="_blank"> */}
          <button className={classes.btnPost} onClick={clickOnPostEvent}>
            Posta il tuo Evento{'  '}
            <Icon icon="akar-icons:arrow-forward-thick-fill" />
          </button>
          {/* </a>
        </Link> */}
        </div>
      )}
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
