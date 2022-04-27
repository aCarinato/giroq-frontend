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
    setCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    // uploadImg,
    image,
    link,
    setLink,
    handleAddEvent,
    // imageUpload,
    handleImage,
    categories,
  } = props;

  const selectCategory = (e) => {
    const categories = [];
    categories.push(Number(e.target.value));
    setCategory(categories);
    console.log(categories);
  };

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
            Nome evento
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
            Descrizione
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
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="type">
            Categoria
          </label>
          <select
            className={classes.formInput}
            name="type"
            onChange={selectCategory}
          >
            <option value="">--Seleziona Categoria--</option>
            {/* <option value="1">tipo A</option>
            <option value="2">tipo B</option> */}
            {categories.map((category, index) => (
              <option key={index} value={String(index)}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="event-startDate">
            Data inizio
          </label>
          <input
            className={classes.formInput}
            type="date"
            id="event-startDate"
            name="event-startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="event-endDate">
            Data fine <span style={{ color: 'red' }}>(facoltativo)</span>
          </label>
          <input
            className={classes.formInput}
            type="date"
            id="event-endDate"
            name="event-endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol}>Orario inizio</label>
          <input
            className={classes.formInput}
            type="time"
            id="start-time"
            name="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol}>
            Orario fine <span style={{ color: 'red' }}>(facoltativo)</span>
          </label>
          <input
            className={classes.formInput}
            type="time"
            id="end-time"
            name="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol} htmlFor="link">
            Link
          </label>
          <input
            className={classes.formInput}
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.formCol}>Carica immagine</label>
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
