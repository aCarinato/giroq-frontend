import classes from './signup-form.module.css';
import { Icon } from '@iconify/react';

import { useMainContext } from '../../context/Context';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SignupForm(props) {
  const {
    // signupName,
    setSignupName,
    // signupEmail,
    setSignupEmail,
    // signupPassword,
    setSignupPassword,
  } = useMainContext();

  const { setLoginMode } = props;

  //   const nameInputRef = useRef();

  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  //   CHECK INPUT VALIDITY
  const enteredNameIsValid = enteredName.trim() !== '';
  const signupNameIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const router = useRouter();

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordInputChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true);
  };

  const goToPreferences = () => {
    setEnteredNameTouched(true);
    // console.log(nameInputRef.current.value.trim() === '');
    if (!enteredNameIsValid) {
      //   setNameIsValid(false);
      return;
    } else {
      setSignupName(enteredName);
      setSignupEmail(enteredEmail);
      setSignupPassword(enteredPassword);
      setEnteredName('');
      setEnteredEmail('');
      setEnteredPassword('');
      setEnteredNameTouched(false);
      router.push(`/signup-preferenze`);
    }
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
          className={
            signupNameIsInvalid ? classes['input-invalid'] : classes.input
          }
          type="text"
          id="signupName"
          required
          value={enteredName}
          //   onChange={(e) => setEnteredName(e.target.value)}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {signupNameIsInvalid && (
          <p className={classes['input-error']}>
            Inserire un valore per il nome
          </p>
        )}
      </div>
      <div className={classes.field}>
        <label className={classes.label} htmlFor="email">
          Email:
        </label>
        <input
          // onBlur={() => console.log(categoryCheck)}
          className={emailIsValid ? classes.input : classes['input-invalid']}
          type="email"
          id="email"
          required
          // ref={emailInputRef}
          value={enteredEmail}
          onChange={(e) => setEnteredEmail(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label className={classes.label} htmlFor="password">
          Password:
        </label>
        <input
          className={passwordIsValid ? classes.input : classes['input-invalid']}
          type="password"
          id="password"
          required
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
      </div>
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
