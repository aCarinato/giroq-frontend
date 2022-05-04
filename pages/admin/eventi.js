import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import EventListAdmin from '../../components/admin/event-list-admin';

// import { useMainContext } from '../../context/Context';

function EventDashoardPage() {
  //Event to render
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    // setLoading(true);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/events/`);
    //Extract the Array contained in the 'events' field.
    const events = res.data;
    setEvents(events);
    // setLoading(false);
  };

  // RETRIEVE ALL EVENTS ON APP LOADING
  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (event) => {
    console.log(`${event._id}`);
    try {
      const answer = window.confirm('Sito PROPRIO sicuro?');
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/event/delete-event/${event._id}`
      );
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="headers">Lista Eventi Inseriti</div>
      <br></br>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <EventListAdmin events={events} deleteEvent={deleteEvent} />
        </div>
        <div className="col-lg-4"></div>
      </div>
    </Fragment>
  );
}

export default EventDashoardPage;
