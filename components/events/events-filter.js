import Link from 'next/link';

function EventsFilter(props) {
  const {
    typeACheck,
    setTypeACheck,
    typeBCheck,
    setTypeBCheck,
    firstDate,
    setFirstDate,
    lastDate,
    setLastDate,
  } = props;
  return (
    <div className="row">
      <div className="col-lg-4">
        <div id="filter-group" className="filter-group">
          <div>
            <input
              type="checkbox"
              id="typeA"
              name="typeA"
              defaultChecked
              // onChange={handleTypeAChange}
              onChange={() => setTypeACheck(!typeACheck)}
            />
            <label htmlFor="typeA">Type A</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="typeB"
              name="typeB"
              defaultChecked
              // onChange={handleTypeBChange}
              onChange={() => setTypeBCheck(!typeBCheck)}
            />
            <label htmlFor="typeB">Type B</label>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <form>
          <label htmlFor="first-date">Seleziona data inizio:</label>
          <input
            type="date"
            id="first-date"
            name="first-date"
            value={firstDate}
            onChange={(e) => setFirstDate(e.target.value)}
          />
          <label htmlFor="last-date">Seleziona data fine:</label>
          <input
            type="date"
            id="last-date"
            name="last-date"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
          />
        </form>
      </div>
      <div className="col-lg-4">
        {' '}
        <button className="btn btn-dark btn-lg btn-download" type="button">
          <Link href="/nuovo">Aggiugi Evento</Link>
        </button>
      </div>
    </div>
  );
}

export default EventsFilter;
