import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EventDetailPage() {
  const [event, setEvent] = useState({});
  const router = useRouter();

  // console.log(`Router.pathname: ${router.pathname}`);
  // console.log(`Router.query: ${router.query}`);
  // console.log(router.pathname);
  // console.log(router.query.eventId);

  const eventId = router.query.eventId;
  // console.log('event id is:' + eventId);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/events/event/${eventId}`
      );
      setEvent(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (eventId) fetchEvent();
  }, [eventId]);

  return (
    <div>
      <h2>{event.title}</h2>
      <p>Organizzato da: {event.organiser}</p>
    </div>
  );
}

export default EventDetailPage;
