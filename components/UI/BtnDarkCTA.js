import classes from './BtnDarkCTA.module.css';

function BtnDarkCTA(props) {
  const { label, onCLickAction } = props;
  return (
    <button className={classes.btn} onClick={onCLickAction}>
      {label}
    </button>
  );
}

export default BtnDarkCTA;
