function EventId(props) {
  const { organiser, title, image } = props;
  return (
    <div>
      <h2>{title}</h2>
      <p>Organizzato da: {organiser}</p>
      {image && (
        <div>
          <img src={image.url} alt={title} />
        </div>
      )}
    </div>
  );
}

export default EventId;
