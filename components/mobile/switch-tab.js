import classes from './switch-tab.module.css';

import * as ga from '../../lib/google-analytics';

function SwitchTab(props) {
  //   const [mapSelected, setMapSelected] = useState(true);

  const { mapSelected, setMapSelected, showList, setShowList } = props;

  const clickMapTab = () => {
    setMapSelected(true);
    setShowList(false);

    ga.event({
      action: 'Switch mappa-lista (mobile)',
      category: 'Click seleziona mappa',
      label: '',
      value: '9',
    });
  };

  const clickListTab = () => {
    setMapSelected(false);
    setShowList(true);

    ga.event({
      action: 'Switch mappa-lista (mobile)',
      category: 'Click seleziona lista',
      label: '',
      value: '9',
    });
  };

  return (
    <div className={classes.switch}>
      {/* <div className="row"> */}
      <div className={classes.col} onClick={clickMapTab}>
        <div className={mapSelected ? classes.tabLeftSelected : classes.tab}>
          <span className={showList ? classes.spanSelected : null}>Mappa</span>
        </div>
      </div>
      <div className={classes.col} onClick={clickListTab}>
        <div className={showList ? classes.tabRightSelected : classes.tab}>
          <span className={showList ? classes.spanSelected : null}>
            Lista Eventi
          </span>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default SwitchTab;
