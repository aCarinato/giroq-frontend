import { Room } from '@material-ui/icons';
import Link from 'next/link';
import classes from './MarkerTypeB.module.css';

function MarkerTypeB(props) {
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
      // className="location-icon"
      // onMouseLeave={onMouseLeave}
      onMouseEnter={() => handleOnEnter(id)}
      onMouseLeave={() => setCurrentPlaceId(null)}
      onClick={() => handleClick()}
    >
      {mobileView ? (
        <Room className={classes.room} key={key} lat={lat} lng={lng} />
      ) : (
        <Link href={`/event/${id}`}>
          <a target="_blank">
            <Room className={classes.room} key={key} lat={lat} lng={lng} />
          </a>
        </Link>
      )}
    </div>
  );
}

export default MarkerTypeB;
