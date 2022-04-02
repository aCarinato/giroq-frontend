import GoogleMapReact from 'google-map-react';
import classes from './map.module.css';

function Map() {
  const coordinates = { lat: 45, lng: 11.5 };
  return (
    <div className={classes.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDCcIebhgyEdQTd9DB6KK_ePVXNCNk1G6k' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[0, 0, 0, 0]}
        options={''}
        onChange={''}
        onChildClick={''}
      ></GoogleMapReact>
    </div>
  );
}

export default Map;
