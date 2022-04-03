import GoogleMapReact from 'google-map-react';
import classes from './map.module.css';

function Map({ bounds, coordinates, setBounds, setCoordinates }) {
  //   const coordinates = { lat: 45, lng: 11.5 };
  return (
    <div className={classes.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDCcIebhgyEdQTd9DB6KK_ePVXNCNk1G6k' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={8}
        margin={[0, 0, 0, 0]}
        options={''}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          console.log('These are the bounds:');
          console.log(bounds);
        }}
        onChildClick={''}
      ></GoogleMapReact>
    </div>
  );
}

export default Map;
