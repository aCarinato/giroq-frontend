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
import EventsFilter from '../components/events/events-filter';

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
                      <Link href={`/event/${p._id}`}>Go to page</Link>
                    </div>
                  </Popup>
                )}
              </Fragment>
            ))}
          </Map>
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
