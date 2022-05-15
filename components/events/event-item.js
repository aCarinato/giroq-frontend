import Link from 'next/link';
import { useEffect, useState } from 'react';
import categoriesList from '../../data/categories-list';

import * as ga from '../../lib/google-analytics';

import classes from './event-item.module.css';

import { Icon } from '@iconify/react';

import { useMainContext } from '../../context/Context';

function EventItem(props) {
  const {
    title,
    category,
    startDate,
    endDate,
    startTime,
    endTime,
    id,
    city,
    latitude,
    longitude,
    mobileView,
    setMapSelected,
    image,
    // setCurrentPlaceId,
    // setZoom,
  } = props;
  const { setMapCenter, setZoom } = useMainContext();

  const [colorCategory, setColorCategory] = useState(null);

  const handleClickDetails = () => {
    // window.open(`https://www.giroq.com/posta-evento`);
    // window.open(exploreLink);

    console.log('clikkeee');

    ga.event({
      action: 'Lista eventi',
      category: 'Click bottone dettagli evento',
      label: '',
      value: '9',
    });
  };

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

  const humanReadableStartDate = new Date(startDate).toLocaleDateString(
    'it-IT',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  // if (endDate) {
  const humanReadableEndDate = new Date(endDate).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  // }

  // const handleOnEnter = () => {
  //   if (!mobileView === true) {
  //     setCurrentMarker({ latitude, longitude });
  //   }
  // };

  // const handleOnLeave = () => {
  //   setCurrentMarker({});
  // };

  const exploreLink = `/event/${id}`;

  //   const handleClickDesktop = () => {
  //     window.open(exploreLink, '_blank');
  //   };

  const handleOnClick = () => {
    if (mobileView === true) {
      setMapSelected(true);
      // setSelectedEvent([latitude, longitude]);
    }

    setMapCenter({ lat: latitude, lng: longitude });
    setZoom(18);

    ga.event({
      action: 'Lista eventi',
      category: 'Click mostra nella mappa',
      label: '',
      value: '9',
    });
  };

  return (
    <div className={classes.item}>
      <div className={classes.imgContainer} onClick={handleClickDetails}>
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
        <div className={classes.twoFlexItem}>
          <div className={classes.iconContainer}>
            <Icon icon="ant-design:calendar-outlined" />
          </div>

          {endDate ? (
            <div>
              <div className={classes.dateContainer}>
                Da: <time>{humanReadableStartDate}</time>
              </div>
              <div className={classes.dateContainer}>
                A: <time>{humanReadableEndDate}</time>
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.dateContainer}>
                <time>{humanReadableStartDate}</time>
              </div>
              <div className={classes.trickyText}>AAAA</div>
            </div>
          )}
        </div>

        {startTime && endTime && (
          <div className={classes.twoFlexItem}>
            <div className={classes.iconContainer}>
              <Icon icon="akar-icons:clock" />
            </div>
            <div
              className={classes.dateContainer}
            >{`${startTime}-${endTime}`}</div>
          </div>
        )}
        {startTime && !endTime && (
          <div className={classes.twoFlexItem}>
            <div className={classes.iconContainer}>
              <Icon icon="akar-icons:clock" />
            </div>
            <div className={classes.dateContainer}>{`${startTime}`}</div>
          </div>
        )}
      </div>

      <div className={classes.city}>
        <div className={classes.iconContainer}>
          <Icon icon="maki:town" />
        </div>
        <div className={classes.dateContainer}>{city}</div>
      </div>

      {/* {mobileView && ( */}
      <div className={classes.addressOnMap} onClick={() => handleOnClick()}>
        <div className={classes.iconContainer}>
          <Icon icon="emojione-monotone:world-map" />
        </div>
        <div className={classes.dateContainer}>Mostra nella mappa</div>
      </div>
      {/* )} */}

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
        <div className={classes.actions}>
          <Link href={exploreLink}>
            <a target="_blank">
              <button
                className={classes.btnDetails}
                onClick={handleClickDetails}
              >
                Dettagli
              </button>
            </a>
          </Link>
        </div>
      )}

      <div className={classes.foot}></div>
    </div>
  );
}

export default EventItem;
