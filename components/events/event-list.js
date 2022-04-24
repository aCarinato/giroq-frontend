import { Fragment } from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css';

import { useMainContext } from '../../context/Context';

function EventList(props) {
  const {
    // bounds,
    events,
    categoryCheck,
    setCurrentMarker,
    mobileView,
    setMapSelected,
    setCoordinates,
    setCurrentPlaceId,
    coordinates,
    // setZoom,
  } = props;

  const { eventsCtx } = useMainContext();

  return (
    <div className={classes.colList}>
      {/* <div className={classes.list}> */}
      {eventsCtx.length === 0 && (
        <div>
          IN CARICAMENTO. NESSUN EVENTO PER LE DATE E LUOGHI SELEZIONATI
        </div>
      )}
      {eventsCtx &&
        eventsCtx.length > 0 &&
        eventsCtx.map((event) => (
          <Fragment key={event._id}>
            {categoryCheck[+event.category[0]] && (
              <EventItem
                key={event._id}
                id={event._id}
                // bounds={bounds}
                title={event.title}
                // location={event.location}
                category={+event.category[0]}
                startDate={event.startDate}
                endDate={event.endDate}
                startTime={event.startTime}
                endTime={event.endTime}
                image={event.image}
                setCurrentMarker={setCurrentMarker}
                city={event.city}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
                setCoordinates={setCoordinates}
                coordinates={coordinates}
                setCurrentPlaceId={setCurrentPlaceId}
                // setZoom={setZoom}
              />
            )}
          </Fragment>
        ))}
      {/* </div> */}
    </div>
  );
}

export default EventList;
