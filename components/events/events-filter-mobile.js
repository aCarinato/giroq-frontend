import { Fragment, useState } from 'react';
import Link from 'next/link';
import classes from './events-filter-mobile.module.css';

import DropdownCategories from './dropdown-categories';

import CATEGORIES from '../../data/categories';

import * as ga from '../../lib/google-analytics';

function EventsFilterMobile(props) {
  const {
    categoryCheck,
    setCategoryCheck,
    firstDate,
    setFirstDate,
    lastDate,
    setLastDate,
    // minDate,
    isOpen,
    setIsOpen,
    isDateDropdownOpen,
    setIsDateDropdownOpen,
  } = props;

  const [mainSwitchOpen, setMainSwitchOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const [categoryGroupCheck, setCategoryGroupCheck] = useState([
    true,
    true,
    true,
    true,
  ]);

  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const dateInterval = today.setDate(today.getDate() + 1);
  const minLastDate = new Date(dateInterval);
  const minLastDateISO = minLastDate.toISOString().split('T')[0];

  // const handleClick = () => {
  //   setFilterVisible(!filterVisible);

  //   ga.event({
  //     action: 'open_filter',
  //     category: 'selection',
  //     label: 'Filter clicked',
  //     value: 'Valore',
  //   });
  // };

  const selectCategoryGroup = (id) => {
    const newTypesCheck = [...categoryCheck];
    const newCategoryGroupCheck = [...categoryGroupCheck];

    if (id === '0') {
      newCategoryGroupCheck[0] = !newCategoryGroupCheck[0];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 0; idx < 5; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[0]) {
          newTypesCheck[idx] = newCategoryGroupCheck[0];
          setCategoryCheck(newTypesCheck);
        }
      }
    }

    if (id === '5') {
      newCategoryGroupCheck[1] = !newCategoryGroupCheck[1];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 5; idx < 13; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[1]) {
          newTypesCheck[idx] = newCategoryGroupCheck[1];
          setCategoryCheck(newTypesCheck);
        }
      }
    }

    if (id === '13') {
      newCategoryGroupCheck[2] = !newCategoryGroupCheck[2];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 13; idx < 20; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[2]) {
          newTypesCheck[idx] = newCategoryGroupCheck[2];
          setCategoryCheck(newTypesCheck);
        }
      }
    }

    if (id === '20') {
      newCategoryGroupCheck[3] = !newCategoryGroupCheck[3];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 20; idx < 25; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[3]) {
          newTypesCheck[idx] = newCategoryGroupCheck[3];
          setCategoryCheck(newTypesCheck);
        }
      }
    }
  };

  // const handleOnClick = () => {
  //   // console.log('click');

  //   setMainSwitchOpen(!mainSwitchOpen)

  //   if (isOpen) {
  //     setIsOpen(false);
  //   }

  //   if (isDateDropdownOpen) {
  //     setIsDateDropdownOpen(!isDateDropdownOpen);
  //   }
  // };

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.mainContainerSmallColumn}
        onClick={() => setMainSwitchOpen(!mainSwitchOpen)}
      >
        <div className={classes.containerFilterSwitch}>
          Seleziona eventi, attivitá e cose da fare vicino a te
        </div>
        {/* <div className={classes.containerFilterSwitchArrow}>
          {mainSwitchOpen ? (
            <div className={classes.filterSwitchArrowUp}></div>
          ) : (
            <div className={classes.filterSwitchArrowDown}></div>
          )}
        </div> */}
      </div>
      {/* {mainSwitchOpen && (
        <> */}
      <div className={classes.mainContainerLargeColumn}>
        <div className={classes.largeColumnColumn}>
          <div className={classes.drowdownWrapper}>
            <div
              className={classes.categoriesDropdown}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className={classes.containerOpener}>
                <div className={classes.containerOpenerLabel}>CATEGORIE</div>
                <div className={classes.containerOpenerArrow}>
                  {isOpen ? (
                    <div className={classes.arrowUp}></div>
                  ) : (
                    <div className={classes.arrowDown}></div>
                  )}
                </div>
              </div>
            </div>
            {isOpen && (
              <div className={classes.categoriesList}>
                {CATEGORIES.map((category) => (
                  <Fragment key={category.id}>
                    <div
                      key={category.id}
                      className={classes.container}
                      onClick={() => selectCategoryGroup(category.id)}
                    >
                      <div className={classes.checkmarkOuter}>
                        {+category.id < 5 &&
                          (categoryGroupCheck[0] ? (
                            <div className={classes.checkmarkSelectedRed}></div>
                          ) : (
                            <div className={classes.checkmark}></div>
                          ))}
                        {+category.id > 4 &&
                          +category.id < 13 &&
                          (categoryGroupCheck[1] ? (
                            <div
                              className={classes.checkmarkSelectedBlue}
                            ></div>
                          ) : (
                            <div className={classes.checkmark}></div>
                          ))}
                        {+category.id > 12 &&
                          +category.id < 20 &&
                          (categoryGroupCheck[2] ? (
                            <div
                              className={classes.checkmarkSelectedYellow}
                            ></div>
                          ) : (
                            <div className={classes.checkmark}></div>
                          ))}
                        {+category.id > 19 &&
                          (categoryGroupCheck[3] ? (
                            <div
                              className={classes.checkmarkSelectedCyan}
                            ></div>
                          ) : (
                            <div className={classes.checkmark}></div>
                          ))}
                      </div>
                      <div className={classes.label}>
                        {category.mainCategory}
                      </div>
                    </div>

                    {category.subCategories.map((cat, index) => (
                      <DropdownCategories
                        key={index + Number(category.id)}
                        id={category.id}
                        index={index}
                        cat={cat}
                        categoryCheck={categoryCheck}
                        setCategoryCheck={setCategoryCheck}
                        categoryGroupCheck={categoryGroupCheck}
                        setCategoryGroupCheck={setCategoryGroupCheck}
                      />
                    ))}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={classes.largeColumnColumn}>
          <div className={classes.drowdownWrapper}>
            <div
              className={classes.categoriesDropdown}
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            >
              <div className={classes.containerOpener}>
                <div className={classes.containerOpenerLabel}>DATE</div>
                <div className={classes.containerOpenerArrow}>
                  {isDateDropdownOpen ? (
                    <div className={classes.arrowUp}></div>
                  ) : (
                    <div className={classes.arrowDown}></div>
                  )}
                </div>
              </div>
            </div>
            {isDateDropdownOpen && (
              <div className={classes.datesList}>
                <form>
                  <label htmlFor="first-date">Seleziona data inizio:</label>
                  <input
                    type="date"
                    id="first-date"
                    min={todayISO}
                    name="first-date"
                    value={firstDate}
                    onChange={(e) => setFirstDate(e.target.value)}
                  />
                  <label htmlFor="last-date">Seleziona data fine:</label>
                  <input
                    type="date"
                    id="last-date"
                    min={minLastDateISO}
                    name="last-date"
                    value={lastDate}
                    onChange={(e) => setLastDate(e.target.value)}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.largeColumnBtn}>
        {/* <div className={classes.btnPost}>Posta Evento o Attività</div> */}
        <Link href="/posta-evento">
          <a target="_blank">
            <button className={classes.btnPost}>Posta il tuo Evento</button>
          </a>
        </Link>
      </div>
      {/* </>
      )} */}
    </div>
  );
}

export default EventsFilterMobile;
