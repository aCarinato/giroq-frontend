import RecommendedEvent from './RecommendedEvent';
import classes from './Ribbon.module.css';

function Ribbon(props) {
  const { type, recommendedEvents } = props;

  const recommendationList = recommendedEvents.map((event) => (
    <RecommendedEvent
      key={event._id}
      id={event._id}
      title={event.title}
      category={event.category}
      startDate={event.startDate}
      endDate={event.endDate}
      startTime={event.startTime}
      endTime={event.endTime}
      image={event.image}
      city={event.city}
    />
  ));

  return (
    <div>
      <br></br>
      {type === 'same' && <div>Della stessa tipologia:</div>}
      {type === 'similar' && <div>Di tipologie affini:</div>}
      <br></br>
      <div className={classes.container}>{recommendationList}</div>
    </div>
  );
}

export default Ribbon;
