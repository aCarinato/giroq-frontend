import Link from 'next/link';
// import { event } from '../../lib/google-analytics';
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
    mobileView,
    setMapSelected,
    image,
    setCoordinates,
    coordinates,
    // setCurrentPlaceId,
    // setZoom,
  } = props;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // const handleOnEnter = () => {
  //   if (!mobileView === true) {
  //     setCurrentMarker({ latitude, longitude });
  //   }
  // };

  // const handleOnLeave = () => {
  //   setCurrentMarker({});
  // };

  const handleOnClick = () => {
    if (mobileView === true) {
      setMapSelected(true);
    }
    setCurrentMarker({ latitude, longitude });
    // setCoordinates({ latitude, longitude });
    // console.log(coordinates);
  };

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

      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div className={classes.date}>
            {/* <DateIcon /> */}
            <time>{humanReadableDate}</time>
          </div>
          {mobileView && (
            <div
              className={classes.addressOnMap}
              // onMouseEnter={() => handleOnEnter()}
              // onMouseLeave={() => handleOnLeave()}
              onClick={() => handleOnClick()}
            >
              Mostra nella mappa
            </div>
          )}
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
