import RecommendedEvent from './RecommendedEvent';
import classes from './Ribbon.module.css';

function Ribbon(props) {
  const { recommendedEvents } = props;

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
    <div className={classes.container}>
      <br></br>
      <div>Potrebbe anche interessarti:</div>
      {recommendationList}
    </div>
  );
}

export default Ribbon;
