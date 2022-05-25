import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import EventId from '../../components/events/eventid';
import Head from 'next/head';

import Ribbon from '../../components/recommender/Ribbon';

// import CATEGORIES from '../../data/categories';

// import { useMainContext } from '../../context/Context';

function EventDetailPage(props) {
  // const { eventData, filteredEvents } = useMainContext();

  // const [filteredEvents, setFilteredEvents] = useState([]);

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

  useEffect(() => {
    console.log(props.recommendations);
  }, []);

  const selectedEvent = props.event;

  const originalImgUrl = selectedEvent.image.url;
  const strBefore = originalImgUrl.split('upload/')[0];
  // console.log(strBefore);
  const strAfter = originalImgUrl.split('upload/')[1];
  // console.log(strAfter);
  const ogImgUrl = `${strBefore}upload/w_600,c_scale/${strAfter}`;

  // console.log(selectedEvent);

  const humanReadableStartDate = new Date(
    selectedEvent.startDate
  ).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const humanReadableEndDate = new Date(
    selectedEvent.endDate
  ).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // if (selectedEvent.endDate) {
  //   const humanReadableEndDate = new Date(
  //     selectedEvent.endDate
  //   ).toLocaleDateString('it-IT', {
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //   });
  // }

  // useEffect(() => {
  //   const originalImgUrl = selectedEvent.image.url;
  //   const strBefore = originalImgUrl.split('upload/')[0];
  //   // console.log(strBefore);
  //   const strAfter = originalImgUrl.split('upload/')[1];
  //   // console.log(strAfter);
  //   const ogImgUrl = `${strBefore}upload/w_600,c_scale/${strAfter}`;
  //   // console.log(ogImgUrl);
  // }, []);

  return (
    <>
      <Head>
        <meta property="og:title" content={selectedEvent.title} />
        <meta
          property="og:url"
          content={`https://www.giroq.com/event/${selectedEvent._id}/`}
        />
        <meta property="og:image" content={selectedEvent.image && ogImgUrl} />
        <meta property="og:description" content={selectedEvent.description} />
      </Head>
      {/* <EventId
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
      /> */}
      <div className="eventIDpageWrapper">
        <h2 className="eventIDtitle">{selectedEvent.title}</h2>
        <div className="eventIDquestion">Organizzatore</div>
        <div className="eventIDanswer">{selectedEvent.organiser}</div>
        <div className="eventIDquestion">Dove</div>
        <div className="eventIDanswer">{`${selectedEvent.street}, ${selectedEvent.city}`}</div>

        <div className="eventIDquestion">Quando</div>
        {selectedEvent.endDate ? (
          selectedEvent.endTime ? (
            <p className="eventIDanswer">{`dal ${humanReadableStartDate} al ${humanReadableEndDate}, dalle ${selectedEvent.startTime} alle ${selectedEvent.endTime}`}</p>
          ) : (
            <p className="eventIDanswer">{`dal ${humanReadableStartDate} al ${humanReadableEndDate}, alle ${selectedEvent.startTime}`}</p>
          )
        ) : selectedEvent.endTime ? (
          <p className="eventIDanswer">{`il ${humanReadableStartDate}, dalle ${selectedEvent.startTime} alle ${selectedEvent.endTime}`}</p>
        ) : (
          <p className="eventIDanswer">{`il ${humanReadableStartDate}, alle ${selectedEvent.startTime}`}</p>
        )}

        <div className="eventIDquestion">Descrizione</div>
        <p className="eventIDanswer">{selectedEvent.description} </p>
        <div className="eventIDquestion">Scopri di più</div>
        <p className="eventIDanswer">
          {' '}
          {/* <a href={link}>{link}</a> */}
          <a href={selectedEvent.link}>Link al sito</a>
        </p>
        <div>
          {selectedEvent.image && (
            <img
              className="eventIDimage"
              src={selectedEvent.image.url}
              alt={selectedEvent.title}
            />
          )}
        </div>
        <br></br>
        {props.recommendations.length > 0 && (
          <Ribbon recommendedEvents={props.recommendations} />
        )}
      </div>
    </>
  );
}

export default EventDetailPage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  const eventId = params.eventId;

  // try {
  //   const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/events/`);
  //   const events = res.data;

  // } catch (err) {
  //   console.log(err);
  // }

  // try {
  //   const { data } = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API}/event/${eventId}`
  //   );

  //   return {
  //     props: {
  //       event: data,
  //     },
  //   };
  // } catch (err) {
  //   console.log(err);
  // }

  const events = await axios.get(`${process.env.NEXT_PUBLIC_API}/events/`);
  // const events = res.data;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/event/${eventId}`
  );

  const eventCategory = data.category[0];

  let eventsRecommended = [];

  if (eventCategory < 5) {
    let filterEvents = events.data.filter(
      (event) => event.category[0] < 5 && event._id !== data._id
    );
    eventsRecommended = [...filterEvents];
  }

  if (eventCategory > 4 && eventCategory < 13) {
    let filterEvents = events.data.filter(
      (event) =>
        event.category[0] > 4 &&
        event.category[0] < 13 &&
        event._id !== data._id
    );
    eventsRecommended = [...filterEvents];
  }

  if (eventCategory > 12 && eventCategory < 20) {
    let filterEvents = events.data.filter(
      (event) =>
        event.category[0] > 12 &&
        event.category[0] < 20 &&
        event._id !== data._id
    );
    eventsRecommended = [...filterEvents];
  }

  if (eventCategory > 19) {
    let filterEvents = events.data.filter(
      (event) => event.category[0] > 19 && event._id !== data._id
    );
    eventsRecommended = [...filterEvents];
  }

  return {
    props: {
      event: data,
      events: events.data,
      recommendations: eventsRecommended,
    },
  };
}
