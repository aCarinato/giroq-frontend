import classes from './settings-options.module.css';
// OWN COMPONENTS
import BtnLightCTA from '../UI/BtnLightCTA';

function SettingsOptions(props) {
  const { logoutClick, updateclick } = props;

  return (
    <div className={classes.container}>
      <br></br>
      <div>
        <h3>Impostazioni</h3>
      </div>
      <br></br>
      <div className={classes.flexRow}>
        <div>Esci dal tuo account:</div>
        <div>
          <BtnLightCTA
            type="button"
            label="Logout"
            onCLickAction={logoutClick}
          />
        </div>
      </div>
      <br></br>
      <div className={classes.flexRow}>
        <div>Modifica account:</div>
        <div>
          <BtnLightCTA
            type="button"
            label="Modifica"
            onCLickAction={updateclick}
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsOptions;
