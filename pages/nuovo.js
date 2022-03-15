import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

  // const [currentUsername, setCurrentUsername] = useState(
  //   localStorage.getItem('name')
  // );

  const [organiser, setOrganiser] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState(today);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const newEvent = {
        organiser,
        title,
        description,
        long,
        lat,
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

  // useEffect(() => {
  //   localStorage.setItem('name', currentUsername)
  // }, [currentUsername]);

  return (
    <div>
      AddEvent
      <div className="row">
        {isLoggedIn && (
          <>
            <div className="col-lg-4">SX</div>
            <div className="col-lg-4">
              <form onSubmit={handleAddEvent}>
                <label htmlFor="organiser">Organizzatore</label>
                <input
                  type="text"
                  id="organiser"
                  name="organiser"
                  value={organiser}
                  onChange={(e) => setOrganiser(e.target.value)}
                />
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="long">long</label>
                <input
                  type="number"
                  id="long"
                  name="long"
                  value={long}
                  onChange={(e) => setLong(e.target.value)}
                />
                <label htmlFor="lat">lat</label>
                <input
                  type="number"
                  id="lat"
                  name="lat"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
                <label htmlFor="type">tipo</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="event-date">Data Evento</label>
                <input
                  type="date"
                  id="event-date"
                  name="event-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <br></br>
                <button
                  className="btn btn-outline-primary col-12"
                  type="submit"
                >
                  Aggiungi evento
                </button>
              </form>
            </div>
            <div className="col-lg-4">DX</div>
          </>
        )}
      </div>
      {/* </div>
          <div className="col-lg-4">DX</div> */}
      {/* </div> */}
      <p>Log-in per aggiungere nuovo evento</p>
      <button>
        <Link href="/login">Login</Link>
      </button>
    </div>
  );
}

export default AddEvent;
