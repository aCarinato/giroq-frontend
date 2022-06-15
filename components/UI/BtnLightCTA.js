import classes from './BtnLightCTA.module.css';

function BtnLightCTA(props) {
  const { type, label, onCLickAction } = props;
  return (
    <button type={type} className={classes.btn} onClick={onCLickAction}>
      {label}
    </button>
  );
}

export default BtnLightCTA;
