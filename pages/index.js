import { useState, useEffect, Fragment } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
// import parse from 'html-react-parser';
// import { format } from 'timeago.js';
// import { useRouter } from 'next/router';
import EventsFilter from '../components/events/events-filter';
import EventsMap from '../components/events/events-map';

function Home() {
  const [viewport, setViewport] = useState({
    latitude: 45.5,
    longitude: 12,
    zoom: 6.75,
  });

  // const router = useRouter();
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const sett = today.setDate(today.getDate() + 7);
  const oneWeek = new Date(sett);
  const oneWeekISO = oneWeek.toISOString().split('T')[0];

  const [firstDate, setFirstDate] = useState(todayISO);
  const [lastDate, setLastDate] = useState(oneWeekISO);

  const [events, setEvents] = useState([]);

  // const [showPopup, setShowPopup] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [typeACheck, setTypeACheck] = useState(true);
  const [typeBCheck, setTypeBCheck] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const retrievedEvents = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/events/${firstDate}/${lastDate}`
        );
        setEvents(retrievedEvents.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, [firstDate, lastDate]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">SX</div>
        <div className="col-lg-4">CX</div>
        <div className="col-lg-4">DX</div>
      </div>
      <div className="row">
        <div className="col-lg-3">SX</div>
        <div className="col-lg-6">
          <EventsMap
            viewport={viewport}
            setViewport={setViewport}
            events={events}
            typeACheck={typeACheck}
            typeBCheck={typeBCheck}
            currentPlaceId={currentPlaceId}
            setCurrentPlaceId={setCurrentPlaceId}
          />
        </div>
        <div className="col-lg-3">DX</div>
      </div>

      <EventsFilter
        typeACheck={typeACheck}
        setTypeACheck={setTypeACheck}
        typeBCheck={typeBCheck}
        setTypeBCheck={setTypeBCheck}
        firstDate={firstDate}
        setFirstDate={setFirstDate}
        lastDate={lastDate}
        setLastDate={setLastDate}
      />
    </div>
  );
}

export default Home;
