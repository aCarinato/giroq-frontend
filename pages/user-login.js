import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import UserForm from '../components/forms/user-form';

function UserLogin() {
  const [loginMode, setLoginMode] = useState(true);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loginMode) {
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
        console.log('mo pusho');
        router.push('/');
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
        console.log('mo pusho');
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-4"></div>
      <div className="col-lg-4">
        <UserForm
          loginMode={loginMode}
          setLoginMode={setLoginMode}
          usernameInputRef={usernameInputRef}
          emailInputRef={emailInputRef}
          passwordInputRef={passwordInputRef}
          formSubmit={submitHandler}
        />
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
