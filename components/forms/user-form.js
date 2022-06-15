import classes from './user-form.module.css';
import BtnDarkCTA from '../UI/BtnDarkCTA';

function UserForm(props) {
  const {
    loginMode,
    setLoginMode,
    usernameInputRef,
    emailInputRef,
    passwordInputRef,
    formSubmit,
    error,
  } = props;

  const switchModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  return (
    <div className={classes.container}>
      <form className={classes['user-form']} onSubmit={formSubmit}>
        {loginMode ? (
          <>
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
              {/* <button className="btn btn-outline-primary col-3" type="submit">
                Login
              </button> */}
            </div>
          </>
        ) : (
          <>
            <div className={classes.field}>
              <label className={classes.label} htmlFor="username">
                Nome:
              </label>
              <input
                className={classes.input}
                type="text"
                id="username"
                required
                ref={usernameInputRef}
              />
            </div>
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
              <BtnDarkCTA
                type="submit"
                label="Crea Account"
                onCLickAction={null}
              />
              {/* <button className="btn btn-outline-primary col-3" type="submit">
                Crea Account
              </button> */}
            </div>
          </>
        )}
      </form>
      {error !== null && <p>{error}</p>}
      {loginMode ? (
        <div className={classes.field}>
          <p>
            Non hai un account?{' '}
            <span className={classes.spanLink} onClick={switchModeHandler}>
              Registrati
            </span>
          </p>
        </div>
      ) : (
        <div className={classes.field}>
          <p>
            Sei giá registrato? Vai al tuo{' '}
            <span className={classes.spanLink} onClick={switchModeHandler}>
              account
            </span>
          </p>
        </div>

        //   <div onClick={() => setLoginMode(!loginMode)}>Crea Account</div>
        // ) : (
        //   <div onClick={() => setLoginMode(!loginMode)}>Login</div>
      )}
    </div>
  );
}

export default UserForm;
