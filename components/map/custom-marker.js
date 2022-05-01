import classes from './custom-marker.module.css';
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
    mobileView,
    category,
    zoom,
    // currentPlaceId,
  } = props;

  const [imgSrc, setImgSrc] = useState('');

  const { selectedEvent, setSetSelectedEvent } = useMainContext();

  useEffect(() => {
    if (category < 5) {
      setImgSrc(`/markers/icon-${category}.svg`);
    }

    if (category > 4 && category < 13) {
      // setColorCategory(2);
      setImgSrc(`/markers/icon-${category}.svg`);
    }

    if (category > 12 && category < 20) {
      // setColorCategory(3);
      setImgSrc(`/markers/icon-${category}.svg`);
    }

    if (category > 19) {
      // setColorCategory(4);
      // setImgSrc('/markers/icon-cyan.svg');
      setImgSrc(`/markers/icon-${category}.svg`);
    }
  }, []);

  // const iconSet = [
  //   'bxs:party',
  //   'fluent:food-pizza-20-filled',
  //   'mdi:fruit-grapes',
  //   'ic:baseline-restaurant',
  //   'ant-design:sound-filled',
  //   'bi:file-music-fill',
  //   'clarity:eye-show-solid',
  //   'map:art-gallery',
  //   'ic:baseline-theater-comedy',
  //   'mdi:human-female-dance',
  //   'bxs:camera-movie',
  //   'raphael:books',
  //   'mdi:school',
  //   'iconoir:trekking',
  //   'bx:cycling',
  //   'ic:baseline-explore',
  //   'bx:water',
  //   'akar-icons:air',
  //   'bxs:medal',
  //   'ri:motorbike-fill',
  //   'fa-solid:exchange-alt',
  //   'bi:currency-exchange',
  //   'fa-solid:person-booth',
  //   'eva:shopping-cart-fill',
  //   'bxs:shopping-bags',
  // ];

  // const colorSet = [
  //   '#ff6b6b',
  //   '#ff6b6b',
  //   '#ff6b6b',
  //   '#ff6b6b',
  //   '#ff6b6b',
  //   '#1a535c',
  //   '#1a535c',
  //   '#1a535c',
  //   '#1a535c',
  //   '#1a535c',
  //   '#1a535c',
  //   '#1a535c',
  //   '#1a535c',
  //   '#ffd100',
  //   '#ffd100',
  //   '#ffd100',
  //   '#ffd100',
  //   '#ffd100',
  //   '#ffd100',
  //   '#ffd100',
  //   '#4ecdc4',
  //   '#4ecdc4',
  //   '#4ecdc4',
  //   '#4ecdc4',
  //   '#4ecdc4',
  // ];

  // const iconClassName = `classes.markerIcon${String(category)}`;

  const handleOnEnter = (id) => {
    if (!mobileView === true) {
      setCurrentPlaceId(id);
    }
  };

  const handleClick = (id) => {
    if (mobileView === true) {
      setCurrentPlaceId(id);
      // console.log('clicked on marker');
      // console.log(id);
      // console.log(currentPlaceId);

      setSetSelectedEvent(id);
      // console.log(selectedEvent);
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
          width: `${Math.pow(zoom, 2.7) * 0.0015}rem`,
          height: `${Math.pow(zoom, 2.7) * 0.0015}rem`,
        }}
        className={classes.markerIcon}
        // src={`/markers/${category}.svg`}

        src={imgSrc}
      />
      {/* <Icon
        icon={iconSet[category]}
        style={{
          width: `${Math.pow(zoom, 2.8) * 0.0015}rem`,
          height: `${Math.pow(zoom, 2.8) * 0.0015}rem`,
          color: `${colorSet[category]}`,
        }}

      /> */}
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
