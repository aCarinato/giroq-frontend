import classes from './switch-tab.module.css';

function SwitchTab(props) {
  //   const [mapSelected, setMapSelected] = useState(true);

  const { mapSelected, setMapSelected, showList, setShowList } = props;

  const clickMapTab = () => {
    setMapSelected(true);
    setShowList(false);
  };

  const clickListTab = () => {
    setMapSelected(false);
    setShowList(true);
  };

  return (
    <div className={classes.switch}>
      <div className="row">
        <div className="col" onClick={clickMapTab}>
          <div className={mapSelected ? classes.tabSelected : classes.tab}>
            <span className={showList ? classes.spanSelected : null}>
              Mappa
            </span>
          </div>
        </div>
        <div className="col" onClick={clickListTab}>
          <div className={showList ? classes.tabSelected : classes.tab}>
            <span className={showList ? classes.spanSelected : null}>
              Lista Eventi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwitchTab;
