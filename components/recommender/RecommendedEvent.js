import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classes from './RecommendedEvent.module.css';

import * as ga from '../../lib/google-analytics';

import { Icon } from '@iconify/react';

import categoriesList from '../../data/categories-list';
import { useRouter } from 'next/router';

function RecommendedEvent(props) {
  const {
    id,
    title,
    category,
    startDate,
    endDate,
    startTime,
    endTime,
    image,
    city,
  } = props;

  const exploreLink = `/event/${id}`;

  const router = useRouter();

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

  const handleClick = () => {
    ga.event({
      action: 'Recommended event - Click',
      category: '',
      label: '',
      value: '9',
    });
    router.push(exploreLink);
  };

  return (
    <div className={classes.item} onClick={handleClick}>
      <div className={classes.imgContainer}>
        {/* <Link href={exploreLink}>
          <a> */}
        {image && <img className={classes.image} src={image.url} alt={title} />}
        {/* </a>
        </Link> */}
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
      {/* {mobileView && (
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
      )} */}

      <div className={classes.foot}></div>
    </div>
  );
}

export default RecommendedEvent;
