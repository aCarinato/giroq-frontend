import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMainContext } from '../../context/Context';

import LoaderList from '../../components/events/loader-list';
import UserProfile from '../../components/user/user-profile';

import UserRoute from '../../components/routes/user-route';

function Profilo() {
  const { authState, logout } = useMainContext();
  // LOADING DATA
  const [loading, setLoading] = useState(false);

  const [preferences, setPreference] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/user/${authState.username}`
        );
        //   console.log(data);
        setUser(data);
        setPreference(data.preferences);
      } catch (err) {
        console.log(err);
      }
      // router.push(`/profilo/${authState.username}`);
      // console.log(user);
      setLoading(false);
    };
    if (authState !== null) {
      fetchUser();
    } else {
      router.push('/user-login');
    }
  }, [authState]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/events/`
        );

        let selectedEvents = [];

        selectedEvents = events.data.filter((event) =>
          preferences.includes(event.category[0])
        );
        setUserEvents(selectedEvents);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [authState, preferences]);

  const logoutHandler = () => {
    logout();
    router.push('/user-login');
  };

  return (
    <UserRoute>
      <>
        {loading ? (
          <LoaderList />
        ) : (
          <UserProfile
            username={user.username}
            events={userEvents}
            logoutHandler={logoutHandler}
          />
        )}
      </>
    </UserRoute>
  );
}

export default Profilo;
