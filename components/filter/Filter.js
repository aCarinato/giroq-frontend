import React from 'react';
import Modal from '../UI/Modal';
import Categories from './Categories';
import Dates from './Dates';

import classes from './Filter.module.css';

function Filter(props) {
  const {
    firstDate,
    setFirstDate,
    lastDate,
    setLastDate,
    onClose,
    categoryCheck,
    setCategoryCheck,
    categoryGroupCheck,
    setCategoryGroupCheck,
    setFilterCtgrTouch,
  } = props;

  return (
    <Modal onClose={onClose}>
      <div className={classes.body}>
        <div className={classes.header}>
          <div className={classes['header-close']} onClick={onClose}>
            X
          </div>
          <div className={classes['header-text']}>Filtri</div>
        </div>
        <div className={classes.content}>
          <Dates
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
          />
          <br></br>
          <Categories
            categoryCheck={categoryCheck}
            setCategoryCheck={setCategoryCheck}
            categoryGroupCheck={categoryGroupCheck}
            setCategoryGroupCheck={setCategoryGroupCheck}
            setFilterCtgrTouch={setFilterCtgrTouch}
          />
        </div>
        <div className={classes.footer}>
          <div className={classes['footer-col']}>
            <span className={classes['footer-text']}>Cancella selezione</span>
          </div>
          <div className={classes['footer-col']}>
            <button className={classes['footer-btn']}>Mostra eventi</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Filter;
