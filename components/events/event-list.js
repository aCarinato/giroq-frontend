import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const { events, currentMarker, setCurrentMarker } = props;
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem
          key={event._id}
          id={event._id}
          title={event.title}
          // location={event.location}
          date={event.date}
          // image={event.image}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
        />
      ))}
    </ul>
  );
}

export default EventList;
