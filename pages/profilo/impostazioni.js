import { useRouter } from 'next/router';
import UserRoute from '../../components/routes/user-route';
import SettingsOptions from '../../components/user/settings-options';

import { useMainContext } from '../../context/Context';

function Impostazioni() {
  const { logout } = useMainContext();
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.push('/user-login');
  };

  const updateHandler = () => {
    router.push('/profilo/aggiorna');
  };

  return (
    <UserRoute>
      <SettingsOptions
        logoutClick={logoutHandler}
        updateclick={updateHandler}
      />
    </UserRoute>
  );
}

export default Impostazioni;
