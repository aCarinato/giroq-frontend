import classes from './loader-list.module.css';

function LoaderList(props) {
  return (
    <div className={classes.colList}>
      <div className={classes.loaderContainer}>
        <div className={classes.loader}></div>
      </div>
    </div>
  );
}

export default LoaderList;
