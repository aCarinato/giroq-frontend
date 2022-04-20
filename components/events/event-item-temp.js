import Link from 'next/link';
import { useEffect, useState } from 'react';
import categoriesList from '../../data/categories-list';

import classes from './event-item-temp.module.css';

function EventItemTemp(props) {
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

  const exploreLink = `/event/${id}`;

  const handleClickDesktop = () => {
    window.open(exploreLink, '_blank');
  };

  const handleOnClick = () => {
    if (mobileView === true) {
      setMapSelected(true);
    }
    setCurrentMarker({ latitude, longitude });
    // setCoordinates({ latitude, longitude });
    // console.log(coordinates);
  };

  return (
    <div className={classes.item}>
      <div className={classes.imgContainer}>
        <Link href={exploreLink}>
          <a target="_blank">
            {image && (
              <img className={classes.image} src={image.url} alt={title} />
            )}
          </a>
        </Link>
      </div>
      <h4 className={classes.title}>{title}</h4>

      <div className={classes.dateTime}>
        <time>{humanReadableDate}</time>
      </div>

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
      {mobileView && (
        <>
          <div className={classes.addressOnMap} onClick={() => handleOnClick()}>
            Mostra nella mappa
          </div>
          <div className={classes.actions}>
            <Link href={exploreLink}>
              <a target="_blank">
                <button className={classes.btnDetails}>Dettagli</button>
              </a>
            </Link>
          </div>
        </>
      )}

      <div className={classes.foot}></div>

      {/* <div className={classes.content}>
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
            <time>{humanReadableDate}</time>
          </div>
          {mobileView && (
            <div
              className={classes.addressOnMap}
              onClick={() => handleOnClick()}
            >
              Mostra nella mappa
            </div>
          )}
        </div> */}
      {/* <div className={classes.actions}>
          <Link href={exploreLink}>
            <a target="_blank">
              <button className={classes.btnDetails}>Dettagli</button>
            </a>
          </Link>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default EventItemTemp;
