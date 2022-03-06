import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  // MapboxGeocoder,
} from 'react-map-gl';
import { useState, useEffect, Fragment } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
// import parse from 'html-react-parser';
import { Room, AcUnit, Star } from '@material-ui/icons';
// import { format } from 'timeago.js';
import Link from 'next/link';
// import { useRouter } from 'next/router';

function Home() {
  // const currentUsername = 'Jo';
  // const MAPBOX_TOKEN = process.env.MapboxAccessToken;
  // const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  const MAPBOX_TOKEN =
    'pk.eyJ1Ijoicm9zYWNyb2NlIiwiYSI6ImNrenU1eThxZzRzOTAybm55NWU0Y2JvNnQifQ.8-Iz1krxCOtnbCx0iBkBEg';
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
  // const [resultDate, setResultDate] = useState([]);

  const [events, setEvents] = useState([]);

  // const [showPopup, setShowPopup] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [typeACheck, setTypeACheck] = useState(true);
  const [typeBCheck, setTypeBCheck] = useState(true);

  // const handleMarkerClick = (id, lat, long) => {
  //   console.log(`MOUSE ENTRATO`);
  // console.log(`currentPlaceId (before setting it): ${currentPlaceId}`);
  // setCurrentPlaceId(id);
  // setViewport({ ...viewport, latitude: lat, longitude: long });
  // console.log(`currentPlaceId: ${currentPlaceId}`);
  // console.log(`----------------`);
  // if (!showPopup) setShowPopup(true);
  // };

  // const handleOnClose = () => {
  //   setCurrentPlaceId(null);
  // console.log(`mouse uscito. currentPlaceId= ${currentPlaceId}`);
  // setShowPopup(false);
  // console.log(`mouse left. showPopup = ${showPopup}`);
  // };

  // const handleOnMarkerClick = (id) => {
  //   const fullPath = `/events/${id}`;

  //   router.push(fullPath);
  // };

  // const handleTypeAChange = () => {
  //   setTypeACheck(!typeACheck);
  // };

  // const handleTypeBChange = () => {
  //   setTypeBCheck(!typeBCheck);
  // };

  // const handleSelectDate = (e) => {
  //   console.log(e.target.value);
  // };
  // const filterDates = async (e) => {
  //   // setDate(e.target.value);
  //   e.preventDefault();
  //   // console.log(`Find "${query}" f rom db`);
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API}/events/${date}`
  //     );
  //     //  console.log("search user response => ", data);
  //     // setResultDate(data);
  //     setEvents(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const getEvents = async () => {
      try {
        // console.log(`firstDate; ${firstDate}`);
        // console.log(`lastDate: ${lastDate}`);
        const retrievedEvents = await axios.get(
          // `${process.env.NEXT_PUBLIC_API}/events`
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
          <Map
            {...viewport}
            style={{ height: '50vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={(evt) => setViewport(evt.viewState)}
            // onDblClick={currentUsername && handleAddClick}
          >
            <GeolocateControl />
            <FullscreenControl />
            <NavigationControl />
            {/* <ScaleControl /> */}

            {events.map((p) => (
              <Fragment key={p._id}>
                {p.type === 'A' && typeACheck && (
                  <Marker
                    key={p._id}
                    longitude={p.long}
                    latitude={p.lat}
                    offsetLeft={-3.5 * viewport.zoom}
                    offsetTop={-7 * viewport.zoom}
                  >
                    {' '}
                    <div>
                      <Link href={`/event/${p._id}`}>
                        <a target="_blank">
                          <AcUnit
                            key={p._id}
                            className="markerAcUnit"
                            style={{ fontSize: viewport.zoom * 1.5 }}
                            // onMouseEnter={() =>
                            //   handleMarkerClick(p._id, p.lat, p.long)
                            // }
                            onMouseEnter={() => setCurrentPlaceId(p._id)}
                            // onMouseLeave={handleOnClose}
                            onMouseLeave={() => setCurrentPlaceId(null)}
                          />
                        </a>
                      </Link>
                    </div>
                  </Marker>
                )}
                {p.type === 'B' && typeBCheck && (
                  <Marker
                    key={p._id}
                    longitude={p.long}
                    latitude={p.lat}
                    offsetLeft={-3.5 * viewport.zoom}
                    offsetTop={-7 * viewport.zoom}
                  >
                    {' '}
                    <div>
                      <Link href={`/event/${p._id}`}>
                        <a target="_blank">
                          <Room
                            key={p._id}
                            className="markerRoom"
                            style={{ fontSize: viewport.zoom * 1.5 }}
                            // onMouseEnter={() =>
                            //   handleMarkerClick(p._id, p.lat, p.long)
                            // }
                            onMouseEnter={() => setCurrentPlaceId(p._id)}
                            // onMouseLeave={handleOnClose}
                            onMouseLeave={() => setCurrentPlaceId(null)}
                          />
                        </a>
                      </Link>
                    </div>
                  </Marker>
                )}

                {p._id === currentPlaceId && (
                  <Popup longitude={p.long} latitude={p.lat} anchor="left">
                    <div className="card">
                      <label>Evento</label>
                      <p className="desc">{p.title}</p>
                      <label>Information</label>
                      <p>{p.description}</p>
                      <span className="username">
                        Created by <b>{p.organiser}</b>
                      </span>
                      <Link href={`/events/${p._id}`}>Go to page</Link>
                    </div>
                  </Popup>
                )}
              </Fragment>
            ))}

            <div id="filter-group" className="filter-group">
              <div>
                <input
                  type="checkbox"
                  id="typeA"
                  name="typeA"
                  defaultChecked
                  // onChange={handleTypeAChange}
                  onChange={() => setTypeACheck(!typeACheck)}
                />
                <label htmlFor="typeA">Type A</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="typeB"
                  name="typeB"
                  defaultChecked
                  // onChange={handleTypeBChange}
                  onChange={() => setTypeBCheck(!typeBCheck)}
                />
                <label htmlFor="typeB">Type B</label>
              </div>
            </div>
          </Map>
        </div>
        <div className="col-lg-3">DX</div>
      </div>
      <div className="row">
        <div className="col-lg-4">SX</div>
        <div className="col-lg-4">
          <form>
            <label htmlFor="first-date">Seleziona data inizio:</label>
            <input
              type="date"
              id="first-date"
              name="first-date"
              value={firstDate}
              // onChange={(e) => {
              // setDate(e.target.value);
              // setResultDate([]);
              // }}
              onChange={(e) => setFirstDate(e.target.value)}
            />
            <label htmlFor="last-date">Seleziona data fine:</label>
            <input
              type="date"
              id="last-date"
              name="last-date"
              value={lastDate}
              // onChange={(e) => {
              // setDate(e.target.value);
              // setResultDate([]);
              // }}
              onChange={(e) => setLastDate(e.target.value)}
            />
            {/* <button className="btn btn-outline-primary col-12" type="submit">
              Search
            </button> */}
          </form>
        </div>
        <div className="col-lg-4">
          {' '}
          <button>
            <Link href="/nuovo">Aggiugi Evento</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
