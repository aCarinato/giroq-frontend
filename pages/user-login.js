import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import UserForm from '../components/forms/user-form';

import { useMainContext } from '../context/Context';

function UserLogin() {
  const { login, isLoggedIn, logout } = useMainContext();

  const [loginMode, setLoginMode] = useState(true);

  const [error, setError] = useState(null);

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
          login(res.data.username, res.data.token);
          router.push('/profilo');
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
          login(res.data.username, res.data.token);
          router.push('/profilo');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logoutHandler = async () => {
    logout();
  };

  return (
    <div className="row">
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        {isLoggedIn ? (
          <div onClick={logoutHandler}>Logout</div>
        ) : (
          <UserForm
            loginMode={loginMode}
            setLoginMode={setLoginMode}
            // showError={showError}
            usernameInputRef={usernameInputRef}
            emailInputRef={emailInputRef}
            passwordInputRef={passwordInputRef}
            formSubmit={submitHandler}
            error={error}
          />
        )}
      </div>
      <div className="col-lg-4"></div>
      {/* {loginMode ? (
        <div onClick={() => setLoginMode(!loginMode)}>Crea Account</div>
      ) : (
        <div onClick={() => setLoginMode(!loginMode)}>Login</div>
      )} */}
    </div>
  );
}

export default UserLogin;
