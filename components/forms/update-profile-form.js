import classes from './update-profile-form.module.css';
import Categories from '../filter/Categories';
import BtnDarkCTA from '../UI/BtnDarkCTA';
import BtnLightCTA from '../UI/BtnLightCTA';
import { useRouter } from 'next/router';

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
    // setNoCategoriesSelection,
    formSubmit,
    // error,
  } = props;

  const router = useRouter();

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
            // setNoCategoriesSelection={setNoCategoriesSelection}
          />
        </div>

        {/* <div className={classes['flex-row']}> */}
        <div className={classes['flex-row']}>
          <BtnDarkCTA
            type="submit"
            label="Modifica Account"
            onCLickAction={null}
          />
          <BtnLightCTA
            type="button"
            label="Cancella"
            onCLickAction={() => router.push('/profilo')}
          />
        </div>
        {/* </div> */}
      </form>
    </div>
  );
}

export default UpdateProfileForm;
