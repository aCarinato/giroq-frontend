import GoogleMapReact from 'google-map-react';
import classes from './map.module.css';

import Link from 'next/link';

import MarkerTypeA from './MarkerTypeA';
import MarkerTypeB from './MarkerTypeB';

// const AnyReactComponent = ({ text }) => <div>Porca {text}</div>;

function Map({
  bounds,
  coordinates,
  setBounds,
  setCoordinates,
  events,
  typeACheck,
  typeBCheck,
}) {
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
          console.log('These are the bounds from the map component:');
          console.log(bounds);
        }}
        onChildClick={''}
      >
        {/* <AnyReactComponent lat={46} lng={11.5} text="My Marker" /> */}
        {events.map((event) =>
          // (
          //   <Fragment key={event.id}>
          //     {event.type === 'A' && typeACheck && (
          //       <MarkerTypeA
          //         key={event._id}
          //         lat={event.lat}
          //         lng={event.long}
          //         id={event._id}
          //       />
          //     )}
          //   </Fragment>
          // )

          {
            if (event.type === 'A' && typeACheck) {
              return (
                <MarkerTypeA
                  key={event._id}
                  lat={event.lat}
                  lng={event.long}
                  id={event._id}
                />

                // <AcUnit
                //   className={classes.acunit}
                //   key={event._id}
                //   lat={event.lat}
                //   lng={event.long}
                // >
                //   <Link href={`/event/${event._id}`}>
                //     <a target="_blank"></a>
                //   </Link>
                // </AcUnit>
              );
            }
            if (event.type === 'B' && typeBCheck) {
              return (
                <MarkerTypeB
                  key={event._id}
                  lat={event.lat}
                  lng={event.long}
                  id={event._id}
                />
              );
            }
          }
        )}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
