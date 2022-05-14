import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EventId from '../../components/events/eventid';
import Head from 'next/head';

function EventDetailPage(props) {
  // console.log(props.event);
  // const [event, setEvent] = useState({});
  // const router = useRouter();

  // const eventId = router.query.eventId;

  // const fetchEvent = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API}/event/${eventId}`
  //     );
  //     setEvent(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if (eventId) fetchEvent();
  // }, [eventId]);

  return (
    <>
      <Head>
        <meta property="og:title" content={props.event.title} />
        <meta
          property="og:url"
          content={`https://www.giroq.com/event/${props.event._id}/`}
        />
        <meta
          property="og:image"
          content={props.event.image && props.event.image.url}
        />
        <meta property="og:description" content={props.event.description} />
      </Head>
      {/* <EventId
        organiser={props.event.organiser}
        title={props.event.title}
        description={props.event.description}
        image={props.event.image}
        street={props.event.street}
        city={props.event.city}
        startDate={props.event.startDate}
        endDate={props.event.endDate}
        start={props.event.startTime}
        end={props.event.endTime}
        link={props.event.link}
      /> */}
      <div className="textTest">{props.event.organiser}</div>
      <div className="textTest">{props.event.title}</div>
      <div className="textTest">{props.event.description}</div>
      <div style={{ color: 'green' }}>{props.event.link}</div>
    </>
  );
}

export default EventDetailPage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  const eventId = params.eventId;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/event/${eventId}`
    );

    return {
      props: {
        event: data,
      },
    };
    // setEvent(data);
  } catch (err) {
    console.log(err);
  }
}
