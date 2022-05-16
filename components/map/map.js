import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import { useRef } from 'react';
import CustomMarker from './custom-marker';

import classes from './map.module.css';

import Popup from './popup';

import * as ga from '../../lib/google-analytics';

import { useMainContext } from '../../context/Context';

// const Marker = ({ children }) => children;

function Map(props) {
  const {
    mapHeight,
    setBounds,
    // categoryCheck,
    currentPlaceId,
    setCurrentPlaceId,
    mobileView,
    events,
    bounds,
    isOpen,
    setIsOpen,
    isDateDropdownOpen,
    setIsDateDropdownOpen,
  } = props;

  const { mapCenter, zoom, setZoom, selectedEvent } = useMainContext();

  const mapRef = useRef();

  const BOUNDS = {
    north: 46.2,
    south: 45.1,
    west: 10.5,
    east: 12.8,
  };

  const createMapOptions = (maps) => {
    return {
      // gestureHandling: 'greedy',
      restriction: {
        latLngBounds: BOUNDS,
        strictBounds: false,
      },
      // panControl: false,
      // mapTypeControl: false,
      // scrollwheel: false,
      // styles: [
      //   {
      //     stylers: [
      //       { saturation: -100 },
      //       { gamma: 0.8 },
      //       { lightness: 4 },
      //       { visibility: 'on' },
      //     ],
      //   },
      // ],
    };
  };

  // const [zoom, setZoom] = useState(13);

  const points = events.map((event) => ({
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

  const handleOnChange = ({ zoom, bounds }) => {
    setZoom(zoom);
    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);

    ga.event({
      action: 'Map',
      category: 'Zoom mappa',
      label: '',
      value: '9',
    });
  };

  const handleOnDrag = () => {
    // console.log('click on map');
    setCurrentPlaceId(null);

    if (isOpen) {
      setIsOpen(false);
    }

    if (isDateDropdownOpen) {
      setIsDateDropdownOpen(!isDateDropdownOpen);
    }
  };

  const handleOnClick = () => {
    // console.log('click on map');
    setCurrentPlaceId(null);

    if (isOpen) {
      setIsOpen(false);
    }

    if (isDateDropdownOpen) {
      setIsDateDropdownOpen(!isDateDropdownOpen);
    }

    ga.event({
      action: 'Map',
      category: 'Click map',
      label: '',
      value: '9',
    });
  };

  return (
    <div
      className={classes.colMap}
      style={{ height: mapHeight }}
      // onClick={handleOnClick}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        // center={center}
        center={mapCenter}
        zoom={zoom}
        // margin={[0, 0, 0, 0]}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        options={createMapOptions}
        onChange={handleOnChange}
        onClick={handleOnClick}
        onDrag={handleOnDrag}
      >
        {clusters &&
          clusters.length > 0 &&
          clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              let changeSize = Math.round((pointCount / points.length) * 5);
              //Can't exceed 40 px
              let addSize = Math.min(changeSize * 10, 40);
              return (
                // <Marker
                //   key={`cluster-${cluster.id}`}
                //   lat={latitude}
                //   lng={longitude}
                // >
                <div
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                  className="cluster-marker"
                  style={{
                    // width: `${10 + (pointCount / points.length) * 20}px`,
                    // height: `${10 + (pointCount / points.length) * 20}px`,
                    width: `${addSize + changeSize}px`,
                    height: `${addSize + changeSize}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });

                    ga.event({
                      action: 'Map',
                      category: 'Click cluster',
                      label: '',
                      value: '9',
                    });
                  }}
                >
                  {pointCount}
                </div>
                // </Marker>
              );
            } else if (cluster.properties.eventId === currentPlaceId) {
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
            } else {
              return (
                // <Marker
                //   key={`${cluster.properties.eventId}`}
                //   lat={latitude}
                //   lng={longitude}
                // >
                <CustomMarker
                  key={cluster.properties.eventId}
                  lat={latitude}
                  lng={longitude}
                  id={cluster.properties.eventId}
                  title={cluster.properties.eventTitle}
                  currentPlaceId={currentPlaceId}
                  setCurrentPlaceId={setCurrentPlaceId}
                  mobileView={mobileView}
                  category={cluster.properties.eventCategory[0]}
                  zoom={zoom}
                />
                // </Marker>
              );
            }
          })}
      </GoogleMapReact>
    </div>
  );
}

// Map.defaultProps = {
//   center: {
//     lat: 45.76,
//     lng: 11.73,
//   },
// };

export default Map;
