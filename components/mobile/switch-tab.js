import { useState } from 'react';
import classes from './switch-tab.module.css';

function SwitchTab() {
  const [mapSelected, setMapSelected] = useState(true);
  return (
    <div className={classes.switch}>
      <div className="row">
        <div className="col" onClick={() => setMapSelected(!mapSelected)}>
          Lista Eventi
        </div>
        <div className="col" onClick={() => setMapSelected(!mapSelected)}>
          Mappa
        </div>
      </div>
    </div>
  );
}

export default SwitchTab;
