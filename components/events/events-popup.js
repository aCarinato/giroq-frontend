import Link from 'next/link';
import classes from './events-popup.module.css';

function EventsPopup(props) {
  const { title, description, organiser, id, image } = props;
  return (
    <div className={classes.frame}>
      <label>Evento</label>
      <p className="desc">{title}</p>
      <label>Information</label>
      <p>{description}</p>
      <span className="username">
        Created by <b>{organiser}</b>
      </span>
      <div>
        <Link href={`/event/${id}`}>Go to page</Link>
      </div>

      <div>
        <img src={image.url} alt={title} />
      </div>
    </div>
  );
}

export default EventsPopup;
