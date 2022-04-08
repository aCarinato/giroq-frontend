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
    mobileView,
    setMapSelected,
    setCoordinates,
    setCurrentPlaceId,
    coordinates,
    // setZoom,
  } = props;
  return (
    <ul className={classes.list}>
      {events.length === 0 && <div>NESSUN EVENTO PER LE DATE SELEZIONATE</div>}
      {events.length > 0 &&
        events.map((event) => (
          <Fragment key={event._id}>
            {event.type === 1 && typeACheck && (
              <EventItem
                key={event._id}
                id={event._id}
                // bounds={bounds}
                title={event.title}
                // location={event.location}
                date={event.date}
                image={event.image}
                setCurrentMarker={setCurrentMarker}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
                setCoordinates={setCoordinates}
                coordinates={coordinates}
                setCurrentPlaceId={setCurrentPlaceId}
                // setZoom={setZoom}
              />
            )}
            {event.type === 2 && typeBCheck && (
              <EventItem
                key={event._id}
                id={event._id}
                // bounds={bounds}
                title={event.title}
                // location={event.location}
                date={event.date}
                image={event.image}
                setCurrentMarker={setCurrentMarker}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
                setCoordinates={setCoordinates}
                coordinates={coordinates}
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
