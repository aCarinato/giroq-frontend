import { useState, useEffect, Fragment } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
// import parse from 'html-react-parser';
// import { format } from 'timeago.js';

import EventsFilter from '../components/events/events-filter';
import EventsMap from '../components/events/events-map';
import EventList from '../components/events/event-list';
import SwitchTab from '../components/mobile/switch-tab';
import Map from '../components/map/map';

// import useWindowDimension from '../components/hooks/window-dimension';

function Home() {
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const sett = today.setDate(today.getDate() + 7);
  const oneWeek = new Date(sett);
  const oneWeekISO = oneWeek.toISOString().split('T')[0];

  const [firstDate, setFirstDate] = useState(todayISO);
  const [lastDate, setLastDate] = useState(oneWeekISO);

  const [events, setEvents] = useState([]);

  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [currentMarker, setCurrentMarker] = useState(null);

  const [typeACheck, setTypeACheck] = useState(true);
  const [typeBCheck, setTypeBCheck] = useState(true);

  const [mapHeight, setMapHeight] = useState(null);

  const [mobileView, setMobileView] = useState(null);

  const [mapSelected, setMapSelected] = useState(true);
  // const [listSelected, setListSelected] = useState(false)

  const [showList, setShowList] = useState(false);

  // MAP SETTINGS
  // const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 45.7, lng: 11.5 });
  // lat: 45.7, lng: 11.5
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(9);

  const [viewport, setViewport] = useState({
    latitude: 45.5,
    longitude: 12,
    zoom: 6.75,
  });

  const calcHeight = () => {
    if (window.innerWidth <= 820) {
      setMobileView(true);
      if (mapSelected) {
        setShowList(false);
        console.log(`showList: ${showList}`);
        console.log(`mapSelected: ${mapSelected}`);
        return '500px';
      } else {
        // setShowList(true);
        return 0;
      }
    } else {
      setMobileView(false);
      setShowList(true);
      return '100vh';
    }
  };

  useEffect(() => {
    setMapHeight(calcHeight());
  }, [calcHeight]);

  // useEffect(() => {
  //   // https://developers.google.com/maps/documentation/javascript/geolocation
  //   if ('geolocation' in navigator) {
  //     console.log('Geolocation Available');
  //   } else {
  //     console.log('Not Available');
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       // console.log('Latitude is :', position.coords.latitude);
  //       // console.log('Longitude is :', position.coords.longitude);
  //       setCoordinates({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //     },
  //     () => {
  //       console.log('Unable to retrieve your location');
  //       setCoordinates({
  //         lat: 45.8,
  //         lng: 11.7,
  //       });
  //     }
  //   );
  // }, []);

  useEffect(() => {
    if (bounds) {
      console.log('THESE ARE THE BOUNDS');

      const blLat = bounds.sw.lat;
      const trLat = bounds.ne.lat;
      const blLong = bounds.sw.lng;
      const trLong = bounds.ne.lng;
      // console.log('----------------');
      // console.log('');
      // console.log(`blLat: ${blLat}`);
      // console.log(`blLong: ${blLong}`);
      // console.log(`trLat: ${trLat}`);
      // console.log(`trLong: ${trLong}`);
      // console.log('');
      const getEvents = async () => {
        try {
          const retrievedEvents = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/events/${firstDate}/${lastDate}/${blLat}/${trLat}/${blLong}/${trLong}`
          );
          setEvents(retrievedEvents.data);
        } catch (err) {
          console.log(err);
        }
      };
      getEvents();
    }
  }, [firstDate, lastDate, coordinates, bounds]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <EventsFilter
            typeACheck={typeACheck}
            setTypeACheck={setTypeACheck}
            typeBCheck={typeBCheck}
            setTypeBCheck={setTypeBCheck}
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
            // minDate={firstDate}
          />
        </div>
      </div>
      {mobileView && (
        <SwitchTab
          mapSelected={mapSelected}
          setMapSelected={setMapSelected}
          showList={showList}
          setShowList={setShowList}
        />
      )}
      <div className="row">
        <div className="col-lg-4">
          {showList === true && (
            <EventList
              // bounds={bounds}
              events={events}
              typeACheck={typeACheck}
              typeBCheck={typeBCheck}
              setCurrentMarker={setCurrentMarker}
              viewport={viewport}
              setViewport={setViewport}
              mobileView={mobileView}
              setMapSelected={setMapSelected}
              setCoordinates={setCoordinates}
              setCurrentPlaceId={setCurrentPlaceId}
            />
          )}
        </div>
        <div className="col-lg-8">
          {/* <EventsMap
            mapHeight={mapHeight}
            viewport={viewport}
            setViewport={setViewport}
            events={events}
            typeACheck={typeACheck}
            typeBCheck={typeBCheck}
            currentPlaceId={currentPlaceId}
            setCurrentPlaceId={setCurrentPlaceId}
            currentMarker={currentMarker}
          /> */}
          <Map
            mapHeight={mapHeight}
            bounds={bounds}
            coordinates={coordinates}
            zoom={zoom}
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            events={events}
            typeACheck={typeACheck}
            typeBCheck={typeBCheck}
            currentPlaceId={currentPlaceId}
            setCurrentPlaceId={setCurrentPlaceId}
            mobileView={mobileView}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
