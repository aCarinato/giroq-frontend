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

  // const { eventsCtx } = useMainContext();

  return (
    <div className={classes.colList}>
      {/* <div className={classes.list}> */}
      {events.length === 0 && (
        <div>
          IN CARICAMENTO. NESSUN EVENTO PER LE DATE E LUOGHI SELEZIONATI
        </div>
      )}
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <Fragment key={event._id}>
            {categoryCheck[+event.category[0]] && (
              <EventItem
                key={event._id}
                id={event._id}
                title={event.title}
                category={+event.category[0]}
                startDate={event.startDate}
                endDate={event.endDate}
                startTime={event.startTime}
                endTime={event.endTime}
                image={event.image}
                city={event.city}
                longitude={event.long}
                latitude={event.lat}
                mobileView={mobileView}
                setMapSelected={setMapSelected}
                setCoordinates={setCoordinates}
                coordinates={coordinates}
                setCurrentPlaceId={setCurrentPlaceId}
              />
            )}
          </Fragment>
        ))}
      {/* </div> */}
    </div>
  );
}

export default EventList;
