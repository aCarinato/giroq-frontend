import classes from './FilterButton.module.css';
import { Icon } from '@iconify/react';

function FilterButton(props) {
  const { setShowFilter, filtersApplied } = props;
  return (
    <div className={classes.container}>
      <div className={classes.slogan}>
        Trova eventi, attività e cose da fare vicino a te!
      </div>
      <button className={classes.btn} onClick={() => setShowFilter(true)}>
        Filtri di ricerca{' '}
        {filtersApplied ? (
          <Icon icon="clarity:filter-grid-circle-solid" />
        ) : (
          <Icon icon="clarity:filter-grid-circle-line" />
        )}
      </button>
    </div>
  );
}

export default FilterButton;
