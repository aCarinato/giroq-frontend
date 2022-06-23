import classes from './update-profile-form.module.css';
import Categories from '../filter/Categories';
import BtnDarkCTA from '../UI/BtnDarkCTA';

function UpdateProfileForm(props) {
  const {
    usernameInput,
    setUsernameInput,
    emailInput,
    passwordInput,
    setPasswordInput,
    categoryCheck,
    setCategoryCheck,
    categoryGroupCheck,
    setCategoryGroupCheck,
    setFilterCtgrTouch,
    formSubmit,
    // error,
  } = props;
  return (
    <div className={classes.container}>
      <form onSubmit={formSubmit}>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="username">
            Nome:
          </label>
          <input
            className={classes.input}
            type="text"
            id="username"
            required
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            // ref={usernameInputRef}
          />
        </div>
        {/* <div className={classes.field}>
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
        </div> */}
        <div className={classes.field}>
          <label className={classes.label} htmlFor="password">
            Password:
          </label>
          <input
            className={classes.input}
            type="password"
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="password">
            Seleziona gli eventi di tuo interesse:
          </label>
          <Categories
            categoryCheck={categoryCheck}
            setCategoryCheck={setCategoryCheck}
            categoryGroupCheck={categoryGroupCheck}
            setCategoryGroupCheck={setCategoryGroupCheck}
            setFilterCtgrTouch={setFilterCtgrTouch}
          />
        </div>

        <div className={classes.field}>
          <BtnDarkCTA
            type="submit"
            label="Modifica Account"
            onCLickAction={null}
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
