import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import EventId from '../../components/events/eventid';
import Head from 'next/head';
import Wrapper5095 from '../../components/UI/Wrapper5095';
import BtnDarkCTA from '../../components/UI/BtnDarkCTA';
import BtnLightCTA from '../../components/UI/BtnLightCTA';

import * as ga from '../../lib/google-analytics';

import Ribbon from '../../components/recommender/Ribbon';

// import CATEGORIES from '../../data/categories';

// import { useMainContext } from '../../context/Context';

function EventDetailPage(props) {
  const selectedEvent = props.event;

  const router = useRouter();

  const originalImgUrl = selectedEvent.image.url;
  const strBefore = originalImgUrl.split('upload/')[0];
  // console.log(strBefore);
  const strAfter = originalImgUrl.split('upload/')[1];
  // console.log(strAfter);
  const ogImgUrl = `${strBefore}upload/w_600,c_scale/${strAfter}`;

  // console.log(selectedEvent);

  useEffect(() => {
    ga.event({
      action: 'Visit event detail page',
      category: '',
      label: '',
      value: '9',
    });
  }, []);

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

  const handleLinkClick = () => {
    ga.event({
      action: 'Event detail page - Click vai a evento',
      category: '',
      label: '',
      value: '9',
    });
    window.open(selectedEvent.link, '_blank');
    // window.open('https://www.google.com', '_blank');
  };

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
        <div className="eventIDquestion">Scopri di pi??</div>
        <p onClick={handleLinkClick} className="eventIDanswer-link">
          Link al sito
        </p>
        {/* <a href={link}>{link}</a> */}
        {/* <a href={selectedEvent.link}>Link al sito</a> */}

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
        <Wrapper5095 shadow={false}>
          <BtnDarkCTA
            type="button"
            label="Gli eventi per te"
            onCLickAction={() => router.push('/user-login')}
          />
          <BtnLightCTA
            type="button"
            label="Trova tutti gli eventi"
            onCLickAction={() => router.push('/')}
          />
        </Wrapper5095>
        <br></br>
        <div
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
          }}
        >
          Potrebbe anche interessarti:
        </div>
        {props.recommendationsSameCategory.length > 0 && (
          <Ribbon
            type={'same'}
            recommendedEvents={props.recommendationsSameCategory}
          />
        )}
        {props.recommendations.length > 0 && (
          <Ribbon type={'similar'} recommendedEvents={props.recommendations} />
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

  // Events of the same category
  let eventsCatRec = [];

  let sameCategoryEvents = events.data.filter(
    (event) => event.category[0] === eventCategory && event._id !== data._id
  );
  eventsCatRec = [...sameCategoryEvents];

  // Events of similar categories
  let eventsRecommended = [];

  if (eventCategory < 5) {
    let filterEvents = events.data.filter(
      (event) =>
        event.category[0] < 5 &&
        event._id !== data._id &&
        event.category[0] !== eventCategory
    );
    eventsRecommended = [...filterEvents];
  }

  if (eventCategory > 4 && eventCategory < 13) {
    let filterEvents = events.data.filter(
      (event) =>
        event.category[0] > 4 &&
        event.category[0] < 13 &&
        event._id !== data._id &&
        event.category[0] !== eventCategory
    );
    eventsRecommended = [...filterEvents];
  }

  if (eventCategory > 12 && eventCategory < 20) {
    let filterEvents = events.data.filter(
      (event) =>
        event.category[0] > 12 &&
        event.category[0] < 20 &&
        event._id !== data._id &&
        event.category[0] !== eventCategory
    );
    eventsRecommended = [...filterEvents];
  }

  if (eventCategory > 19) {
    let filterEvents = events.data.filter(
      (event) =>
        event.category[0] > 19 &&
        event._id !== data._id &&
        event.category[0] !== eventCategory
    );
    eventsRecommended = [...filterEvents];
  }

  return {
    props: {
      event: data,
      events: events.data,
      recommendationsSameCategory: eventsCatRec,
      recommendations: eventsRecommended,
    },
  };
}
