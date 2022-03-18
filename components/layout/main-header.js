import Link from 'next/link';
import classes from './main.header.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">giroq</Link>
      </div>
      <div className={classes.slogan}>
        <Link href="/">cose da fare attorno a te</Link>
      </div>
    </header>
  );
}

export default MainHeader;
