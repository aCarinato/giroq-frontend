import classes from './user-form.module.css';
import BtnDarkCTA from '../UI/BtnDarkCTA';
import Categories from '../filter/Categories';
// import { useState } from 'react';

function UserForm(props) {
  const {
    loginMode,
    setLoginMode,
    usernameInputRef,
    emailInputRef,
    passwordInputRef,
    categoryCheck,
    setCategoryCheck,
    categoryGroupCheck,
    setCategoryGroupCheck,
    setFilterCtgrTouch,
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
                // onBlur={() => console.log(categoryCheck)}
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
              <label className={classes.label} htmlFor="password">
                Per completare la registrazione seleziona le categorie di eventi
                di tuo interesse:
              </label>
              {/* <Categories
                categoryCheck={categoryCheck}
                setCategoryCheck={setCategoryCheck}
                categoryGroupCheck={categoryGroupCheck}
                setCategoryGroupCheck={setCategoryGroupCheck}
                setFilterCtgrTouch={setFilterCtgrTouch}
              /> */}
            </div>

            <div className={classes.field}>
              <BtnDarkCTA
                type="submit"
                label="Seleziona preferenze"
                onCLickAction={null}
              />
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
