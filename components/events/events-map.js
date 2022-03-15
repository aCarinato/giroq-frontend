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
import { Fragment } from 'react';
import EventsPopup from './events-popup';

function EventsMap(props) {
  const {
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

  // const handleOnMouseEnter = ()

  return (
    <Map
      {...viewport}
      style={{ height: '50vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl />
      {/* <ScaleControl /> */}

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
              {' '}
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
              {' '}
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
              />
            </Popup>
          )}
        </Fragment>
      ))}
    </Map>
  );
}

export default EventsMap;
