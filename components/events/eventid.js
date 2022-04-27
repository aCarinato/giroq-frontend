import classes from './eventid.module.css';

function EventId(props) {
  const {
    organiser,
    title,
    description,
    image,
    street,
    city,
    startDate,
    endDate,
    start,
    end,
    link,
  } = props;

  const humanReadableStartDate = new Date(startDate).toLocaleDateString(
    'it-IT',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  if (endDate) {
    const humanReadableEndDate = new Date(endDate).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <div className={classes.pageWrapper}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.question}>Organizzatore</div>
      <p className={classes.answer}>{organiser}</p>
      <div className={classes.question}>Dove</div>
      <p className={classes.answer}>{`${street}, ${city}`}</p>

      <div className={classes.question}>Quando</div>
      {endDate ? (
        end ? (
          <p
            className={classes.answer}
          >{`dal ${humanReadableStartDate} al ${humanReadableEndDate}, dalle ${start} alle ${end}`}</p>
        ) : (
          <p
            className={classes.answer}
          >{`dal ${humanReadableStartDate} al ${humanReadableEndDate}, alle ${start}`}</p>
        )
      ) : end ? (
        <p
          className={classes.answer}
        >{`il ${humanReadableStartDate}, dalle ${start} alle ${end}`}</p>
      ) : (
        <p
          className={classes.answer}
        >{`il ${humanReadableStartDate}, alle ${start}`}</p>
      )}

      <div className={classes.question}>Descrizione</div>
      <p className={classes.answer}>{description} </p>
      <div className={classes.question}>Scopri di più</div>
      <p className={classes.answer}>
        {' '}
        <a href={link}>{link}</a>
      </p>
      <div>
        {image && <img className={classes.image} src={image.url} alt={title} />}
      </div>
    </div>
  );
}

export default EventId;
