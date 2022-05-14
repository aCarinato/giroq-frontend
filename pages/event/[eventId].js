import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EventId from '../../components/events/eventid';
import Head from 'next/head';

function EventDetailPage() {
  const [event, setEvent] = useState({});
  const router = useRouter();

  const eventId = router.query.eventId;
  // console.log('event id is:' + eventId);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/event/${eventId}`
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
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={event.title} />
        <meta property="og:type" content="page" />
        <meta
          property="og:url"
          content={`https://www.giroq.com/event/${event._id}/`}
        />
        <meta property="og:image" content={event.image && event.image.url} />
        <meta property="og:description" content={event.description} />
      </Head>
      <EventId
        organiser={event.organiser}
        title={event.title}
        description={event.description}
        image={event.image}
        street={event.street}
        city={event.city}
        startDate={event.startDate}
        endDate={event.endDate}
        start={event.startTime}
        end={event.endTime}
        link={event.link}
      />
    </>
  );
}

export default EventDetailPage;
