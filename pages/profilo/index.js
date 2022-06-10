import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useMainContext } from '../../context/Context';

function ProfiloUtente() {
  const { username, isLoggedIn, logout } = useMainContext();

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/user-login');
    }
  }, []);

  const logoutHandler = async () => {
    logout();
    router.push('/user-login');
  };

  return (
    <Fragment>
      {isLoggedIn && (
        <>
          <div>Profilo di {username}</div>
          <div onClick={logoutHandler}>Logout</div>
        </>
      )}
    </Fragment>
  );
}

export default ProfiloUtente;
