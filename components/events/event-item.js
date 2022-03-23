import Link from 'next/link';
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
    viewport,
    setViewport,
    mobileView,
    setMapSelected,
    image,
  } = props;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleOnEnter = (id, latitude, longitude) => {
    setCurrentMarker(id);
    if (mobileView === true) {
      setMapSelected(true);
    }
    setViewport({
      ...viewport,
      zoom: 9,
      latitude: latitude,
      longitude: longitude,
    });
  };

  //   const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/event/${id}`;

  return (
    <li className={classes.item}>
      <img src={image.url} alt={title} />
      {/* <Image src={image.url} alt={title} width={250} height={160} /> */}
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
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
            onMouseEnter={() => handleOnEnter(id, latitude, longitude)}
            onMouseLeave={() => setCurrentMarker(null)}
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
