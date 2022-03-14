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

function EventsMap(props) {
  const {
    viewport,
    setViewport,
    events,
    typeACheck,
    typeBCheck,
    currentPlaceId,
    setCurrentPlaceId,
  } = props;
  const MAPBOX_TOKEN =
    'pk.eyJ1Ijoicm9zYWNyb2NlIiwiYSI6ImNrenU1eThxZzRzOTAybm55NWU0Y2JvNnQifQ.8-Iz1krxCOtnbCx0iBkBEg';
  // const MAPBOX_TOKEN = process.env.MapboxAccessToken;
  // const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  return (
    <Map
      {...viewport}
      style={{ height: '50vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewport(evt.viewState)}
      // onDblClick={currentUsername && handleAddClick}
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
                    <AcUnit
                      key={p._id}
                      className="markerAcUnit"
                      style={{ fontSize: viewport.zoom * 1.5 }}
                      // onMouseEnter={() =>
                      //   handleMarkerClick(p._id, p.lat, p.long)
                      // }
                      onMouseEnter={() => setCurrentPlaceId(p._id)}
                      // onMouseLeave={handleOnClose}
                      onMouseLeave={() => setCurrentPlaceId(null)}
                    />
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
                    <Room
                      key={p._id}
                      className="markerRoom"
                      style={{ fontSize: viewport.zoom * 1.5 }}
                      // onMouseEnter={() =>
                      //   handleMarkerClick(p._id, p.lat, p.long)
                      // }
                      onMouseEnter={() => setCurrentPlaceId(p._id)}
                      // onMouseLeave={handleOnClose}
                      onMouseLeave={() => setCurrentPlaceId(null)}
                    />
                  </a>
                </Link>
              </div>
            </Marker>
          )}

          {p._id === currentPlaceId && (
            <Popup longitude={p.long} latitude={p.lat} anchor="left">
              <div className="card">
                <label>Evento</label>
                <p className="desc">{p.title}</p>
                <label>Information</label>
                <p>{p.description}</p>
                <span className="username">
                  Created by <b>{p.organiser}</b>
                </span>
                <Link href={`/event/${p._id}`}>Go to page</Link>
              </div>
            </Popup>
          )}
        </Fragment>
      ))}
    </Map>
  );
}

export default EventsMap;
