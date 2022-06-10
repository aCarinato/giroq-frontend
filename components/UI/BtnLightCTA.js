import classes from './BtnLightCTA.module.css';

function BtnLightCTA(props) {
  const { label, onCLickAction } = props;
  return (
    <button className={classes.btn} onClick={onCLickAction}>
      {label}
    </button>
  );
}

export default BtnLightCTA;
