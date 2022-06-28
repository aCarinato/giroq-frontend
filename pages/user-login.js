import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import LoginForm from '../components/forms/login-form';
import SignupForm from '../components/forms/signup-form';
import RegistrationWizard from '../components/user/registration-wizard';
import Wrapper5095 from '../components/UI/Wrapper5095';

import { useMainContext } from '../context/Context';

function UserLogin() {
  const { login, authState } = useMainContext();

  const [loginMode, setLoginMode] = useState(false);

  const [error, setError] = useState(null);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    // setShowError(false);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loggingUser = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/login`,
        loggingUser
      );

      // console.log(res);

      if (res.data.error) {
        // setShowError(true);
        setError(res.data.error);
      } else {
        login(
          res.data.username,
          res.data.email,
          res.data.token,
          res.data.preferences
        );
        // router.push(`/profilo/${res.data.username}`);
        router.push(`/profilo`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const submitSignupHandler = () => {
  //   router.push(`/signup-preferences`);
  // };

  if (authState && authState.token) {
    router.push(`/profilo`);
  }

  return (
    <div>
      {!loginMode ? (
        <>
          <RegistrationWizard activeStep={0} />
          <br></br>
          <Wrapper5095 shadow={false}>
            <h4>
              Registrati e resta aggiornato su tutti gli eventi di tuo
              interesse!
            </h4>
          </Wrapper5095>
          <SignupForm setLoginMode={setLoginMode} />
        </>
      ) : (
        <LoginForm
          loginMode={loginMode}
          setLoginMode={setLoginMode}
          usernameInputRef={usernameInputRef}
          emailInputRef={emailInputRef}
          passwordInputRef={passwordInputRef}
          formSubmit={submitLoginHandler}
          error={error}
        />
      )}
    </div>
  );
}

export default UserLogin;
