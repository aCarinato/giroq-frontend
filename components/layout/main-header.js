import Link from 'next/link';
import classes from './main.header.module.css';
import Image from 'next/image';

function MainHeader() {
  return (
    <header className={classes.header}>
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
