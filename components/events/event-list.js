import { Fragment } from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css';

import { useMainContext } from '../../context/Context';

function EventList(props) {
  const {
    // bounds,
    events,
    // categoryCheck,
    // setCurrentMarker,
    mobileView,
    setMapSelected,
    setShowList,
    setCoordinates,
    setCurrentPlaceId,
    coordinates,
    filterEventsMobile,
    mapSelected,
    // setZoom,
  } = props;

  return (
    <div className={classes.colList}>
      {/* <div className={classes.list}> */}
      {events.length === 0 && (
        <div>
          <p>Nessun risultato per la tua selezione</p>
          <br></br>
          <p>Puoi provare a modificare la ricerca cambiando:</p>
          <ul>
            <li>La zona selezionata, muovendoti nella mappa</li>
            <li>
              Le categorie degli eventi e attivitá, tramite il filtro
              'CATEGORIE'
            </li>
            <li>Le date degli eventi e attivitá, tramite il filtro 'DATE'</li>
          </ul>
        </div>
      )}
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <Fragment key={event._id}>
            {/* {categoryCheck[+event.category[0]] && ( */}
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
              setShowList={setShowList}
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              setCurrentPlaceId={setCurrentPlaceId}
              filterEventsMobile={filterEventsMobile}
              mapSelected={mapSelected}
            />
            {/* )} */}
          </Fragment>
        ))}
    </div>
  );
}

export default EventList;
