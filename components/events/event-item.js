import Link from 'next/link';
import { useEffect, useState } from 'react';
import categoriesList from '../../data/categories-list';

import classes from './event-item.module.css';

function EventItem(props) {
  const {
    title,
    category,
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

  const [colorCategory, setColorCategory] = useState(null);

  useEffect(() => {
    if (category < 5) {
      setColorCategory(1);
    }

    if (category > 4 && category < 13) {
      setColorCategory(2);
    }

    if (category > 12 && category < 20) {
      setColorCategory(3);
    }

    if (category > 19) {
      setColorCategory(4);
    }
  }, []);

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
    <div className={classes.item}>
      <div className={classes.contenitore}>
        {image && (
          <div className={classes.verticale}>
            <img className={classes.imgBox} src={image.url} alt={title} />
          </div>
        )}
      </div>

      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div className={classes.categoryContainer}>
            {colorCategory && colorCategory === 1 && (
              <div className={classes.categoryLabelRed}>
                {categoriesList[category]}
              </div>
            )}
            {colorCategory && colorCategory === 2 && (
              <div className={classes.categoryLabelBlue}>
                {categoriesList[category]}
              </div>
            )}
            {colorCategory && colorCategory === 3 && (
              <div className={classes.categoryLabelYellow}>
                {categoriesList[category]}
              </div>
            )}
            {colorCategory && colorCategory === 4 && (
              <div className={classes.categoryLabelCyan}>
                {categoriesList[category]}
              </div>
            )}
          </div>

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
    </div>
  );
}

export default EventItem;
