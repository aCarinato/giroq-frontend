import classes from './signup-form.module.css';
import { Icon } from '@iconify/react';

import { useMainContext } from '../../context/Context';
import { useRouter } from 'next/router';

function SignupForm(props) {
  const {
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
  } = useMainContext();

  const { setLoginMode } = props;

  const router = useRouter();

  //   const goToPreferences = (e) => {
  //     e.preventDefault();
  //     router.push(`/signup-preferenze`);
  //   };
  const goToPreferences = () => {
    router.push(`/signup-preferenze`);
  };

  const switchModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  return (
    <div className={classes.container}>
      {/* <form onSubmit={goToPreferences}> */}
      <div className={classes.field}>
        <label className={classes.label} htmlFor="username">
          Nome:
        </label>
        <input
          className={classes.input}
          type="text"
          id="signupName"
          required
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
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
          // ref={emailInputRef}
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
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
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
      </div>
      {/* <div className={classes.field}>
          <label className={classes.label} htmlFor="password">
            Per completare la registrazione seleziona le categorie di eventi di
            tuo interesse:
          </label>
        </div> */}

      <div>
        <span onClick={goToPreferences} className={classes.link}>
          Seleziona eventi di tuo interesse{' '}
          <Icon icon="akar-icons:arrow-right" />
        </span>
      </div>

      {/* <div className={classes.field}>
          <BtnDarkCTA
            type="submit"
            label="Seleziona preferenze"
            //   onCLickAction={goToPreferences}
            onCLickAction={null}
          />
        </div> */}
      {/* </form> */}
      <div className={classes.field}>
        <p className={classes['small-text']}>
          Sei giá registrato? Vai al tuo{' '}
          <span className={classes.spanLink} onClick={switchModeHandler}>
            account
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
