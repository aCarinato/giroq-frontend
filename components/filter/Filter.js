import Modal from '../UI/Modal';
import Categories from './Categories';
import Dates from './Dates';

import classes from './Filter.module.css';

import { useMainContext } from '../../context/Context';

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
    nEvents,
    setRenderEvent,
    eventsTemp,
    setFiltersApplied,
  } = props;

  const { setZoom } = useMainContext();

  const resetFilters = () => {
    // DATES
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];

    const interval = today.setDate(today.getDate() + 31);
    const timeInterval = new Date(interval);
    const timeIntervalISO = timeInterval.toISOString().split('T')[0];

    setFirstDate(todayISO);
    setLastDate(timeIntervalISO);
    setFiltersApplied(false);
    // CATEGORIES
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
  };

  return (
    <Modal onClose={onClose}>
      <div className={classes.body}>
        <div className={classes.header}>
          <div className={classes['header-close']} onClick={onClose}>
            X
          </div>
          <div className={classes['header-text']}>Filtri</div>
        </div>
        <div className={classes.footer}>
          <div className={classes['footer-col']}>
            <span className={classes['footer-text']} onClick={resetFilters}>
              Cancella tutto
            </span>
          </div>
          <div className={classes['footer-col']}>
            <button
              className={
                nEvents > 0
                  ? classes['footer-btn']
                  : classes['footer-btn-bigger']
              }
              onClick={() => {
                setRenderEvent(eventsTemp);
                setFiltersApplied(true);
                onClose();
                setZoom(8);
              }}
            >
              {nEvents > 0
                ? nEvents > 1
                  ? `Mostra ${nEvents} eventi`
                  : `Mostra ${nEvents} evento`
                : `Nessun evento disponibile`}
            </button>
          </div>
        </div>
        <div className={classes.content}>
          <Dates
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            lastDate={lastDate}
            setLastDate={setLastDate}
            // setFilterDate={setFilterDate}
          />
          <br></br>
          <Categories
            categoryCheck={categoryCheck}
            setCategoryCheck={setCategoryCheck}
            categoryGroupCheck={categoryGroupCheck}
            setCategoryGroupCheck={setCategoryGroupCheck}
            setFilterCtgrTouch={setFilterCtgrTouch}
            // nEvents={nEvents}
            // nTotEvents={nTotEvents}
          />
          <br></br>
        </div>
        {/* <div className={classes.footer}>
          <div className={classes['footer-col']}>
            <span className={classes['footer-text']} onClick={resetFilters}>
              Cancella tutto
            </span>
          </div>
          <div className={classes['footer-col']}>
            <button
              className={
                nEvents > 0
                  ? classes['footer-btn']
                  : classes['footer-btn-bigger']
              }
              onClick={() => {
                setRenderEvent(eventsTemp);
                setFiltersApplied(true);
                onClose();
                setZoom(8);
              }}
            >
              {nEvents > 0
                ? nEvents > 1
                  ? `Mostra ${nEvents} eventi`
                  : `Mostra ${nEvents} evento`
                : `Nessun evento disponibile`}
            </button>
          </div>
        </div> */}
      </div>
    </Modal>
  );
}

export default Filter;
