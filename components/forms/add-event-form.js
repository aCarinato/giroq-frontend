import { Fragment } from 'react';
import classes from './add-event-form.module.css';

function AddEventForm(props) {
  const {
    organisers,
    setOrganiser,
    title,
    setTitle,
    description,
    setDescription,
    setType,
    date,
    setDate,
    // uploadImg,
    image,
    handleAddEvent,
    // imageUpload,
    handleImage,
  } = props;

  return (
    <Fragment>
      <form onSubmit={handleAddEvent}>
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="organiser">
            Organizzatore
          </label>
          {/* <input
                  type="text"
                  id="organiser"
                  name="organiser"
                  value={organiser}
                  onChange={(e) => setOrganiser(e.target.value)}
                /> */}
          <select
            className={classes.formInput}
            name="organiser"
            onChange={(e) => setOrganiser(e.target.value)}
          >
            <option value="">--Seleziona organizzatore--</option>
            {organisers.map((organiser) => (
              <option key={organiser._id} value={organiser.name}>
                {organiser.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="title">
            Title
          </label>
          <input
            className={classes.formInput}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="description">
            Description
          </label>
          <input
            className={classes.formInput}
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* <label htmlFor="long">long</label>
                <input
                  type="number"
                  id="long"
                  name="long"
                  value={long}
                  onChange={(e) => setLong(e.target.value)}
                />
                <label htmlFor="lat">lat</label>
                <input
                  type="number"
                  id="lat"
                  name="lat"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                /> */}
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="type">
            tipo
          </label>
          <select
            className={classes.formInput}
            name="type"
            onChange={(e) => setType(Number(e.target.value))}
          >
            <option value="">--Seleziona tipo--</option>
            <option value="1">tipo A</option>
            <option value="2">tipo B</option>
          </select>
          {/* <input
            className={classes.formInput}
            type="text"
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          /> */}
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="event-date">
            Data Evento
          </label>
          <input
            className={classes.formInput}
            type="date"
            id="event-date"
            name="event-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol}>Carica immagini</label>
          {image && image.url && (
            <div className={classes.image}>
              <img src={`${image.url}`} />
            </div>
          )}
          {/* <input onChange={uploadImg} type="file" accept="images/*" /> */}
          <input onChange={handleImage} type="file" accept="images/*" />
        </div>

        <br></br>
        <button className="btn btn-outline-primary col-12" type="submit">
          Aggiungi evento
        </button>
      </form>
    </Fragment>
  );
}

export default AddEventForm;
