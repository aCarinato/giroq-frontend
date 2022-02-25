// import './App.css';
// import styles from '../styles/Home.module.css';
// import * as React from 'react';
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';
import { useState, useEffect } from 'react';
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
    latitude: 45,
    longitude: 15,
    zoom: 7,
  });

  // const [showPopup, setShowPopup] = useState(true);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [typeACheck, setTypeACheck] = useState(true);
  const [typeBCheck, setTypeBCheck] = useState(true);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  // const handleAddClick = (e) => {
  //   console.log(e.lngLat);
  //   const longitude = e.lngLat.lng;
  //   const latitude = e.lngLat.lat;
  //   // console.log([longitude, latitude]);
  //   setViewport({ ...viewport, latitude: latitude, longitude: longitude });
  //   setNewPlace({
  //     lat: latitude,
  //     long: longitude,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newPin = {
  //     username: currentUsername,
  //     title,
  //     desc,
  //     // rating: star,
  //     lat: newPlace.lat,
  //     long: newPlace.long,
  //     type: 'A',
  //   };

  //   try {
  //     const res = await axios.post('/pins', newPin);
  //     setPins([...pins, res.data]);
  //     setNewPlace(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleOnClose = () => {
    setCurrentPlaceId(null);
    console.log(currentPlaceId);
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
    <div>
      <Map
        {...viewport}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        // onDblClick={currentUsername && handleAddClick}
      >
        <GeolocateControl />
        <FullscreenControl />
        <NavigationControl />
        <ScaleControl />
        {pins.map((p) => (
          <>
            {/* <Marker
              key={p._id}
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            > */}
            {/* <parse({p.icon}) style={{ fontSize: viewport.zoom * 5, color: 'red' }} /> */}

            {p.type === 'A' && typeACheck && (
              <Marker
                key={p._id}
                longitude={p.long}
                latitude={p.lat}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
                // anchor="bottom"
              >
                <AcUnit
                  key={p._id}
                  className="markerAcUnit"
                  style={{ fontSize: viewport.zoom * 5 }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                  // onMouseEnter={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
            )}

            {p.type === 'B' && typeBCheck && (
              <Marker
                key={p._id}
                longitude={p.long}
                latitude={p.lat}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
                // anchor="bottom"
              >
                <Room
                  key={p._id}
                  className="markerRoom"
                  style={{ fontSize: viewport.zoom * 5 }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                  // onMouseEnter={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
            )}
            {/* </Marker> */}
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                onClose={handleOnClose}
                // onClose={() => setShowPopup(false)}
              >
                <div className="card">
                  <label>Evento</label>
                  <p className="desc">{p.title}</p>
                  <label>Information</label>
                  <p>{p.description}</p>
                  <span className="username">
                    Created by <b>{p.organiser}</b>
                  </span>
                  {/* <span className="date">{format(p.createdAt)}</span> */}
                </div>
              </Popup>
            )}
          </>
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
  );
}

export default Home;
