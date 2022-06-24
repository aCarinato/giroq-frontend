import classes from './login-form.module.css';
import BtnDarkCTA from '../UI/BtnDarkCTA';

function LoginForm(props) {
  const { setLoginMode, emailInputRef, passwordInputRef, formSubmit, error } =
    props;

  const switchModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  return (
    <div className={classes.container}>
      <form className={classes['user-form']} onSubmit={formSubmit}>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="email">
            Email:
          </label>
          <input
            className={classes.input}
            type="email"
            id="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="password">
            Password:
          </label>
          <input
            className={classes.input}
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.field}>
          <BtnDarkCTA type="submit" label="Login" onCLickAction={null} />
        </div>
      </form>
      {error !== null && <p>{error}</p>}

      <div className={classes.field}>
        <p>
          Non hai un account?{' '}
          <span className={classes.spanLink} onClick={switchModeHandler}>
            Registrati
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
