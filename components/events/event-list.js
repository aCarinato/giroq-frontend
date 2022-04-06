import { Fragment } from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const {
    // bounds,
    events,
    typeACheck,
    typeBCheck,
    setCurrentMarker,
    viewport,
    setViewport,
    mobileView,
    setMapSelected,
    setCoordinates,
    setCurrentPlaceId,
    // setZoom,
  } = props;
  return (
    <ul className={classes.list}>
      {events.length === 0 && <div>NESSUN EVENTO PER LE DATE SELEZIONATE</div>}
      {events.length > 0 &&
        events.map((event) => (
          <Fragment key={event._id}>
            {event.type === 'A' && typeACheck && (
              <EventItem
                key={event._id}
                id={event._id}
                // bounds={bounds}
                title={event.title}
                // location={event.location}
                date={event.date}
                image={event.image}
                setCurrentMarker={setCurrentMarker}
                viewport={viewport}
                setViewport={setViewport}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
                setCoordinates={setCoordinates}
                setCurrentPlaceId={setCurrentPlaceId}
                // setZoom={setZoom}
              />
            )}
            {event.type === 'B' && typeBCheck && (
              <EventItem
                key={event._id}
                id={event._id}
                // bounds={bounds}
                title={event.title}
                // location={event.location}
                date={event.date}
                image={event.image}
                setCurrentMarker={setCurrentMarker}
                viewport={viewport}
                setViewport={setViewport}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
                setCoordinates={setCoordinates}
                setCurrentPlaceId={setCurrentPlaceId}
                // setZoom={setZoom}
              />
            )}
          </Fragment>
        ))}
    </ul>
  );
}

export default EventList;
