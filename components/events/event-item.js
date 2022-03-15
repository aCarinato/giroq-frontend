import Link from 'next/link';

// import Button from '../ui/button';
// import DateIcon from '../icons/date-icon';
// import AddressIcon from '../icons/address-icon';
// import ArrowRightIcon from '../icons/arrow-right-icon';

import classes from './event-item.module.css';

function EventItem(props) {
  const { title, date, id, setCurrentMarker } = props;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  //   const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/event/${id}`;

  return (
    <li className={classes.item}>
      {/* <img src={'/' + image} alt={title} /> */}
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
            onMouseEnter={() => setCurrentMarker(id)}
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
