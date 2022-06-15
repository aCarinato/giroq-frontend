import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMainContext } from '../../context/Context';

import LoaderList from '../../components/events/loader-list';

import UserRoute from '../../components/routes/user-route';

function userProfile() {
  const { authState, logout } = useMainContext();
  // LOADING DATA
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});

  const router = useRouter();
  // const { username } = router.query;

  // console.log(authState);
  // useEffect(() => {
  //   console.log('ciaoooo');
  //   console.log(authState.username);
  //   if (authState && authState.username !== '') fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/user/${authState.username}`

        // {
        //   headers: {
        //     Authorization: `Bearer ${authState.token}`,
        //   },
        // }
      );
      //   console.log(data);
      setUser(data);
      // console.log(user);
      setLoading(false);
    };
    if (authState !== null) {
      fetchUser();
    } else {
      router.push('/user-login');
    }
  }, [authState]);

  //   useEffect(() => {
  //     if (authState && authState.username !== '' && authState.token !== '') {
  //       if (authState.username === router.query.username) {
  //         fetchUser();
  //       }
  //     } else {
  //       router.push('/user-login');
  //     }
  //   }, [authState, router.query.username]);

  // const fetchUser = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API}/user/${authState.username}`

  //       // {
  //       //   headers: {
  //       //     Authorization: `Bearer ${authState.token}`,
  //       //   },
  //       // }
  //     );
  //     //   console.log(data);
  //     setUser(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setLoading(false);
  // };

  const logoutHandler = () => {
    logout();
    router.push('/user-login');
  };

  //   if (authState.username === '') router.push('/user-login');

  return (
    <UserRoute>
      <>
        {loading ? (
          <LoaderList />
        ) : (
          <>
            <div>Profilo di: {user.username}</div>
            <div>ID: {user._id}</div>
            <div onClick={logoutHandler}>Logout</div>
          </>
        )}
      </>
    </UserRoute>
  );
}

export default userProfile;
