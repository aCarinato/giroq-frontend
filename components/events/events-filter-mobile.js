import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './events-filter-mobile.module.css';

import DropdownCategories from './dropdown-categories';

import CATEGORIES from '../../data/categories';

import * as ga from '../../lib/google-analytics';

function EventsFilterMobile(props) {
  const {
    categoryCheck,
    setCategoryCheck,
    categoryGroupCheck,
    setCategoryGroupCheck,
    firstDate,
    setFirstDate,
    lastDate,
    setLastDate,
    isOpen,
    setIsOpen,
    isDateDropdownOpen,
    setIsDateDropdownOpen,
    allCategoriesCheck,
    setAllCategoriesCheck,
    setFilterCtgrTouch,
  } = props;

  useEffect(() => {
    if (allCategoriesCheck) {
      setCategoryCheck([
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ]);

      setCategoryGroupCheck([true, true, true, true]);
    } else {
      setCategoryCheck([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
      setCategoryGroupCheck([false, false, false, false]);
    }
  }, [allCategoriesCheck]);

  const clickCategoriesDropdown = () => {
    setIsOpen(!isOpen);

    ga.event({
      action: 'Filter section',
      category: 'Click menu categorie',
      label: 'Selezionare o deselezionare categorie eventi',
      value: '9',
    });
  };

  const clickDatesDropdown = () => {
    setIsDateDropdownOpen(!isDateDropdownOpen);

    ga.event({
      action: 'Filter section',
      category: 'Click menu date',
      label: '',
      value: '9',
    });
  };

  const selectFirstDate = (e) => {
    setFirstDate(e.target.value);

    ga.event({
      action: 'Filter section',
      category: 'Selezione data inizio',
      label: '',
      value: '9',
    });
  };

  const selectLastDate = (e) => {
    setLastDate(e.target.value);

    ga.event({
      action: 'Filter section',
      category: 'Selezione data fine',
      label: '',
      value: '9',
    });
  };

  const clickOnPostEvent = () => {
    window.open('https://www.giroq.com/posta-evento');
    // console.log('posteoo');

    ga.event({
      action: 'Filter section',
      category: 'Click posta il tuo evento',
      label: '',
      value: '9',
    });
  };

  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const dateInterval = today.setDate(today.getDate() + 1);
  const minLastDate = new Date(dateInterval);
  const minLastDateISO = minLastDate.toISOString().split('T')[0];

  const selectCategoryGroup = (id) => {
    setFilterCtgrTouch(true);
    const newTypesCheck = [...categoryCheck];
    const newCategoryGroupCheck = [...categoryGroupCheck];

    // GUSTO E DIVERTIMENTO
    if (id === '0') {
      newCategoryGroupCheck[0] = !newCategoryGroupCheck[0];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 0; idx < 5; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[0]) {
          newTypesCheck[idx] = newCategoryGroupCheck[0];
          setCategoryCheck(newTypesCheck);
        }
      }

      // GA
      if (newCategoryGroupCheck[0]) {
        // console.log('Selezionato gusto e divertimento');
        ga.event({
          action: 'Filter section',
          category: 'Selezionato gusto e divertimento',
          label: '',
          value: '9',
        });
      } else {
        // console.log('Deselezionato gusto e divertimento');
        ga.event({
          action: 'Filter section',
          category: 'Deselezionato gusto e divertimento',
          label: '',
          value: '9',
        });
      }
    }

    // CULTURA E SPETTACOLO
    if (id === '5') {
      newCategoryGroupCheck[1] = !newCategoryGroupCheck[1];
      setCategoryGroupCheck(newCategoryGroupCheck);

      for (let idx = 5; idx < 13; idx++) {
        if (newTypesCheck[idx] !== newCategoryGroupCheck[1]) {
          newTypesCheck[idx] = newCategoryGroupCheck[1];
          setCategoryCheck(newTypesCheck);
        }
      }

      // GA
      if (newCategoryGroupCheck[1]) {
        // console.log('Selezionato cultura e spettacolo');
        ga.event({
          action: 'Filter section',
          category: 'Selezionato cultura e spettacolo',
          label: '',
          value: '9',
        });
      } else {
        // console.log('Deselezionato cultura e spettacolo');
        ga.event({
          action: 'Filter section',
          category: 'Deselezionato cultura e spettacolo',
          label: '',
          value: '9',
        });
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

      // GA
      if (newCategoryGroupCheck[2]) {
        // console.log('Selezionato sport e natura');
        ga.event({
          action: 'Filter section',
          category: 'Selezionato sport e natura',
          label: '',
          value: '9',
        });
      } else {
        // console.log('Deselezionato sport e natura');
        ga.event({
          action: 'Filter section',
          category: 'Deselezionato sport e natura',
          label: '',
          value: '9',
        });
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

      // GA
      if (newCategoryGroupCheck[3]) {
        // console.log('Selezionato expo e acquisti');
        ga.event({
          action: 'Filter section',
          category: 'Selezionato expo e acquisti',
          label: '',
          value: '9',
        });
      } else {
        // console.log('Deselezionato expo e acquisti');
        ga.event({
          action: 'Filter section',
          category: 'Deselezionato expo e acquisti',
          label: '',
          value: '9',
        });
      }
    }
  };

  const handleOnClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }

    if (isDateDropdownOpen) {
      setIsDateDropdownOpen(!isDateDropdownOpen);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.mainContainerSmallColumn}
        // onClick={() => setMainSwitchOpen(!mainSwitchOpen)}
        onClick={handleOnClick}
      >
        <div className={classes.containerFilterSwitch}>
          Seleziona eventi, attività e cose da fare vicino a te
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
              // onClick={() => setIsOpen(!isOpen)}
              onClick={clickCategoriesDropdown}
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
                {/* <div>
                  <button className={classes.btnFilter} onClick={applyFilter}>
                    Applica Filtro
                  </button>
                </div> */}
                {/* <div
                  className={classes.container}
                  onClick={() => setAllCategoriesCheck(!allCategoriesCheck)}
                >
                  <div className={classes.checkmarkOuter}>
                    {allCategoriesCheck ? (
                      <div className={classes.checkmark}>
                        <div className={classes.checkmarkGreyRed}></div>
                      </div>
                    ) : (
                      <div className={classes.checkmark}></div>
                    )}
                  </div>
                  <div className={classes.label}>SELEZIONA TUTTE</div>
                </div> */}
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
                            <div className={classes.checkmark}>
                              <div
                                className={classes.checkmarkSelectedRed}
                              ></div>
                            </div>
                          ) : (
                            <div className={classes.checkmark}></div>
                          ))}
                        {+category.id > 4 &&
                          +category.id < 13 &&
                          (categoryGroupCheck[1] ? (
                            <div className={classes.checkmark}>
                              <div
                                className={classes.checkmarkSelectedBlue}
                              ></div>
                            </div>
                          ) : (
                            <div className={classes.checkmark}></div>
                          ))}
                        {+category.id > 12 &&
                          +category.id < 20 &&
                          (categoryGroupCheck[2] ? (
                            <div className={classes.checkmark}>
                              <div
                                className={classes.checkmarkSelectedYellow}
                              ></div>
                            </div>
                          ) : (
                            <div className={classes.checkmark}></div>
                          ))}
                        {+category.id > 19 &&
                          (categoryGroupCheck[3] ? (
                            <div className={classes.checkmark}>
                              <div
                                className={classes.checkmarkSelectedCyan}
                              ></div>
                            </div>
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
                        setFilterCtgrTouch={setFilterCtgrTouch}
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
              onClick={clickDatesDropdown}
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
                {/* <div>
                  <button className={classes.btnFilter} onClick={applyFilter}>
                    Applica Filtro
                  </button>
                </div> */}
                <form>
                  <label htmlFor="first-date">Seleziona data inizio:</label>
                  <input
                    type="date"
                    id="first-date"
                    min={todayISO}
                    name="first-date"
                    value={firstDate}
                    onChange={selectFirstDate}
                  />
                  <label htmlFor="last-date">Seleziona data fine:</label>
                  <input
                    type="date"
                    id="last-date"
                    min={minLastDateISO}
                    name="last-date"
                    value={lastDate}
                    onChange={selectLastDate}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classes.largeColumnBtn}>
        {/* 
        <Link href="/posta-evento">
          <a target="_blank"> */}
        <button className={classes.btnPost} onClick={clickOnPostEvent}>
          Posta il tuo Evento
        </button>
        {/* </a>
        </Link> */}
      </div>
    </div>
  );
}

export default EventsFilterMobile;
