import classes from './switch-tab.module.css';

function SwitchTab(props) {
  //   const [mapSelected, setMapSelected] = useState(true);

  const { mapSelected, setMapSelected } = props;

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
