import classes from './user-profile.module.css';
import Ribbon from '../recommender/Ribbon';
import BtnLightCTA from '../UI/BtnLightCTA.js';

function UserProfile(props) {
  const { username, events, logoutHandler } = props;
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.textBig}>{username}</div>
        <div>
          <BtnLightCTA
            type="button"
            label="Logout"
            onCLickAction={logoutHandler}
          />
        </div>
      </div>

      <div className={classes.textSmall}>Gli eventi per te:</div>
      <div>
        <Ribbon recommendedEvents={events} />
      </div>
    </div>
  );
}

export default UserProfile;
