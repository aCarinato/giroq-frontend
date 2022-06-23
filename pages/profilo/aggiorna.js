import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
// import UserForm from '../../components/forms/user-form';
import UpdateProfileForm from '../../components/forms/update-profile-form';
import UserRoute from '../../components/routes/user-route';

import { useMainContext } from '../../context/Context';

function Aggiorna() {
  const { authState, login } = useMainContext();

  const router = useRouter();

  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [usernameInput, setUsernameInput] = useState('');
  const emailInputRef = useRef();
  const [passwordInput, setPasswordInput] = useState('');

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

  const mapPreferences = (preferences) => {
    const mappedArray = preferences.map((item) => {
      if (item === 1000) {
        return false;
      } else {
        return true;
      }
    });
    return mappedArray;
  };

  useEffect(() => {
    let cancel = false;

    const setAllStuff = () => {
      const selectedCategories = mapPreferences(authState.preferences);
      setUsernameInput(authState.username);
      setCategoryCheck(selectedCategories);
    };

    if (authState && authState.username !== '' && !cancel) {
      // const selectedCategories = mapPreferences(authState.preferences);
      // setUsernameInput(authState.username);
      // setCategoryCheck(selectedCategories);
      setAllStuff();
    }

    return () => {
      cancel = true;
    };
  }, [authState && authState.username]);

  const submitHandler = async (e) => {
    e.preventDefault();

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

    const updatedUser = {
      username: usernameInput,
      password: passwordInput,
      preferences: types,
    };

    try {
      // setLoading(true);
      // Make put request to backend
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/user/profile-update`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      login(
        res.data.username,
        res.data.email,
        res.data.token,
        res.data.preferences
      );

      // setLoading(false);
      setSubmitted(true);
      router.push('/profilo');
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (submitted) {
  //     router.push('/profilo');
  //   }
  // }, [submitted]);

  return (
    <UserRoute>
      <div>
        <UpdateProfileForm
          usernameInput={usernameInput}
          setUsernameInput={setUsernameInput}
          emailInputRef={emailInputRef}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          categoryCheck={categoryCheck}
          setCategoryCheck={setCategoryCheck}
          categoryGroupCheck={categoryGroupCheck}
          setCategoryGroupCheck={setCategoryGroupCheck}
          setFilterCtgrTouch={setFilterCtgrTouch}
          formSubmit={submitHandler}
        />
      </div>
    </UserRoute>
  );
}

export default Aggiorna;
