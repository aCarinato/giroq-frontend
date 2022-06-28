import classes from './login-form.module.css';
import BtnDarkCTA from '../UI/BtnDarkCTA';
// import { useRouter } from 'next/router';
import Link from 'next/link';

function LoginForm(props) {
  const { setLoginMode, emailInputRef, passwordInputRef, formSubmit, error } =
    props;

  // const router = useRouter();

  const switchModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  // const resetPasswordHandler = () => {
  //   router.push('/reset-password');
  // };

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

      <div className={classes.field}>
        <p>
          Password dimenticata?
          {/* <span className={classes.spanLink} onClick={resetPasswordHandler}>
            <small>Reimposta password</small>
          </span> */}
        </p>
        <small>
          <Link href="/reset-password">
            <a>Reimposta password</a>
          </Link>
        </small>
      </div>
    </div>
  );
}

export default LoginForm;
