import Link from 'next/link';

// import Button from '../ui/button';
// import DateIcon from '../icons/date-icon';
// import AddressIcon from '../icons/address-icon';
// import ArrowRightIcon from '../icons/arrow-right-icon';

// import classes from './event-item.module.css';

function EventItem(props) {
  const { title, date, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  //   const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/event/${id}`;

  return (
    <li>
      {/* <img src={'/' + image} alt={title} /> */}
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            {/* <DateIcon /> */}
            <time>{humanReadableDate}</time>
          </div>
          {/* <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div> */}
        </div>
        <div>
          <button>
            <Link href={exploreLink}>
              <a target="_blank">Dettagli</a>
            </Link>
          </button>
          {/* <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button> */}
        </div>
      </div>
    </li>
  );
}

export default EventItem;
