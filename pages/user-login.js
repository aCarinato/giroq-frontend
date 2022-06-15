import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import UserForm from '../components/forms/user-form';

import { useMainContext } from '../context/Context';

function UserLogin() {
  const { login, authState, logout } = useMainContext();

  const [loginMode, setLoginMode] = useState(false);

  const [error, setError] = useState(null);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();
  // console.log('authState:');
  // console.log(authState);

  // useEffect(() => {
  //   if (authState && authState.username !== '') {
  //     console.log('MA PORCA TROIA');
  //     router.push(`/profilo/${authState.username}`);
  //   }
  // }, [authState]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loginMode) {
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

        if (res.data.error) {
          // setShowError(true);
          setError(res.data.error);
        } else {
          login(res.data.username, res.data.email, res.data.token);

          router.push(`/profilo/${res.data.username}`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const enteredUsername = usernameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      const newUser = {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
      };

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/user/signup`,
          newUser
        );

        if (res.data.error) {
          setError(res.data.error);
        } else {
          login(res.data.username, res.data.email, res.data.token);
          router.push(`/profilo/${res.data.username}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (authState && authState.token) {
    console.log(`Adesso lo pusho a: /profilo/${authState.username}`);
    router.push(`/profilo/${authState.username}`);
  }

  return (
    <div>
      <UserForm
        loginMode={loginMode}
        setLoginMode={setLoginMode}
        usernameInputRef={usernameInputRef}
        emailInputRef={emailInputRef}
        passwordInputRef={passwordInputRef}
        formSubmit={submitHandler}
        error={error}
      />
    </div>
  );
}

export default UserLogin;
