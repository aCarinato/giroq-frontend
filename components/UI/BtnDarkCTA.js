import classes from './BtnDarkCTA.module.css';

function BtnDarkCTA(props) {
  const { type, label, onCLickAction } = props;

  return (
    <button type={type} className={classes.btn} onClick={onCLickAction}>
      {label}
    </button>
  );
}

export default BtnDarkCTA;
