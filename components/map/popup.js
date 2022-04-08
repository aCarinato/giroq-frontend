import classes from './popup.module.css';
import Link from 'next/link';

function Popup(props) {
  const {
    key,
    id,
    title,
    organiser,
    image,
    lat,
    lng,
    setCurrentPlaceId,
    mobileView,
    setTestId,
  } = props;
  return (
    <div className={classes.wrapper}>
      <div
        onMouseEnter={() => setCurrentPlaceId(id)}
        onMouseLeave={() => setCurrentPlaceId(null)}
        key={key}
        lat={lat}
        lng={lng}
        className={classes.frame}
      >
        {mobileView && (
          <div
            className={classes.close}
            onClick={() => setCurrentPlaceId(null)}
          >
            CHIUDI POPUP X
          </div>
        )}
        <br></br>
        <p className="desc">{title}</p>
        <label>Information</label>
        <span className="username">
          Created by <b>{organiser}</b>
        </span>
        <div className={classes.imageBox}>
          <img src={image.url} alt={title} />
        </div>
        <p>{title}</p>
        <Link href={`/event/${id}`}>
          <a target="_blank">
            <p>Vai all'aevento</p>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Popup;
