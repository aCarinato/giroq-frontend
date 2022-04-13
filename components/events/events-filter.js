import { Fragment, useState } from 'react';
import classes from './events-filter.module.css';

import CATEGORIES from '../../data/categories';

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

  const [filterVisible, setFilterVisible] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  // const handleClick = () => {
  //   setFilterVisible(!filterVisible);

  //   ga.event({
  //     action: 'open_filter',
  //     category: 'selection',
  //     label: 'Filter clicked',
  //     value: 'Valore',
  //   });
  // };

  const handleCategoryChange = (e) => {
    // console.log(+e.target.value);

    const idx = +e.target.value;
    // if (idx === 0) {
    //   ga.event({
    //     action: 'set_type_A',
    //     category: 'selection',
    //     label: 'Open type A',
    //     value: 'Type A open',
    //   });
    // } else {
    // }

    const newTypesCheck = [...categoryCheck];
    newTypesCheck[idx] = !newTypesCheck[idx];
    setCategoryCheck(newTypesCheck);
  };

  return (
    <div className="row">
      <div
        className={classes.filterSwitch}
        // onClick={() => setFilterVisible(!filterVisible)}
        // onClick={handleClick}
      >
        Seleziona eventi, attivitá e cose da fare vicino a te
      </div>
      {filterVisible && (
        <>
          <div className="col-lg-4"></div>
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
          <div className="col-lg-4">
            <div
              className={classes.categoriesDropdown}
              onClick={() => setIsOpen(!isOpen)}
            >
              CATEGORIE
            </div>
            {isOpen && (
              <div className={classes.categoriesList}>
                {CATEGORIES.map((category) => (
                  <Fragment key={category.id}>
                    <div key={category.id}>{category.mainCategory}</div>

                    {category.subCategories.map((cat, index) => (
                      <div key={index + Number(category.id)}>
                        <input
                          type="checkbox"
                          name={cat}
                          value={index + Number(category.id)}
                          defaultChecked={
                            categoryCheck[index + Number(category.id)]
                          }
                          onChange={handleCategoryChange}
                        />
                        <label>{cat}</label>
                      </div>
                    ))}
                  </Fragment>
                ))}

                {/* <div>{CATEGORIES[0].mainCategory}</div>
                <div>
                  <input
                    type="checkbox"
                    name="typeA"
                    value="0"
                    defaultChecked={categoryCheck[0]}
                    onChange={handleCategoryChange}
                  />
                  <label>Musica</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="typeB"
                    value="1"
                    defaultChecked={categoryCheck[1]}
                    onChange={handleCategoryChange}
                  />
                  <label>Spettacolo</label>
                </div>
                <div>{CATEGORIES[1].mainCategory}</div>
                <div>
                  <input
                    type="checkbox"
                    name="typeA"
                    value="2"
                    defaultChecked={categoryCheck[2]}
                    onChange={handleCategoryChange}
                  />
                  <label>Feste e sagre</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="typeB"
                    value="3"
                    defaultChecked={categoryCheck[3]}
                    onChange={handleCategoryChange}
                  />
                  <label>Vino</label>
                </div> */}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default EventsFilter;
