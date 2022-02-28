import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';
import { useState, useEffect, Fragment } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
// import parse from 'html-react-parser';
import { Room, AcUnit, Star } from '@material-ui/icons';
// import { format } from 'timeago.js';

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

  const [pins, setPins] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [typeACheck, setTypeACheck] = useState(true);
  const [typeBCheck, setTypeBCheck] = useState(true);

  const handleMarkerClick = (id, lat, long) => {
    console.log(`MOUSE ENTRATO`);
    console.log(`currentPlaceId (before setting it): ${currentPlaceId}`);
    setCurrentPlaceId(id);
    // setViewport({ ...viewport, latitude: lat, longitude: long });
    console.log(`currentPlaceId: ${currentPlaceId}`);
    console.log(`----------------`);
    // if (!showPopup) setShowPopup(true);
    // console.log(`mouse entrato. showPopup = ${showPopup}`);
  };

  const handleOnClose = () => {
    setCurrentPlaceId(null);
    console.log(`mouse uscito. currentPlaceId= ${currentPlaceId}`);
    setShowPopup(false);
    console.log(`mouse left. showPopup = ${showPopup}`);
  };

  const handleTypeAChange = () => {
    setTypeACheck(!typeACheck);
  };

  const handleTypeBChange = () => {
    setTypeBCheck(!typeBCheck);
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/events`
        );
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

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
            {typeACheck &&
              pins.map((p) => (
                <Fragment key={p._id}>
                  <Marker
                    key={p._id}
                    longitude={p.long}
                    latitude={p.lat}
                    offsetLeft={-3.5 * viewport.zoom}
                    offsetTop={-7 * viewport.zoom}
                  >
                    {' '}
                    <div>
                      <AcUnit
                        key={p._id}
                        className="markerAcUnit"
                        style={{ fontSize: viewport.zoom * 1.5 }}
                        onMouseEnter={() =>
                          handleMarkerClick(p._id, p.lat, p.long)
                        }
                        onMouseLeave={handleOnClose}
                      />
                    </div>
                  </Marker>
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
                  onChange={handleTypeAChange}
                />
                <label htmlFor="typeA">Type A</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="typeB"
                  name="typeB"
                  defaultChecked
                  onChange={handleTypeBChange}
                />
                <label htmlFor="typeB">Type B</label>
              </div>
            </div>
          </Map>
        </div>
        <div className="col-lg-3">DX</div>
      </div>
    </div>
  );
}

export default Home;
