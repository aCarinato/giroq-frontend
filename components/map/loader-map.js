import classes from './loader-map.module.css';

function LoaderMap(props) {
  const { mapHeight } = props;
  return (
    <div className={classes.colMap} style={{ height: mapHeight }}>
      <div className={classes.loaderContainer}>
        <div className={classes.loader}></div>
      </div>
    </div>
  );
}

export default LoaderMap;
