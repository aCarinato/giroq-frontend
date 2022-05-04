import React from 'react';
import classes from './event-item-admin.module.css';
import axios from 'axios';

function EventItemAdmin(props) {
  const { id, title, deleteEvent, event } = props;

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

  return (
    <div className={classes.item}>
      {/* <p>{id}</p> */}
      <p>{title}</p>
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
