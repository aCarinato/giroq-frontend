import EventItemAdmin from './event-item-admin';

// import { useMainContext } from '../../context/Context';

function PastEventListAdmin(props) {
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
            event={event}
            deleteEvent={deleteEvent}
          />
        ))}
    </div>
  );
}

export default PastEventListAdmin;
