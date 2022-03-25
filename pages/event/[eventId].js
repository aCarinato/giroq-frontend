import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EventId from '../../components/events/eventid';
import Head from 'next/head';

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
        `${process.env.NEXT_PUBLIC_API}/event/${eventId}`
      );
      setEvent(data);
      console.log('evento ritrovato:');
      console.log(event);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (eventId) fetchEvent();
  }, [eventId]);

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventId
        organiser={event.organiser}
        title={event.title}
        image={event.image}
      />
    </>
    // <div>
    //   <h2>{event.title}</h2>
    //   <p>Organizzato da: {event.organiser}</p>
    // </div>
  );
}

export default EventDetailPage;
