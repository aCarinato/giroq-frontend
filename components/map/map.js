import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import { useRef, useEffect, useState } from 'react';
import CustomMarker from './custom-marker';

import Popup from './popup';

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
    typeACheck,
    typeBCheck,
    currentPlaceId,
    setCurrentPlaceId,
    setCurrentMarker,
    mobileView,
    // currentMarker,
    events,
    bounds,
  } = props;
  const mapRef = useRef();

  const [testID, setTestId] = useState(null);

  const points = events.map((event) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      eventId: event._id,
      eventType: event.category,
      eventDate: event.date,
      eventTitle: event.title,
      eventOrganiser: event.organiser,
      eventDescription: event.description,
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

  return (
    <div style={{ height: mapHeight }}>
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
        defaultCenter={{ lat: 45.7, lng: 11.5 }}
        center={coordinates}
        defaultZoom={7}
        zoom={zoom}
        margin={[0, 0, 0, 0]}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
          console.log('THESE ARE THE BOUNDS FROM THE MAP:');
          console.log(bounds);
          console.log('THESE ARE THE EVENTS FROM THE MAP:');
          console.log(events);
        }}
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
                  image={cluster.properties.eventImage}
                  lat={cluster.properties.eventLat}
                  lng={cluster.properties.eventLong}
                  setCurrentPlaceId={setCurrentPlaceId}
                  mobileView={mobileView}
                  setTestId={setTestId}
                />
              );
            }

            if (cluster.properties.eventType[0] === 1 && typeACheck) {
              return (
                <Marker
                  // key={`crime-${cluster.properties.crimeId}`}
                  key={`${cluster.properties.eventId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <button className="crime-marker-A">
                    <CustomMarker
                      key={cluster.properties.eventId}
                      id={cluster.properties.eventId}
                      title={cluster.properties.eventTitle}
                      setCurrentPlaceId={setCurrentPlaceId}
                      mobileView={mobileView}
                      currentPlaceId={currentPlaceId}
                      testID={testID}
                      setTestId={setTestId}
                    />
                    {/* <img src="/custody.svg" alt="crime doesn't pay" /> */}
                  </button>
                </Marker>
              );
            }
            if (cluster.properties.eventType[0] === 2 && typeBCheck) {
              return (
                <Marker
                  // key={`crime-${cluster.properties.crimeId}`}
                  key={`${cluster.properties.eventId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <button className="crime-marker-B">
                    <CustomMarker
                      key={cluster.properties.eventId}
                      id={cluster.properties.eventId}
                      title={cluster.properties.eventTitle}
                      setCurrentPlaceId={setCurrentPlaceId}
                      mobileView={mobileView}
                      testID={testID}
                      setTestId={setTestId}
                    />
                    {/* <img src="/custody.svg" alt="crime doesn't pay" /> */}
                  </button>
                </Marker>
              );
            }
          })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
