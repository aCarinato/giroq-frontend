import { Fragment } from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const { events, typeACheck, typeBCheck, setCurrentMarker } = props;
  return (
    <ul className={classes.list}>
      {events.map((event) => (
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
            />
          )}
        </Fragment>
      ))}
    </ul>
  );
}

export default EventList;
