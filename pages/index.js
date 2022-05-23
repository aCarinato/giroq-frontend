import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoaderMap from '../components/map/loader-map';
import LoaderList from '../components/events/loader-list';
import Map from '../components/map/map';
import EventsFilter from '../components/events/events-filter';
import EventsFilterMobile from '../components/events/events-filter-mobile';
import EventList from '../components/events/event-list';
import SwitchTab from '../components/mobile/switch-tab';
import Filter from '../components/filter/Filter';

import Portale from '../components/portals/Portale';

import * as ga from '../lib/google-analytics';

import { useMainContext } from '../context/Context';

const Home = () => {
  const { setEventData, mobileView, setMobileView } = useMainContext();

  // LOADING DATA
  const [loading, setLoading] = useState(false);

  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);

  // MAP
  const [bounds, setBounds] = useState(null);

  // SELECTION
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  // EVENTS

  // const [events, setEvents] = useState([]);

  // MODAL
  const [showFilter, setShowFilter] = useState(false);

  // FILTER EVENTS
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const sett = today.setDate(today.getDate() + 31);
  const oneWeek = new Date(sett);
  const oneWeekISO = oneWeek.toISOString().split('T')[0];

  const [firstDate, setFirstDate] = useState(todayISO);
  const [lastDate, setLastDate] = useState(oneWeekISO);

  const [allCategoriesCheck, setAllCategoriesCheck] = useState(false);

  const [filterCtgrTouch, setFilterCtgrTouch] = useState(false);

  const [categoryCheck, setCategoryCheck] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [categoryGroupCheck, setCategoryGroupCheck] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // MOBILE
  const [mapHeight, setMapHeight] = useState('');
  // const [mobileView, setMobileView] = useState(null);
  const [showList, setShowList] = useState(false);
  const [mapSelected, setMapSelected] = useState(true);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [nEvents, setNEvents] = useState(null);
  const [nTotEvents, setNTotEvents] = useState(null);
  const [loadingEventsMobile, setLoadingEentsMobile] = useState(false);

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
      setNTotEvents(events.length);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!mobileView) {
      const filterEvents = async () => {
        if (bounds) {
          const tlLng = bounds[0]; // bounds.nw.lng;
          const brLat = bounds[1]; //bounds.se.lat;
          const brLng = bounds[2]; //bounds.se.lng;
          const tlLat = bounds[3]; //bounds.nw.lat;

          let types = [];

          if (filterCtgrTouch) {
            // console.log('CATEGORY FILTER HAS BEEN TOUCHED');
            // types = categoryCheck.map((tipo, index) => {
            //   return index;
            // });
            types = categoryCheck.map((tipo, index) => {
              if (tipo) {
                return index;
              } else {
                return 1000;
              }
            });

            // console.log(types);
          } else {
            const checker = categoryCheck.every((v) => v === false);

            if (checker) {
              types = categoryCheck.map((tipo, index) => {
                return index;
              });
            } else {
              types = categoryCheck.map((tipo, index) => {
                if (tipo) {
                  return index;
                } else {
                  return 1000;
                }
              });
            }
          }

          const filterParams = {
            firstDate,
            lastDate,
            tlLng,
            brLat,
            brLng,
            tlLat,
            types,
          };

          try {
            const retrievedEvents = await axios.post(
              `${process.env.NEXT_PUBLIC_API}/events/`,
              filterParams
            );
            setRenderEvent(retrievedEvents.data);
          } catch (err) {
            console.log(err);
          }
        }
      };
      filterEvents();
    }
  }, [bounds, categoryCheck, filterCtgrTouch, firstDate, lastDate]);

  // ------------------------- //
  // FUNCTIONS FOR MOBILE VIEW //

  const filterEventsMobile = async () => {
    if (mobileView) {
      setLoadingEentsMobile(true);
      let types = [];

      if (filterCtgrTouch) {
        types = categoryCheck.map((tipo, index) => {
          if (tipo) {
            return index;
          } else {
            return 1000;
          }
        });
      } else {
        const checker = categoryCheck.every((v) => v === false);

        if (checker) {
          types = categoryCheck.map((tipo, index) => {
            return index;
          });
        } else {
          types = categoryCheck.map((tipo, index) => {
            if (tipo) {
              return index;
            } else {
              return 1000;
            }
          });
        }
      }

      const filterParams = {
        firstDate,
        lastDate,
        types,
      };

      try {
        const retrievedEvents = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/events/mobile`,
          filterParams
        );
        setRenderEvent(retrievedEvents.data);
        setNEvents(retrievedEvents.data.length);
      } catch (err) {
        console.log(err);
      }
      setMobileSearch(true);
      setLoadingEentsMobile(false);

      ga.event({
        action: 'Button filter events - mobile',
        category: '',
        label: '',
        value: '9',
      });
    }
  };

  return (
    // <div className="container-fluid">
    <div className="mainAppContainer">
      {mobileView && (
        <div>
          <button onClick={() => setShowFilter(true)}>APRI IL MODALE</button>
        </div>
      )}
      {showFilter && (
        <Filter
          firstDate={firstDate}
          setFirstDate={setFirstDate}
          lastDate={lastDate}
          setLastDate={setLastDate}
          categoryCheck={categoryCheck}
          setCategoryCheck={setCategoryCheck}
          categoryGroupCheck={categoryGroupCheck}
          setCategoryGroupCheck={setCategoryGroupCheck}
          setFilterCtgrTouch={setFilterCtgrTouch}
          onClose={() => setShowFilter(false)}
        />
      )}
      <div className="appRowBlock">
        {/* <div className="col-lg-12"> */}
        {mobileView ? (
          <EventsFilterMobile
            categoryCheck={categoryCheck}
            setCategoryCheck={setCategoryCheck}
            categoryGroupCheck={categoryGroupCheck}
            setCategoryGroupCheck={setCategoryGroupCheck}
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            setIsDateDropdownOpen={setIsDateDropdownOpen}
            allCategoriesCheck={allCategoriesCheck}
            setAllCategoriesCheck={setAllCategoriesCheck}
            setFilterCtgrTouch={setFilterCtgrTouch}
            filterEventsMobile={filterEventsMobile}
            mobileSearch={mobileSearch}
            nEvents={nEvents}
            nTotEvents={nTotEvents}
          />
        ) : (
          <EventsFilter
            categoryCheck={categoryCheck}
            setCategoryCheck={setCategoryCheck}
            categoryGroupCheck={categoryGroupCheck}
            setCategoryGroupCheck={setCategoryGroupCheck}
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            setIsDateDropdownOpen={setIsDateDropdownOpen}
            allCategoriesCheck={allCategoriesCheck}
            setAllCategoriesCheck={setAllCategoriesCheck}
            filterCtgrTouch={filterCtgrTouch}
            setFilterCtgrTouch={setFilterCtgrTouch}
          />
        )}
      </div>
      {mobileView && (
        <SwitchTab
          mapSelected={mapSelected}
          setMapSelected={setMapSelected}
          showList={showList}
          setShowList={setShowList}
          filterEventsMobile={filterEventsMobile}
        />
      )}
      <div className="appRowFlex">
        {showList &&
          (!loading ? (
            <EventList
              events={renderEvent}
              // mobileView={mobileView}
              setMapSelected={setMapSelected}
              setShowList={setShowList}
              setCurrentPlaceId={setCurrentPlaceId}
              filterEventsMobile={filterEventsMobile}
              mapSelected={mapSelected}
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
              currentPlaceId={currentPlaceId}
              setCurrentPlaceId={setCurrentPlaceId}
              // mobileView={mobileView}
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

export default Home;
