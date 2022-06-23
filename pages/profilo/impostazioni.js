import axios from 'axios';
import { useRouter } from 'next/router';
import UserRoute from '../../components/routes/user-route';
import SettingsOptions from '../../components/user/settings-options';

import { useMainContext } from '../../context/Context';

function Impostazioni() {
  const { authState, logout } = useMainContext();
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.push('/user-login');
  };

  const updateHandler = () => {
    router.push('/profilo/aggiorna');
  };

  const deleteHandler = async () => {
    const answer = window.confirm(
      'Sei sicuro di voler cancellare il tuo account?'
    );

    if (!answer) return;
    // logout()

    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/user/profile-delete`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res.data.message);
      logout();
      router.push('/profilo/conferma-cancellazione');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <SettingsOptions
        logoutClick={logoutHandler}
        updateclick={updateHandler}
        deleteclick={deleteHandler}
      />
    </UserRoute>
  );
}

export default Impostazioni;
