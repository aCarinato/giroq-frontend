import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import AddOrganiserForm from '../../components/forms/add-organiser-form';

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
      // console.log(newOrganiser);

      const res = axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/organiser`,
        newOrganiser
      );

      // console.log(res);

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
      <h3>Aggiungi Organizzatore</h3>
      <div className="row">
        {isLoggedIn && (
          <>
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <AddOrganiserForm
                nameInputRef={nameInputRef}
                addressInputRef={addressInputRef}
                latInputRef={latInputRef}
                longInputRef={longInputRef}
                formSubmit={formSubmit}
              />
            </div>
            <div className="col-lg-4"></div>
          </>
        )}
      </div>
      <p>Log-in per aggiungere nuovo Organizzatore</p>
      <button>
        <Link href="/login">Login</Link>
      </button>
      <p>Aggiungere nuovo Evento</p>
      <button>
        <Link href="/nuovo">Nuovo</Link>
      </button>
    </div>
  );
}

export default AddOrganiser;
