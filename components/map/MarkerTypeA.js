import { AcUnit } from '@material-ui/icons';
import Link from 'next/link';
import classes from './MarkerTypeA.module.css';

function MarkerTypeA(props) {
  const { key, lat, lng, id } = props;
  return (
    <div className="location-icon">
      <Link href={`/event/${id}`}>
        <a target="_blank">
          <AcUnit className={classes.acunit} key={key} lat={lat} lng={lng} />
        </a>
      </Link>
    </div>
  );
}

export default MarkerTypeA;
