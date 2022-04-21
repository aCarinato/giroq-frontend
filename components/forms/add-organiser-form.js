import classes from './add-organiser-form.module.css';

function AddOrganiserForm(props) {
  const {
    nameInputRef,
    streetInputRef,
    cityInputRef,
    latInputRef,
    longInputRef,
    formSubmit,
  } = props;
  return (
    <form onSubmit={formSubmit}>
      <div className={classes.formRow}>
        <label className={classes.formCol} htmlFor="organiser">
          Organizzatore
        </label>
        <input type="text" id="organiser" name="organiser" ref={nameInputRef} />
      </div>
      <div className={classes.formRow}>
        <label className={classes.formCol} htmlFor="street">
          Via
        </label>
        <input type="text" id="street" name="street" ref={streetInputRef} />
      </div>
      <div className={classes.formRow}>
        <label className={classes.formCol} htmlFor="city">
          Città
        </label>
        <input type="text" id="city" name="city" ref={cityInputRef} />
      </div>
      <div className={classes.formRow}>
        <label className={classes.formCol} htmlFor="lat">
          Lat
        </label>
        <input
          type="number"
          step=".000001"
          id="lat"
          name="lat"
          ref={latInputRef}
        />
      </div>
      <div className={classes.formRow}>
        <label className={classes.formCol} htmlFor="long">
          Long
        </label>
        <input
          type="number"
          step=".000001"
          id="long"
          name="long"
          ref={longInputRef}
        />
      </div>

      <br></br>
      <button className="btn btn-outline-primary col-12" type="submit">
        Aggiungi Organizzatore
      </button>
    </form>
  );
}

export default AddOrganiserForm;
