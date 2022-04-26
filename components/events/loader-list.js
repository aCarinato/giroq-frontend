import classes from './loader-list.module.css';

function LoaderList(props) {
  return (
    <div className={classes.colList}>
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default LoaderList;
