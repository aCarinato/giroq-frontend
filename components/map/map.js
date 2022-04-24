import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import { useRef, useEffect, useState } from 'react';
import CustomMarker from './custom-marker';

import classes from './map.module.css';

import Popup from './popup';

import { useMainContext } from '../../context/Context';

const Marker = ({ children }) => children;

function Map(props) {
  const {
    mapHeight,
    // points,
    // clusters,
    // supercluster,
    coordinates,
    setCoordinates,
    setBounds,
    zoom,
    setZoom,
    categoryCheck,
    currentPlaceId,
    setCurrentPlaceId,
    setCurrentMarker,
    mobileView,
    // currentMarker,
    events,
    bounds,
    isOpen,
    setIsOpen,
    isDateDropdownOpen,
    setIsDateDropdownOpen,
  } = props;
  const mapRef = useRef();

  const { eventsCtx } = useMainContext();

  // const [testID, setTestId] = useState(null);

  const points = eventsCtx.map((event) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      eventId: event._id,
      eventCategory: event.category,
      eventStartDate: event.startDate,
      eventEndDate: event.endDate,
      eventStartTime: event.startTime,
      eventEndTime: event.endTime,
      eventTitle: event.title,
      eventOrganiser: event.organiser,
      eventDescription: event.description,
      eventCity: event.city,
      eventStreet: event.street,
      eventImage: event.image,
      eventLat: event.lat,
      eventLong: event.long,
    },
    geometry: {
      type: 'Point',
      coordinates: [event.long, event.lat],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  // console.log(clusters);

  const handleOnClick = () => {
    // console.log('click');
    setCurrentPlaceId(null);

    if (isOpen) {
      setIsOpen(false);
    }

    if (isDateDropdownOpen) {
      setIsDateDropdownOpen(!isDateDropdownOpen);
    }
  };

  return (
    <div className={classes.colMap} style={{ height: mapHeight }}>
      <GoogleMapReact
        // defaultCenter={coordinates}
        // center={coordinates}
        // defaultZoom={zoom}
        // zoom={zoom}
        // margin={[0, 0, 0, 0]}
        // options={''}
        // yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map }) => {
        //   mapRef.current = map;
        // }}
        // onChange={(e) => {
        //   setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        //   setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        //   setZoom(e.zoom);
        // }}
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        // defaultCenter={{ lat: 45.76, lng: 11.73 }}
        center={coordinates}
        // defaultZoom={10}
        zoom={zoom}
        margin={[0, 0, 0, 0]}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          console.log(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
        onClick={handleOnClick}
        // onClick={() => setCurrentPlaceId(null)}
        // onDrag={() => setCurrentPlaceId(null)}
        // onClick={() => setTestId(null)}
        // onDrag={() => setTestId(null)}
      >
        {clusters &&
          clusters.length > 0 &&
          clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (pointCount / points.length) * 20}px`,
                      height: `${10 + (pointCount / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }

            if (cluster.properties.eventId === currentPlaceId) {
              return (
                <Popup
                  key={cluster.properties.eventId}
                  id={cluster.properties.eventId}
                  title={cluster.properties.eventTitle}
                  organiser={cluster.properties.eventOrganiser}
                  category={cluster.properties.eventCategory}
                  startDate={cluster.properties.eventStartDate}
                  endDate={cluster.properties.eventEndDate}
                  startTime={cluster.properties.eventStartTime}
                  endTime={cluster.properties.eventEndTime}
                  city={cluster.properties.eventCity}
                  street={cluster.properties.eventStreet}
                  image={cluster.properties.eventImage}
                  lat={cluster.properties.eventLat}
                  lng={cluster.properties.eventLong}
                  setCurrentPlaceId={setCurrentPlaceId}
                  mobileView={mobileView}
                  // setTestId={setTestId}
                />
              );
            }

            if (categoryCheck[+cluster.properties.eventCategory[0]]) {
              return (
                <Marker
                  key={`${cluster.properties.eventId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <CustomMarker
                    key={cluster.properties.eventId}
                    id={cluster.properties.eventId}
                    title={cluster.properties.eventTitle}
                    setCurrentPlaceId={setCurrentPlaceId}
                    mobileView={mobileView}
                    category={cluster.properties.eventCategory[0]}
                    zoom={zoom}
                  />
                </Marker>
              );
            }
          })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
