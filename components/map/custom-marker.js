import classes from './custom-marker.module.css';

function CustomMarker(props) {
  const {
    id,
    title,
    setCurrentPlaceId,
    mobileView,
    category,
    zoom,
    // currentPlaceId,
    // testID,
    // setTestId,
  } = props;
  const handleOnEnter = (id) => {
    if (!mobileView === true) {
      setCurrentPlaceId(id);
      console.log(category);
      // setTestId(id);
      // console.log(`From the custom marker, is this mobile view? ${mobileView}`);
      // console.log(`From the custom marker, id? ${id}`);
      // console.log(`From the custom marker, currentPlaceId? ${currentPlaceId}`);
      // console.log(`From the custom marker, testID? ${testID}`);
    }
  };

  const handleClick = (id) => {
    if (mobileView === true) {
      setCurrentPlaceId(id);
      // setTestId(id);
    }
  };
  return (
    <div
      className={classes.icon}
      onMouseEnter={() => handleOnEnter(id)}
      onMouseLeave={() => setCurrentPlaceId(null)}
      onClick={() => handleClick(id)}
    >
      {/* {title} */}
      <img
        style={{
          width: `${Math.pow(zoom, 3) * 0.0015}rem`,
          height: `${Math.pow(zoom, 3) * 0.0015}rem`,
        }}
        className={classes.markerIcon}
        src={`/markers/${category}.svg`}
      />
      {/* {!mobileView ? (
        <div>CustomMarker</div>
      ) : (
        <Link href={`/event/${id}`}>
          <a target="_blank">CustomMarker</a>
        </Link>
      )} */}
    </div>
  );
}

export default CustomMarker;
