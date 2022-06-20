import axios from 'axios';
import { useEffect, useState } from 'react';
import LoaderList from '../../components/events/loader-list';
import EventListByDate from '../../components/events/event-list-date';
import UserRoute from '../../components/routes/user-route';

import { useMainContext } from '../../context/Context';
import { useRouter } from 'next/router';

function TestPage() {
  const { authState, logout } = useMainContext();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});
  const [preferences, setPreference] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  const router = useRouter();

  //   DATES
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const nDays = 60;
  const interval = today.setDate(today.getDate() + nDays);
  const timeInterval = new Date(interval);

  const timeIntervalISO = timeInterval.toISOString().split('T')[0];

  //   //   const [firstDate, setFirstDate] = useState(todayISO);
  //   //   const [lastDate, setLastDate] = useState(timeIntervalISO);

  const getDateArray = (start, end) => {
    let Arr = new Array();
    let dt = new Date(start);
    let endNotISO = new Date(end);
    // console.log(dt <= endNotISO);
    while (dt <= endNotISO) {
      Arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }

    return Arr;
  };

  const dateArray = getDateArray(todayISO, timeIntervalISO);

  //   const dateArray = '2022-06-20';
  //   console.log(dateArray);

  useEffect(() => {
    let cancel = false;

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
    if (authState !== null && !cancel) {
      fetchUser();
    } else {
      router.push('/user-login');
    }

    return () => {
      cancel = true;
    };
  }, [authState]);

  useEffect(() => {
    // let cancel = false;

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

    if (authState !== null) {
      fetchEvents();
    }
  }, [authState, preferences]);
  return (
    <UserRoute>
      <>
        {loading ? (
          <LoaderList />
        ) : (
          <>
            <div className="eventIDtitle">{user.username}</div>
            {dateArray &&
              dateArray.length > 0 &&
              dateArray.map((date, index) => (
                <EventListByDate key={index} date={date} events={userEvents} />
              ))}
          </>
        )}
      </>
    </UserRoute>
  );
}

export default TestPage;
