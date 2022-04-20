import { Fragment } from 'react';
import EventItem from './event-item';
import EventItemTemp from './event-item-temp';
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

  return (
    <div className={classes.colList}>
      {/* <div className={classes.list}> */}
      {events.length === 0 && (
        <div>NESSUN EVENTO PER LE DATE E LUOGHI SELEZIONATI</div>
      )}
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <Fragment key={event._id}>
            {categoryCheck[+event.category[0]] && (
              <EventItemTemp
                key={event._id}
                id={event._id}
                // bounds={bounds}
                title={event.title}
                // location={event.location}
                category={+event.category[0]}
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
      {/* </div> */}
    </div>
  );
}

export default EventList;
