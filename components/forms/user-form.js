import classes from './user-form.module.css';

function UserForm(props) {
  const {
    loginMode,
    setLoginMode,
    usernameInputRef,
    emailInputRef,
    passwordInputRef,
    formSubmit,
  } = props;
  return (
    <>
      <form className={classes['user-form']} onSubmit={formSubmit}>
        {loginMode ? (
          <>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div>
              {/* <input type="submit" value="Registrati" /> */}
              <button className="btn btn-outline-primary col-3" type="submit">
                Login
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="username">Nome:</label>
              <input
                type="text"
                id="username"
                required
                ref={usernameInputRef}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div>
              {/* <input type="submit" value="Registrati" /> */}
              <button className="btn btn-outline-primary col-3" type="submit">
                Crea Account
              </button>
            </div>
          </>
        )}
      </form>
      {loginMode ? (
        <div onClick={() => setLoginMode(!loginMode)}>Crea Account</div>
      ) : (
        <div onClick={() => setLoginMode(!loginMode)}>Login</div>
      )}
    </>
  );
}

export default UserForm;
