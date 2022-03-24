import classes from './eventid.module.css';

function EventId(props) {
  const { organiser, title, image } = props;
  return (
    <div>
      <h2>{title}</h2>
      <p>Organizzato da: {organiser}</p>
      <div className={classes.contenitore}>
        {image && (
          <div>
            <img src={image.url} alt={title} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventId;
