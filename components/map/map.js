import GoogleMapReact from 'google-map-react';
import classes from './map.module.css';

import Link from 'next/link';

import MarkerTypeA from './MarkerTypeA';
import MarkerTypeB from './MarkerTypeB';
import Popup from './popup';

// const AnyReactComponent = ({ text }) => <div>Porca {text}</div>;

function Map({
  mapHeight,
  bounds,
  coordinates,
  zoom,
  setBounds,
  setCoordinates,
  events,
  typeACheck,
  typeBCheck,
  currentPlaceId,
  setCurrentPlaceId,
  mobileView,
}) {
  //   const coordinates = { lat: 45, lng: 11.5 };

  // const handleMouseEnter = (id) => {
  //   console.log(id);
  // };

  return (
    <div style={{ height: mapHeight }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDCcIebhgyEdQTd9DB6KK_ePVXNCNk1G6k' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={zoom}
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
            if (event._id === currentPlaceId) {
              return (
                <Popup
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  organiser={event.organiser}
                  image={event.image}
                  lat={event.lat}
                  lng={event.long}
                  setCurrentPlaceId={setCurrentPlaceId}
                  mobileView={mobileView}
                />
              );
            }
            if (event.type === 'A' && typeACheck) {
              return (
                <MarkerTypeA
                  key={event._id}
                  lat={event.lat}
                  lng={event.long}
                  id={event._id}
                  setCurrentPlaceId={setCurrentPlaceId}
                  mobileView={mobileView}
                  // onMouseEnter={handleMouseEnter(event._id)}
                  // onMouseLeave={() => setCurrentPlaceId(null)}
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
                  setCurrentPlaceId={setCurrentPlaceId}
                  mobileView={mobileView}
                  // onMouseEnter={handleMouseEnter(event._id)}
                  // onMouseEnter={() => setCurrentPlaceId(event._id)}
                  // onMouseLeave={() => setCurrentPlaceId(null)}
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
