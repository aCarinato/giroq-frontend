import classes from './Wrapper5095.module.css';

function Wrapper5095({ children, shadow = true }) {
  if (shadow) {
    return <div className={classes['container-shadowed']}>{children}</div>;
  } else {
    return <div className={classes.container}>{children}</div>;
  }
}

export default Wrapper5095;
