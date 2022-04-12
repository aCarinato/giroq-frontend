import { Fragment } from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const {
    // bounds,
    events,
    categoryCheck,
    setCurrentMarker,
    mobileView,
    setMapSelected,
    setCoordinates,
    setCurrentPlaceId,
    coordinates,
    // setZoom,
  } = props;

  const categories = [1, 2];

  return (
    <ul className={classes.list}>
      {events.length === 0 && <div>NESSUN EVENTO PER LE DATE SELEZIONATE</div>}
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <Fragment key={event._id}>
            {categories.includes(+event.category[0]) &&
              categoryCheck[+event.category[0] - 1] && (
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
