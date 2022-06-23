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
      weekday: 'long',
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

      setEventsToday(selectedEvents);
    };

    if (events.length > 0) {
      fetchEvents();
    }
  }, [events]);

  if (eventsToday && eventsToday.length > 0) {
    return (
      <Fragment>
        <div className={classes.date}>{humanReadableStartDate}</div>
        <div className={classes.container}>
          {eventsToday.map((event) => (
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
  } else {
    return (
      <Fragment>
        <div className={classes.date}>{humanReadableStartDate}</div>
        <div className={classes.container}>
          Nessun evento per le categorie da te selezionate
        </div>
      </Fragment>
    );
  }
}

export default EventListByDate;
