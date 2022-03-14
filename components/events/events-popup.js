import Link from 'next/link';

function EventsPopup(props) {
  const { title, description, organiser, id } = props;
  return (
    <div className="card">
      <label>Evento</label>
      <p className="desc">{title}</p>
      <label>Information</label>
      <p>{description}</p>
      <span className="username">
        Created by <b>{organiser}</b>
      </span>
      <Link href={`/event/${id}`}>Go to page</Link>
    </div>
  );
}

export default EventsPopup;
