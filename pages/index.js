import React, { useState, useEffect, useRef } from 'react';
// import useSupercluster from 'use-supercluster';
import axios from 'axios';

import Map from '../components/map/map';
import EventsFilter from '../components/events/events-filter';
import EventsFilterMobile from '../components/events/events-filter-mobile';
import EventList from '../components/events/event-list';
import SwitchTab from '../components/mobile/switch-tab';

const Home = () => {
  // MAP
  const [bounds, setBounds] = useState([
    10.603240966796875, 44.636030435233096, 12.396759033203125,
    46.15377768145734,
  ]);
  const [zoom, setZoom] = useState(13);
  const [coordinates, setCoordinates] = useState({
    lat: 45.76,
    lng: 11.73,
  });

  // SELECTION
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentMarker, setCurrentMarker] = useState({});

  // EVENTS
  // const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [events, setEvents] = useState([]);

  // FILTER EVENTS
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const sett = today.setDate(today.getDate() + 7);
  const oneWeek = new Date(sett);
  const oneWeekISO = oneWeek.toISOString().split('T')[0];

  const [firstDate, setFirstDate] = useState(todayISO);
  const [lastDate, setLastDate] = useState(oneWeekISO);

  const [categoryCheck, setCategoryCheck] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  // Dropdown menu

  const [isOpen, setIsOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // MOBILE
  const [mapHeight, setMapHeight] = useState(null);
  const [mobileView, setMobileView] = useState(null);
  const [showList, setShowList] = useState(false);
  const [mapSelected, setMapSelected] = useState(true);

  // const mapHeightRef = useRef(mapHeight);
  // mapHeightRef.current = mapHeight;

  const calcHeight = () => {
    if (window.innerWidth <= 820) {
      setMobileView(true);
      if (mapSelected) {
        setShowList(false);
        // console.log(`mobileView: ${mobileView}`);
        return '600px';
      } else {
        // setShowList(true);
        return;
      }
    } else {
      setMobileView(false);
      setShowList(true);
      // console.log(`mobileView: ${mobileView}`);
      return '80vh';
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // console.log('This will run after 1 second!');
  //     setMapHeight('50vh');
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    setMapHeight(calcHeight());
    // setTimeout(calcHeightAgain(), 2000);
  }, [calcHeight]);

  // useEffect(() => {
  //   const getEvents = async () => {
  //     try {
  //       const retrievedEvents = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API}/events/`
  //       );
  //       setEvents(retrievedEvents.data);
  //       console.log('RECUPERATI EVENTI DAL GET');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getEvents();
  //   console.log('Questi sono gli eventi trovati:');
  //   console.log(events);
  // }, []);

  useEffect(() => {
    // if (bounds) {
    const getEvents = async () => {
      // console.log('THESE ARE THE BOUNDS FROM useEffect:');
      // console.log(bounds);
      // setIsLoadingEvents(true);
      const blLat = bounds[1];
      const trLat = bounds[3];
      const blLong = bounds[0];
      const trLong = bounds[2];

      const types = categoryCheck.map((tipo, index) => {
        if (tipo) {
          return index;
        } else {
          return 1000;
        }
      });

      const filterParams = {
        firstDate,
        lastDate,
        trLat,
        trLong,
        blLat,
        blLong,
        types,
      };

      // console.log(filterParams);
      try {
        const retrievedEvents = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/events/`,
          filterParams
        );
        setEvents(retrievedEvents.data);
        // setIsLoadingEvents(false);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, [firstDate, lastDate, bounds, categoryCheck]);

  // useEffect(() => {
  //   // if (bounds) {
  //   const getEvents = async () => {
  //     // console.log('THESE ARE THE BOUNDS FROM useEffect:');
  //     // console.log(bounds);
  //     // setIsLoadingEvents(true);
  //     const blLat = bounds[1];
  //     const trLat = bounds[3];
  //     const blLong = bounds[0];
  //     const trLong = bounds[2];

  //     // const types = categoryCheck.map((tipo, index) => {
  //     //   if (tipo) {
  //     //     return index + 1;
  //     //   } else {
  //     //     return 0;
  //     //   }
  //     // });

  //     try {
  //       const retrievedEvents = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API}/events/${firstDate}/${lastDate}/${trLat}/${trLong}/${blLat}/${blLong}`
  //       );
  //       setEvents(retrievedEvents.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getEvents();
  // }, [firstDate, lastDate, bounds]);

  // useEffect(() => {
  //   if (currentMarker !== {}) {
  //     const currMarkerLat = currentMarker.latitude;
  //     const currMarkerLng = currentMarker.longitude;
  //     // mapRef.current.panTo({ lat, lng });
  //     // mapRef.current.setZoom(15);

  //     setCoordinates({ lat: currMarkerLat, lng: currMarkerLng });
  //     // console.log(currentMarker);
  //     // console.log(coordinates);
  //     // setZoom(12);
  //     // setCurrentMarker(null);
  //   }
  //   setCoordinates({ lat: 45.4, lng: 11.5 });
  // }, [currentMarker]);

  const handleOnClick = () => {
    console.log('click');
    setCurrentPlaceId(null);

    if (isOpen) {
      setIsOpen(false);
    }

    if (isDateDropdownOpen) {
      setIsDateDropdownOpen(!isDateDropdownOpen);
    }
  };

  return (
    // <div className="container-fluid">
    <div className="mainAppContainer">
      <div className="appRow">
        {/* <div className="col-lg-12"> */}
        {mobileView ? (
          <EventsFilterMobile
            categoryCheck={categoryCheck}
            setCategoryCheck={setCategoryCheck}
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            setIsDateDropdownOpen={setIsDateDropdownOpen}
          />
        ) : (
          <EventsFilter
            categoryCheck={categoryCheck}
            setCategoryCheck={setCategoryCheck}
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            setIsDateDropdownOpen={setIsDateDropdownOpen}
          />
        )}
      </div>
      {mobileView && (
        <SwitchTab
          mapSelected={mapSelected}
          setMapSelected={setMapSelected}
          showList={showList}
          setShowList={setShowList}
        />
      )}
      <div className="appRow">
        {showList && (
          <EventList
            events={events}
            categoryCheck={categoryCheck}
            setCurrentMarker={setCurrentMarker}
            mobileView={mobileView}
            setMapSelected={setMapSelected}
            setCoordinates={setCoordinates}
            setCurrentPlaceId={setCurrentPlaceId}
            coordinates={coordinates}
          />
        )}
        {mapSelected && (
          <Map
            mapHeight={mapHeight}
            // points={points}
            // clusters={clusters}
            // supercluster={supercluster}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            zoom={zoom}
            setZoom={setZoom}
            categoryCheck={categoryCheck}
            currentPlaceId={currentPlaceId}
            setCurrentPlaceId={setCurrentPlaceId}
            setCurrentMarker={setCurrentMarker}
            mobileView={mobileView}
            currentMarker={currentMarker}
            events={events}
            bounds={bounds}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            setIsDateDropdownOpen={setIsDateDropdownOpen}
          />
        )}
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   try {
//     const retrievedEvents = await axios.get(
//       `${process.env.NEXT_PUBLIC_API}/events/`
//     );
//     // setEvents(retrievedEvents.data);
//     // console.log(events);
//   } catch (err) {
//     console.log(err);
//   }

//   return {
//     props: {
//       allEvents: retrievedEvents,
//     },
//   };
// }

export default Home;
