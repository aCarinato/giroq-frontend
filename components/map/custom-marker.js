import classes from './custom-marker.module.css';
import { Icon } from '@iconify/react';
import categoriesList from '../../data/categories-list';
import { useEffect, useState } from 'react';

function CustomMarker(props) {
  const {
    id,
    title,
    setCurrentPlaceId,
    mobileView,
    category,
    zoom,
    // currentPlaceId,
    // testID,
    // setTestId,
  } = props;

  // const [colorCategory, setColorCategory] = useState(null);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (category < 5) {
      setImgSrc('/markers/icon-red.svg');
    }

    if (category > 4 && category < 13) {
      // setColorCategory(2);
      setImgSrc('/markers/icon-blue.svg');
    }

    if (category > 12 && category < 20) {
      // setColorCategory(3);
      setImgSrc('/markers/icon-yellow.svg');
    }

    if (category > 19) {
      // setColorCategory(4);
      setImgSrc('/markers/icon-cyan.svg');
    }
  }, []);

  const iconSet = [
    'bxs:party',
    'fluent:food-pizza-20-filled',
    'mdi:fruit-grapes',
    'ic:baseline-restaurant',
    'ant-design:sound-filled',
    'bi:file-music-fill',
    'clarity:eye-show-solid',
    'map:art-gallery',
    'ic:baseline-theater-comedy',
    'mdi:human-female-dance',
    'bxs:camera-movie',
    'raphael:books',
    'mdi:school',
    'iconoir:trekking',
    'bx:cycling',
    'ic:baseline-explore',
    'bx:water',
    'akar-icons:air',
    'bxs:medal',
    'ri:motorbike-fill',
    'fa-solid:exchange-alt',
    'bi:currency-exchange',
    'fa-solid:person-booth',
    'eva:shopping-cart-fill',
    'bxs:shopping-bags',
  ];

  const colorSet = [
    '#ff6b6b',
    '#ff6b6b',
    '#ff6b6b',
    '#ff6b6b',
    '#ff6b6b',
    '#1a535c',
    '#1a535c',
    '#1a535c',
    '#1a535c',
    '#1a535c',
    '#1a535c',
    '#1a535c',
    '#1a535c',
    '#ffd100',
    '#ffd100',
    '#ffd100',
    '#ffd100',
    '#ffd100',
    '#ffd100',
    '#ffd100',
    '#4ecdc4',
    '#4ecdc4',
    '#4ecdc4',
    '#4ecdc4',
    '#4ecdc4',
  ];

  // const iconClassName = `classes.markerIcon${String(category)}`;

  const handleOnEnter = (id) => {
    if (!mobileView === true) {
      setCurrentPlaceId(id);
      // console.log(category);
      // console.log(iconClassName);
      // setTestId(id);
      // console.log(`From the custom marker, is this mobile view? ${mobileView}`);
      // console.log(`From the custom marker, id? ${id}`);
      // console.log(`From the custom marker, currentPlaceId? ${currentPlaceId}`);
      // console.log(`From the custom marker, testID? ${testID}`);
    }
  };

  const handleClick = (id) => {
    if (mobileView === true) {
      setCurrentPlaceId(id);
      // setTestId(id);
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
