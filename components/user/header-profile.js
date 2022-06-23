import classes from './header-profile.module.css';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

function HeaderProfile() {
  const router = useRouter();
  return (
    <div className={classes.container}>
      <div
        className={classes.row}
        onClick={() => router.push('/profilo/impostazioni')}
      >
        <div></div>
        <div>
          <span className={classes.underlined}>Impostazioni</span>{' '}
          <Icon icon="ci:settings-filled" />
        </div>
      </div>
      <br></br>
      <div className={classes.row}>
        <h2 className={classes.title}>Gli eventi per te!</h2>
      </div>
      <br></br>
    </div>
  );
}

export default HeaderProfile;
