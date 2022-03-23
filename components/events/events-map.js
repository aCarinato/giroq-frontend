import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  // MapboxGeocoder,
} from 'react-map-gl';
import { Room, AcUnit, Star } from '@material-ui/icons';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import EventsPopup from './events-popup';

function EventsMap(props) {
  const {
    mapHeight,
    viewport,
    setViewport,
    events,
    typeACheck,
    typeBCheck,
    currentPlaceId,
    setCurrentPlaceId,
    currentMarker,
  } = props;
  const MAPBOX_TOKEN =
    'pk.eyJ1Ijoicm9zYWNyb2NlIiwiYSI6ImNrenU1eThxZzRzOTAybm55NWU0Y2JvNnQifQ.8-Iz1krxCOtnbCx0iBkBEg';
  // const MAPBOX_TOKEN = process.env.MapboxAccessToken;
  // const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

  const bounds = [
    [10.5, 44.0], // Southwest coordinates
    [12.9, 46.5], // Northeast coordinates
  ];

  return (
    <div>
      <Map
        {...viewport}
        style={{ height: mapHeight }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        maxBounds={bounds}
      >
        <GeolocateControl />
        <FullscreenControl />
        <NavigationControl />
        {events.map((p) => (
          <Fragment key={p._id}>
            {p.type === 'A' && typeACheck && (
              <Marker
                key={p._id}
                longitude={p.long}
                latitude={p.lat}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <div>
                  <Link href={`/event/${p._id}`}>
                    <a target="_blank">
                      {p._id === currentMarker ? (
                        <AcUnit
                          key={p._id}
                          className="markerAcUnit"
                          style={{ fontSize: viewport.zoom * 4.5 }}
                          onMouseEnter={() => setCurrentPlaceId(p._id)}
                          onMouseLeave={() => setCurrentPlaceId(null)}
                        />
                      ) : (
                        <AcUnit
                          key={p._id}
                          className="markerAcUnit"
                          style={{ fontSize: viewport.zoom * 2.5 }}
                          onMouseEnter={() => setCurrentPlaceId(p._id)}
                          onMouseLeave={() => setCurrentPlaceId(null)}
                        />
                      )}
                    </a>
                  </Link>
                </div>
              </Marker>
            )}
            {p.type === 'B' && typeBCheck && (
              <Marker
                key={p._id}
                longitude={p.long}
                latitude={p.lat}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <div>
                  <Link href={`/event/${p._id}`}>
                    <a target="_blank">
                      {p._id === currentMarker ? (
                        <Room
                          key={p._id}
                          className="markerRoom"
                          style={{ fontSize: viewport.zoom * 4.5 }}
                          onMouseEnter={() => setCurrentPlaceId(p._id)}
                          onMouseLeave={() => setCurrentPlaceId(null)}
                        />
                      ) : (
                        <Room
                          key={p._id}
                          className="markerRoom"
                          style={{ fontSize: viewport.zoom * 2.5 }}
                          onMouseEnter={() => setCurrentPlaceId(p._id)}
                          onMouseLeave={() => setCurrentPlaceId(null)}
                        />
                      )}
                    </a>
                  </Link>
                </div>
              </Marker>
            )}
            {p._id === currentPlaceId && (
              <Popup longitude={p.long} latitude={p.lat} anchor="left">
                <EventsPopup
                  title={p.title}
                  description={p.description}
                  organiser={p.organiser}
                  id={p._id}
                  image={p.image}
                />
              </Popup>
            )}
          </Fragment>
        ))}
      </Map>
    </div>
  );
}

export default EventsMap;
