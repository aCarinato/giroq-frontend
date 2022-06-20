import classes from './event-list-date.module.css';
import { Fragment, useEffect, useState } from 'react';
import RecommendedEvent from '../recommender/RecommendedEvent';

function EventListByDate(props) {
  const { date, events } = props;

  const selectedDate = date;
  // const selectedDate = '2022-06-20';

  const [eventsToday, setEventsToday] = useState([]);

  const humanReadableStartDate = new Date(selectedDate).toLocaleDateString(
    'it-IT',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  useEffect(() => {
    const fetchEvents = () => {
      let referenceDate = new Date(date);

      let selectedEvents = [];

      selectedEvents = events.filter((event) => {
        let eventStartDate = new Date(event.startDate);
        // console.log(`Data inizio evento: ${eventStartDate.getTime()}`);
        // console.log(`Data riferimento: ${referenceDate.getTime()}`);

        if (event.endDate !== null) {
          let eventEndDate = new Date(event.endDate);

          if (
            eventStartDate === referenceDate ||
            (eventStartDate <= referenceDate && eventEndDate >= referenceDate)
          ) {
            return event;
          }
        } else {
          if (eventStartDate.getTime() === referenceDate.getTime()) {
            return event;
          } else {
            return;
          }
        }
      });

      // console.log(selectedEvents.length);
      setEventsToday(selectedEvents);
    };

    if (events.length > 0) {
      fetchEvents();
    }
  }, [events]);

  return (
    <Fragment>
      {eventsToday && eventsToday.length > 0 && (
        <div className={classes.date}>{humanReadableStartDate}</div>
      )}
      <div className={classes.container}>
        {eventsToday &&
          eventsToday.length > 0 &&
          eventsToday.map((event) => (
            <RecommendedEvent
              key={event._id}
              id={event._id}
              title={event.title}
              category={event.category}
              startDate={event.startDate}
              endDate={event.endDate}
              startTime={event.startTime}
              endTime={event.endTime}
              image={event.image}
              city={event.city}
            />
          ))}
      </div>
      <br></br>
      <br></br>
    </Fragment>
  );
}

export default EventListByDate;
