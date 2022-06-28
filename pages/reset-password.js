import axios from 'axios';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ResetPasswordForm from '../components/forms/reset-password-form';
import Wrapper5095 from '../components/UI/Wrapper5095';
import ErrorParagraph from '../components/UI/ErrorParagraph';

import { useMainContext } from '../context/Context';

function ResetPassword() {
  // const [email, setEmail] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [secret, setSecret] = useState('');
  // const [ok, setOk] = useState(false);
  // const [loading, setLoading] = useState(false);

  const { authState } = useMainContext();

  const emailInputRef = useRef();
  const newPasswordInputRef = useRef();
  const secretInputRef = useRef();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredSecret = secretInputRef.current.value;
    const enteredPassword = newPasswordInputRef.current.value;

    try {
      const resetCredentials = {
        email: enteredEmail,
        secret: enteredSecret,
        newPassword: enteredPassword,
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/reset-password`,
        resetCredentials
      );

      if (data.error) {
        setErrorMessage(data.error);
      }

      if (data.success) {
        setSuccessMessage(data.success);
      }

      emailInputRef.current.value = '';
      secretInputRef.current.value = '';
      newPasswordInputRef.current.value = '';
    } catch (err) {
      console.log(err);
    }
  };

  if (authState && authState.token) router.push('/');

  return (
    <div>
      <ResetPasswordForm
        email={emailInputRef}
        password={newPasswordInputRef}
        secret={secretInputRef}
        formSubmit={submitHandler}
      />
      {successMessage !== '' && (
        <Wrapper5095 shadow={false}>
          <p>
            {successMessage}.{' '}
            <Link href="/user-login">
              <a>Login</a>
            </Link>
          </p>
        </Wrapper5095>
      )}
      {errorMessage !== '' && (
        <Wrapper5095 shadow={false}>
          <ErrorParagraph text={errorMessage} />
        </Wrapper5095>
      )}
    </div>
  );
}

export default ResetPassword;
