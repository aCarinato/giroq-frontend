import classes from './signup-form.module.css';
import { Icon } from '@iconify/react';

import { useMainContext } from '../../context/Context';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SignupForm(props) {
  const { setSignupName, setSignupEmail, setSignupPassword } = useMainContext();

  const { setLoginMode } = props;

  const router = useRouter();

  //   const nameInputRef = useRef();

  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  //   CHECK INPUT VALIDITY
  const enteredNameIsValid = enteredName.trim() !== '';
  const signupNameIsInvalid = !enteredNameIsValid && enteredNameTouched;

  //   console.log('enteredNameIsValid:');
  //   console.log(enteredNameIsValid);
  //   console.log('enteredNameTouched');
  //   console.log(enteredNameTouched);
  //   console.log('signupNameIsInvalid');
  //   console.log(signupNameIsInvalid);

  const enteredEmailIsValid =
    enteredEmail.trim() !== '' && enteredEmail.includes('@');
  const signupEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  //   console.log(signupEmailIsInvalid);

  const enteredPasswordIsValid =
    enteredPassword.trim() !== '' && enteredPassword.length >= 6;
  const signupPasswordIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid;

  if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid)
    formIsValid = true;

  //   HANDLERS
  //   onChange()
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordInputChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  //   onBlur()
  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true);
  };

  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const passwordInputBlurHandler = (e) => {
    setEnteredPasswordTouched(true);
  };

  const goToPreferences = () => {
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    if (!formIsValid) {
      return;
    } else {
      setSignupName(enteredName);
      setSignupEmail(enteredEmail);
      setSignupPassword(enteredPassword);
      setEnteredName('');
      setEnteredEmail('');
      setEnteredPassword('');
      setEnteredNameTouched(false);
      setEnteredEmailTouched(false);
      setEnteredPasswordTouched(false);
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
          // onChange={(e) => setEnteredName(e.target.value)} // THIS WORKS TOO
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
          className={
            signupEmailIsInvalid ? classes['input-invalid'] : classes.input
          }
          type="email"
          id="email"
          required
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {signupEmailIsInvalid && (
          <p className={classes['input-error']}>
            Inserire un valore valido per l'email
          </p>
        )}
      </div>
      <div className={classes.field}>
        <label className={classes.label} htmlFor="password">
          Password:
        </label>
        <input
          className={
            signupPasswordIsInvalid ? classes['input-invalid'] : classes.input
          }
          type="password"
          id="password"
          required
          value={enteredPassword}
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
        />
        {signupPasswordIsInvalid && (
          <p className={classes['input-error']}>
            Password di almeno 7 caratteri
          </p>
        )}
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
