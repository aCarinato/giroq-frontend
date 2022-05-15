import React from 'react';
import classes from './event-item-admin.module.css';
// import axios from 'axios';

function EventItemAdmin(props) {
  const { id, title, deleteEvent, event, startDate, endDate } = props;

  // const deleteEvent = async () => {
  //   // console.log(id);
  //   try {
  //     const answer = window.confirm('Sito PROPRIO sicuro?');
  //     if (!answer) return;
  //     const { data } = await axios.delete(`delete-event/${id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  console.log(event.startDate);
  console.log(event.endDate);

  const humanReadableStartDate = new Date(event.startDate).toLocaleDateString(
    'it-IT',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  const humanReadableEndDate = new Date(event.endDate).toLocaleDateString(
    'it-IT',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <div className={classes.item}>
      {/* <p>{id}</p> */}
      <p>{title}</p>
      {endDate ? (
        <div>
          Evento tenutosi
          <div className={classes.dateContainer}>
            Da: <time>{humanReadableStartDate}</time>
          </div>
          <div className={classes.dateContainer}>
            A: <time>{humanReadableEndDate}</time>
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.dateContainer}>
            Evento tenutosi il: <time>{humanReadableStartDate}</time>
          </div>
          <br></br>
          {/* <div className={classes.trickyText}>AAAA</div> */}
        </div>
      )}
      <div className={classes.btnCol}>
        <button className={classes.btnEdit}>Modifica Evento</button>
        <button
          onClick={() => deleteEvent(event)}
          className={classes.btnDelete}
        >
          Rimuovi Evento
        </button>
      </div>
    </div>
  );
}

export default EventItemAdmin;
