import classes from './loader-map.module.css';

function LoaderMap(props) {
  const { mapHeight } = props;
  return (
    <div className={classes.colMap} style={{ height: mapHeight }}>
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default LoaderMap;
