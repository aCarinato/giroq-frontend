import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddEventForm from '../components/forms/add-event-form';

function AddEvent() {
  // if (typeof window !== 'undefined') {
  //   const myStorage = window.localStorage;
  // }
  // const [currentUsername, setCurrentUsername] = useState(
  //   myStorage.getItem('user')
  // );

  // const [currentUsername, setCurrentUsername] = useState(() => {
  //   const saved = localStorage.getItem('user');
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || '';
  // });
  // if (typeof window !== 'undefined') {
  //   console.log('You are on the browser');
  //   // 👉️ can use localStorage here
  //   const [currentUsername, setCurrentUsername] = useState(() => {
  //     const saved = localStorage.getItem('user');
  //     const initialValue = JSON.parse(saved);
  //     return initialValue || '';
  //   });
  // } else {
  //   console.log('You are on the server');
  //   // 👉️ can't use localStorage
  // }

  const today = new Date().toISOString().split('T')[0];

  const [organiser, setOrganiser] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [long, setLong] = useState('');
  // const [lat, setLat] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState(today);

  const [organisers, setOrganisers] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  // const handleSelect = (e) => {
  //   setOrganiser(e.target.value);
  //   console.log(organiser);
  //   console.log(organisers);
  //   const currentOrganiser = organisers.find((org) => org.name === organiser);
  //   if (currentOrganiser) {
  //     console.log(typeof currentOrganiser.lat);
  //   }
  // };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const currentOrganiser = organisers.find((org) => org.name === organiser);

      const newEvent = {
        organiser,
        title,
        description,
        long: currentOrganiser.long,
        lat: currentOrganiser.lat,
        type,
        date,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/events/`,
        newEvent
      );
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');

    if (storedUsername === 'admin') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getOrganisers = async () => {
      try {
        const reqOrganisers = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/auth/organiser`
        );
        setOrganisers(reqOrganisers.data);
        console.log(organisers);
      } catch (err) {
        console.log(err);
      }
    };
    getOrganisers();
  }, []);
  // useEffect(() => {
  //   localStorage.setItem('name', currentUsername)
  // }, [currentUsername]);

  return (
    <div>
      AddEvent
      <div className="row">
        {isLoggedIn && (
          <>
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <AddEventForm
                organisers={organisers}
                setOrganiser={setOrganiser}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                type={type}
                setType={setType}
                date={date}
                setDate={setDate}
                handleAddEvent={handleAddEvent}
              />
            </div>
            <div className="col-lg-4"></div>
          </>
        )}
      </div>
      <p>Log-in per aggiungere nuovo evento</p>
      <button>
        <Link href="/login">Login</Link>
      </button>
      <p>Aggiungere nuovo Organizzatore</p>
      <button>
        <Link href="/organizzatore">Nuovo</Link>
      </button>
    </div>
  );
}

export default AddEvent;
