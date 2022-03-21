import { Fragment } from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const {
    events,
    typeACheck,
    typeBCheck,
    setCurrentMarker,
    viewport,
    setViewport,
    mobileView,
    setMapSelected,
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
                title={event.title}
                // location={event.location}
                date={event.date}
                // image={event.image}
                setCurrentMarker={setCurrentMarker}
                viewport={viewport}
                setViewport={setViewport}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
              />
            )}
            {event.type === 'B' && typeBCheck && (
              <EventItem
                key={event._id}
                id={event._id}
                title={event.title}
                // location={event.location}
                date={event.date}
                // image={event.image}
                setCurrentMarker={setCurrentMarker}
                viewport={viewport}
                setViewport={setViewport}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
              />
            )}
          </Fragment>
        ))}
    </ul>
  );
}

export default EventList;
