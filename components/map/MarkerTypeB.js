import { Room } from '@material-ui/icons';
import Link from 'next/link';

function MarkerTypeB(props) {
  const { key, lat, lng, id } = props;
  return (
    <div className="location-icon">
      <Link href={`/event/${id}`}>
        <a target="_blank">
          <Room key={key} lat={lat} lng={lng} />
        </a>
      </Link>
    </div>
  );
}

export default MarkerTypeB;
