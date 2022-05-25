import classes from './Ribbon.module.css';

function Ribbon(props) {
  const { name } = props;
  return <div className={classes.container}>{name}</div>;
}

export default Ribbon;
