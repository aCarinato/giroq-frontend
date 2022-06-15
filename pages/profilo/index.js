import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useMainContext } from '../../context/Context';

import BtnLightCTA from '../../components/UI/BtnLightCTA.js';

function ProfiloUtente() {
  const { username, authState, token, logout } = useMainContext();

  const router = useRouter();

  //   console.log(username);
  //   console.log(authState.username);
  console.log(token);

  useEffect(() => {
    if (token === '') {
      router.push('/user-login');
    }
  }, []);

  const logoutHandler = async () => {
    logout();
    router.push('/user-login');
  };

  return (
    <Fragment>
      {token && (
        <>
          <div>Profilo di {username}</div>
          <br></br>
          <BtnLightCTA
            type="button"
            label="Logout"
            onCLickAction={logoutHandler}
          />
        </>
      )}
    </Fragment>
  );
}

export default ProfiloUtente;
