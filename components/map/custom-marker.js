import classes from './custom-marker.module.css';
import * as ga from '../../lib/google-analytics';
// import { Icon } from '@iconify/react';
// import categoriesList from '../../data/categories-list';
import { useEffect, useState } from 'react';

import { useMainContext } from '../../context/Context';

function CustomMarker(props) {
  const {
    id,
    title,
    setCurrentPlaceId,
    currentPlaceId,
    // mobileView,
    category,
    zoom,
    // currentPlaceId,
  } = props;

  const [imgSrc, setImgSrc] = useState('');

  const { mobileView, selectedEvent, setSetSelectedEvent } = useMainContext();

  useEffect(() => {
    setImgSrc(`/markers/icon-${category}.svg`);
    // if (category < 5) {
    //   setImgSrc(`/markers/icon-${category}.svg`);
    // }

    // if (category > 4 && category < 13) {
    //   // setColorCategory(2);
    //   setImgSrc(`/markers/icon-${category}.svg`);
    // }

    // if (category > 12 && category < 20) {
    //   // setColorCategory(3);
    //   setImgSrc(`/markers/icon-${category}.svg`);
    // }

    // if (category > 19) {
    //   // setColorCategory(4);
    //   // setImgSrc('/markers/icon-cyan.svg');
    //   setImgSrc(`/markers/icon-${category}.svg`);
    // }
  }, []);

  // const iconClassName = `classes.markerIcon${String(category)}`;

  const handleOnEnter = (id) => {
    if (!mobileView === true) {
      setCurrentPlaceId(id);

      ga.event({
        action: 'Map',
        category: 'Mouse sul marker (desktop)',
        label: '',
        value: '9',
      });
    }
  };

  const handleClick = (id) => {
    if (mobileView === true) {
      setCurrentPlaceId(id);
      setSetSelectedEvent(id);

      ga.event({
        action: 'Map',
        category: 'Click sul marker (mobile)',
        label: '',
        value: '9',
      });
    }
  };
  return (
    <div
      className={classes.icon}
      onMouseEnter={() => handleOnEnter(id)}
      onMouseLeave={() => setCurrentPlaceId(null)}
      onClick={() => handleClick(id)}
    >
      {/* {title} */}
      <img
        style={{
          width: `${Math.pow(zoom, 2.7) * 0.0005 + 1}rem`,
          height: `${Math.pow(zoom, 2.7) * 0.0005 + 1}rem`,
          // width: `${Math.pow(zoom, 2.7) * 0.0015}rem`,
          // height: `${Math.pow(zoom, 2.7) * 0.0015}rem`,
        }}
        className={classes.markerIcon}
        // src={`/markers/${category}.svg`}

        src={imgSrc}
      />
      {/* {!mobileView ? (
        <div>CustomMarker</div>
      ) : (
        <Link href={`/event/${id}`}>
          <a target="_blank">CustomMarker</a>
        </Link>
      )} */}
    </div>
  );
}

export default CustomMarker;
