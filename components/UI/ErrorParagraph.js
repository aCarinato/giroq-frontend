import classes from './ErrorParagraph.module.css';

function ErrorParagraph({ text }) {
  return <p className={classes.text}>{text}</p>;
}

export default ErrorParagraph;
