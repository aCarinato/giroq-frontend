import classes from './color-bar.module.css';

function ColorBar() {
  return (
    <div className={classes.bar}>
      <div className={classes.color1}></div>
      <div className={classes.color2}></div>
      <div className={classes.color3}></div>
      <div className={classes.color4}></div>
    </div>
  );
}

export default ColorBar;
