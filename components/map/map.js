import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import classes from './map.module.css';

import Link from 'next/link';

import MarkerTypeA from './MarkerTypeA';
import MarkerTypeB from './MarkerTypeB';
import Popup from './popup';
import { useRef, useEffect } from 'react';

// const AnyReactComponent = ({ text }) => <div>Porca {text}</div>;

function Map({
  mapHeight,
  bounds,
  coordinates,
  zoom,
  setBounds,
  setCoordinates,
  setZoom,
  events,
  typeACheck,
  typeBCheck,
  currentPlaceId,
  setCurrentPlaceId,
  mobileView,
  currentMarker,
}) {
  //   const coordinates = { lat: 45, lng: 11.5 };

  // const handleMouseEnter = (id) => {
  //   console.log(id);
  // };

  const mapRef = useRef();

  const points = events.map((event) => ({
    type: 'Feature',
    properties: { cluster: false, eventId: event._id, category: event.type },
    geometry: {
      type: 'Point',
      coordinates: [event.long, event.lat],
    },
  }));

  // CLUSTERS
  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  // console.log('THEEE CLUSTEERSSS:');
  // console.log(clusters);

  useEffect(() => {
    if (currentMarker !== {}) {
      let lat = currentMarker.latitude;
      let lng = currentMarker.longitude;
      // mapRef.current.panTo({ lat, lng });
      // mapRef.current.setZoom(15);

      setCoordinates({ lat, lng });
      setZoom(15);
    }
  }, [currentMarker]);

  return (
    <div style={{ height: mapHeight }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDCcIebhgyEdQTd9DB6KK_ePVXNCNk1G6k' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={zoom}
        zoom={zoom}
        margin={[0, 0, 0, 0]}
        options={''}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          setZoom(e.zoom);
          // console.log(e);
          // console.log('These are the bounds from the map component:');
          // console.log(bounds);
        }}
        onClick={() => setCurrentPlaceId(null)}
        onDrag={() => setCurrentPlaceId(null)}
        // onChildClick={''}
      >
        {events.map((event) => {
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
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
