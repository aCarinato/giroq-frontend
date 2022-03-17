import classes from './switch-tab.module.css';

function SwitchTab(props) {
  //   const [mapSelected, setMapSelected] = useState(true);

  const { setMapSelected, setShowList } = props;

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
          <span className={classes.tab}>Mappa</span>
        </div>
        <div className="col" onClick={clickListTab}>
          <span className={classes.tab}>Lista Eventi</span>
        </div>
      </div>
    </div>
  );
}

export default SwitchTab;
