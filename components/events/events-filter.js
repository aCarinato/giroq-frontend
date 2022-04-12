import { useState } from 'react';
import classes from './events-filter.module.css';

import * as ga from '../../lib/google-analytics';

function EventsFilter(props) {
  const {
    categoryCheck,
    setCategoryCheck,
    firstDate,
    setFirstDate,
    lastDate,
    setLastDate,
    // minDate,
  } = props;

  const [filterVisible, setFilterVisible] = useState(false);

  const handleClick = () => {
    setFilterVisible(!filterVisible);

    ga.event({
      action: 'open_filter',
      category: 'selection',
      label: 'Filter clicked',
      value: 'Valore',
    });
  };

  const handleCategoryChange = (e) => {
    // console.log(+e.target.value);

    const idx = +e.target.value;
    if (idx === 0) {
      ga.event({
        action: 'set_type_A',
        category: 'selection',
        label: 'Open type A',
        value: 'Type A open',
      });
    } else {
    }

    const newTypesCheck = [...categoryCheck];
    newTypesCheck[idx] = !newTypesCheck[idx];
    setCategoryCheck(newTypesCheck);
  };

  return (
    <div className="row">
      <div
        className={classes.filterSwitch}
        // onClick={() => setFilterVisible(!filterVisible)}
        onClick={handleClick}
      >
        Seleziona eventi, attivitá e cose da fare vicino a te (click per aprire)
      </div>
      {filterVisible && (
        <>
          <div className="col-lg-4">
            <div id="filter-group" className="filter-group">
              <div>
                <input
                  type="checkbox"
                  id="typeA"
                  name="typeA"
                  value="0"
                  defaultChecked
                  onChange={handleCategoryChange}
                />
                <label htmlFor="typeA">Type A</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="typeB"
                  name="typeB"
                  value="1"
                  defaultChecked
                  onChange={handleCategoryChange}
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
                // min={minDate}
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
          <div className="col-lg-4"></div>
        </>
      )}
    </div>
  );
}

export default EventsFilter;
