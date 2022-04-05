import { AcUnit } from '@material-ui/icons';
import Link from 'next/link';
import classes from './MarkerTypeA.module.css';

function MarkerTypeA(props) {
  const { key, lat, lng, id, setCurrentPlaceId, mobileView } = props;

  const handleOnEnter = (id) => {
    // if (mobileView === true) {
    //   setMapSelected(true);
    // }
    if (!mobileView === true) {
      setCurrentPlaceId(id);
    }
  };

  const handleClick = () => {
    if (mobileView === true) {
      setCurrentPlaceId(id);
    }
  };

  return (
    <div
      className="location-icon"
      // onMouseEnter={() => setCurrentPlaceId(id)}
      onMouseEnter={() => handleOnEnter(id)}
      onMouseLeave={() => setCurrentPlaceId(null)}
      onClick={() => handleClick()}
    >
      {mobileView ? (
        <AcUnit className={classes.acunit} key={key} lat={lat} lng={lng} />
      ) : (
        <Link href={`/event/${id}`}>
          <a target="_blank">
            <AcUnit className={classes.acunit} key={key} lat={lat} lng={lng} />
          </a>
        </Link>
      )}
    </div>
  );
}

export default MarkerTypeA;
