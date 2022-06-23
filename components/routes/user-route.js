import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoaderList from '../events/loader-list';
import { useMainContext } from '../../context/Context';

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const { authState } = useMainContext();

  useEffect(() => {
    if (authState && authState.token) getCurrentUser();
  }, [authState && authState.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/user/current-user`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (data.ok) setOk(true);
    } catch (err) {
      router.push('/user-login');
      // console.log('na merdAAAAA');
    }
  };

  process.browser &&
    authState === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? <LoaderList /> : <>{children}</>;
};

export default UserRoute;
