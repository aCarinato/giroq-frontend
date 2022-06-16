import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import UserForm from '../components/forms/user-form';

import { useMainContext } from '../context/Context';

function UserLogin() {
  const { login, authState, logout } = useMainContext();

  const [loginMode, setLoginMode] = useState(false);

  const [error, setError] = useState(null);

  const [categoryCheck, setCategoryCheck] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [categoryGroupCheck, setCategoryGroupCheck] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [filterCtgrTouch, setFilterCtgrTouch] = useState(false);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

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
          // router.push(`/profilo/${res.data.username}`);
          router.push(`/profilo`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const enteredUsername = usernameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      let types = [];

      const checker = categoryCheck.every((v) => v === false);

      if (checker) {
        types = categoryCheck.map((tipo, index) => {
          return index;
        });
      } else {
        types = categoryCheck.map((tipo, index) => {
          if (tipo) {
            return index;
          } else {
            return 1000;
          }
        });
      }

      const newUser = {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
        preferences: types,
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
          router.push(`/profilo`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (authState && authState.token) {
    // console.log(`Adesso lo pusho a: /profilo`);
    router.push(`/profilo`);
  }

  return (
    <div>
      <UserForm
        loginMode={loginMode}
        setLoginMode={setLoginMode}
        usernameInputRef={usernameInputRef}
        emailInputRef={emailInputRef}
        passwordInputRef={passwordInputRef}
        categoryCheck={categoryCheck}
        setCategoryCheck={setCategoryCheck}
        categoryGroupCheck={categoryGroupCheck}
        setCategoryGroupCheck={setCategoryGroupCheck}
        setFilterCtgrTouch={setFilterCtgrTouch}
        formSubmit={submitHandler}
        error={error}
      />
    </div>
  );
}

export default UserLogin;
