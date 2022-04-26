import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoaderMap from '../components/map/loader-map';
import LoaderList from '../components/events/loader-list';
import Map from '../components/map/map';
import EventsFilter from '../components/events/events-filter';
import EventsFilterMobile from '../components/events/events-filter-mobile';
import EventList from '../components/events/event-list';
import SwitchTab from '../components/mobile/switch-tab';

import { useMainContext } from '../context/Context';

const Home = () => {
  const { setEventData } = useMainContext();

  // LOADING DATA
  const [loading, setLoading] = useState(false);

  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);

  // MAP
  const [bounds, setBounds] = useState(null);

  // SELECTION
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentMarker, setCurrentMarker] = useState({});

  // EVENTS

  // const [events, setEvents] = useState([]);

  // FILTER EVENTS
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const sett = today.setDate(today.getDate() + 90);
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
  const [mapHeight, setMapHeight] = useState('');
  const [mobileView, setMobileView] = useState(null);
  const [showList, setShowList] = useState(false);
  const [mapSelected, setMapSelected] = useState(true);

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

  useEffect(() => {
    setMapHeight(calcHeight());
    // setTimeout(calcHeightAgain(), 2000);
  }, [calcHeight]);

  // RETRIEVE ALL EVENTS ON APP LOADING
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/events/`);
      //Extract the Array contained in the 'events' field.
      const events = res.data;
      // console.log(events);
      //Event data is globally accessible. But 'renderEvent' is just to render out the MAP with the markers
      setEventData(events);
      setRenderEvent(events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // RETRIEVE EVENTS ON FILTERING
  useEffect(() => {
    if (bounds !== null) {
      const getEvents = async () => {
        const tlLng = bounds[0]; // bounds.nw.lng;
        const brLat = bounds[1]; //bounds.se.lat;
        const brLng = bounds[2]; //bounds.se.lng;
        const tlLat = bounds[3]; //bounds.nw.lat;

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
          tlLng,
          brLat,
          brLng,
          tlLat,
          types,
        };

        // console.log(filterParams);
        try {
          const retrievedEvents = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/events/`,
            filterParams
          );
          //   console.log(retrievedEvents);
          setRenderEvent(retrievedEvents.data);
        } catch (err) {
          console.log(err);
        }
      };
      getEvents();
    }
  }, [firstDate, lastDate, bounds, categoryCheck]);

  // const handleOnClick = () => {
  //   console.log('click');
  //   setCurrentPlaceId(null);

  //   if (isOpen) {
  //     setIsOpen(false);
  //   }

  //   if (isDateDropdownOpen) {
  //     setIsDateDropdownOpen(!isDateDropdownOpen);
  //   }
  // };

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
        {showList &&
          (!loading ? (
            <EventList
              events={renderEvent}
              categoryCheck={categoryCheck}
              setCurrentMarker={setCurrentMarker}
              mobileView={mobileView}
              setMapSelected={setMapSelected}
              // setCoordinates={setCoordinates}
              setCurrentPlaceId={setCurrentPlaceId}
              // coordinates={coordinates}
            />
          ) : (
            <LoaderList />
          ))}

        {mapSelected &&
          (!loading ? (
            <Map
              mapHeight={mapHeight}
              setMapHeight={setMapHeight}
              setBounds={setBounds}
              categoryCheck={categoryCheck}
              currentPlaceId={currentPlaceId}
              setCurrentPlaceId={setCurrentPlaceId}
              setCurrentMarker={setCurrentMarker}
              mobileView={mobileView}
              currentMarker={currentMarker}
              events={renderEvent}
              bounds={bounds}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isDateDropdownOpen={isDateDropdownOpen}
              setIsDateDropdownOpen={setIsDateDropdownOpen}
            />
          ) : (
            <LoaderMap />
          ))}
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
