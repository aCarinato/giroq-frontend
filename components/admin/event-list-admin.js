import EventItemAdmin from './event-item-admin';

// import { useMainContext } from '../../context/Context';

function EventListAdmin(props) {
  // const { eventData } = useMainContext();
  const { events, deleteEvent } = props;

  return (
    <div>
      {/* {events ? <p>CI SONO EVENTI {events.length}</p> : <p>NON GHE SON</p>} */}
      {events.length === 0 && (
        <div>
          IN CARICAMENTO. NESSUN EVENTO PER LE DATE E LUOGHI SELEZIONATI
        </div>
      )}
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <EventItemAdmin
            key={event._id}
            id={event._id}
            title={event.title}
            startDate={event.startDate}
            endDate={event.endDate}
            event={event}
            organiser={event.organiser}
            deleteEvent={deleteEvent}
            // category={+event.category[0]}

            // startTime={event.startTime}
            // endTime={event.endTime}
            // image={event.image}
            // city={event.city}
            // longitude={event.long}
            // latitude={event.lat}
            // mobileView={mobileView}
            // setMapSelected={setMapSelected}
            // setCoordinates={setCoordinates}
            // coordinates={coordinates}
            // setCurrentPlaceId={setCurrentPlaceId}
          />
        ))}
    </div>
  );
}

export default EventListAdmin;
