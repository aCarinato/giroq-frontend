import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function AddOrganiser() {
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const longInputRef = useRef();
  const latInputRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrganiser = {
        name: nameInputRef.current.value,
        address: addressInputRef.current.value,
        long: longInputRef.current.value,
        lat: latInputRef.current.value,
      };
      console.log(newOrganiser);

      const res = axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/organiser`,
        newOrganiser
      );

      //   Reset values after submit
      nameInputRef.current.value = '';
      addressInputRef.current.value = '';
      longInputRef.current.value = null;
      latInputRef.current.value = null;
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

  return (
    <div>
      <p>Aggiungi Organizzatore</p>
      {isLoggedIn && (
        <form onSubmit={formSubmit}>
          <label htmlFor="organiser">Organizzatore</label>
          <input
            type="text"
            id="organiser"
            name="organiser"
            ref={nameInputRef}
          />
          <label htmlFor="address">Indirizzo</label>
          <input
            type="text"
            id="address"
            name="address"
            ref={addressInputRef}
          />
          <label htmlFor="lat">Lat</label>
          <input
            type="number"
            step=".1"
            id="lat"
            name="lat"
            ref={latInputRef}
          />
          <label htmlFor="long">Long</label>
          <input
            type="number"
            step=".1"
            id="long"
            name="long"
            ref={longInputRef}
          />
          <br></br>
          <button className="btn btn-outline-primary col-12" type="submit">
            Aggiungi Organizzatore
          </button>
        </form>
      )}
      <p>Log-in per aggiungere nuovo Organizzatore</p>
      <button>
        <Link href="/login">Login</Link>
      </button>
    </div>
  );
}

export default AddOrganiser;
