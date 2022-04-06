import Link from 'next/link';
import { event } from '../../lib/google-analytics';
// import Image from 'next/image';

// import Button from '../ui/button';
// import DateIcon from '../icons/date-icon';
// import AddressIcon from '../icons/address-icon';
// import ArrowRightIcon from '../icons/arrow-right-icon';

import classes from './event-item.module.css';

function EventItem(props) {
  const {
    title,
    date,
    id,
    setCurrentMarker,
    latitude,
    longitude,
    // viewport,
    // setViewport,
    mobileView,
    setMapSelected,
    image,
    setCoordinates,
    setCurrentPlaceId,
    // setZoom,
  } = props;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleOnEnter = () => {
    if (!mobileView === true) {
      setCurrentMarker({ latitude, longitude });
    }

    // if (!mobileView === true) {
    //   setCoordinates({ lat: latitude, lng: longitude });
    //   setCurrentPlaceId(id);
    //   // setZoom(14);
    // }

    // setViewport({
    //   ...viewport,
    //   zoom: 9,
    //   latitude: latitude,
    //   longitude: longitude,
    // });
  };

  const handleOnLeave = () => {
    setCurrentMarker({});
    // setCurrentPlaceId(null);
  };

  const handleOnClick = () => {
    if (mobileView === true) {
      setMapSelected(true);
      setCurrentMarker({ latitude, longitude });
      // setCoordinates({ lat: latitude, lng: longitude });
      // setCurrentPlaceId(id);
    }
  };

  //   const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/event/${id}`;

  return (
    <li className={classes.item}>
      <div className={classes.contenitore}>
        {image && (
          <div className={classes.verticale}>
            <img src={image.url} alt={title} />
          </div>
        )}
      </div>

      {/* <Image src={image.url} alt={title} width={250} height={160} /> */}
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          {/* <p>{bounds.ne.lat}</p>
          <p>{bounds.ne.lng}</p>
          <p>{bounds.sw.lat}</p>
          <p>{bounds.sw.lng}</p>
          <p>{latitude}</p>
          <p>{longitude}</p> */}
          <div className={classes.date}>
            {/* <DateIcon /> */}
            <time>{humanReadableDate}</time>
          </div>
          {/* <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div> */}
          <div
            className={classes.addressOnMap}
            // onMouseEnter={() => setCurrentMarker(id)}
            onMouseEnter={() => handleOnEnter()}
            onMouseLeave={() => handleOnLeave()}
            onClick={() => handleOnClick()}
          >
            Mostra nella mappa
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>
            <a target="_blank">
              <button className={classes.btnDetails}>Dettagli</button>
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
