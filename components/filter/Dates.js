import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import classes from './Dates.module.css';

function Dates(props) {
  const { firstDate, setFirstDate, lastDate, setLastDate } = props;

  const [minLastDateISO, setMinLastDateISO] = useState(null);
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  useEffect(() => {
    const testDate = new Date(firstDate);

    const dateInterval = testDate.setDate(testDate.getDate() + 1);

    const minLastDate = new Date(dateInterval);
    const minLastDateISO = minLastDate.toISOString().split('T')[0];
    setMinLastDateISO(minLastDateISO);
    // console.log(minLastDateISO);
  }, [firstDate]);

  const selectFirstDate = (e) => {
    setFirstDate(e.target.value);
    // ga.event({
    //   action: 'Filter section',
    //   category: 'Selezione data inizio',
    //   label: '',
    //   value: '9',
    // });
  };

  const selectLastDate = (e) => {
    setLastDate(e.target.value);
    // ga.event({
    //   action: 'Filter section',
    //   category: 'Selezione data fine',
    //   label: '',
    //   value: '9',
    // });
  };

  return (
    <div>
      <div className={`${classes.title}`}>
        <span className={classes['span-bold']}>DATE</span>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Icon icon="ant-design:calendar-outlined" /> Data inizio:
        </div>
        <div>
          <input
            type="date"
            id="first-date"
            min={todayISO}
            name="first-date"
            value={firstDate}
            onChange={selectFirstDate}
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Icon icon="ant-design:calendar-outlined" /> Data fine:
        </div>
        <div>
          <input
            type="date"
            id="last-date"
            min={minLastDateISO}
            name="last-date"
            value={lastDate}
            onChange={selectLastDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Dates;
