import { useEffect, useState, useRef, Fragment } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddEventForm from '../../components/forms/add-event-form';
import categoriesList from '../../data/categories-list';
import AddOrganiserForm from '../../components/forms/add-organiser-form';

function AddEvent() {
  const today = new Date().toISOString().split('T')[0];

  const [organiser, setOrganiser] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [long, setLong] = useState('');
  // const [lat, setLat] = useState('');
  const [category, setCategory] = useState([]);
  // const [date, setDate] = useState(today);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [organisers, setOrganisers] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [image, setImage] = useState({});

  const [link, setLink] = useState('');

  // const [imageUpload, setImageUpload] = useState({});

  const [isOrgOpen, setIsOrgOpen] = useState(false);

  const router = useRouter();

  // // // // // // //
  // ORGANISER REFS //
  // // // // // // //

  const nameInputRef = useRef();
  // const addressInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const longInputRef = useRef();
  const latInputRef = useRef();

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrganiser = {
        name: nameInputRef.current.value,
        // address: addressInputRef.current.value,
        street: streetInputRef.current.value,
        city: cityInputRef.current.value,
        long: longInputRef.current.value,
        lat: latInputRef.current.value,
      };
      // console.log(newOrganiser);

      const res = axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/organiser`,
        newOrganiser
      );

      window.location.reload();

      // console.log(res);

      //   Reset values after submit
      nameInputRef.current.value = '';
      // addressInputRef.current.value = '';
      streetInputRef.current.value = '';
      cityInputRef.current.value = '';
      longInputRef.current.value = null;
      latInputRef.current.value = null;
    } catch (err) {
      console.log(err);
    }
  };

  // const uploadImg = async (e) => {
  //   const file = e.target.files[0];
  //   let formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', 'rosacroce');
  //   console.log([...formData]);
  //   try {
  //     const { data } = await axios.post(
  //       'https://api.cloudinary.com/v1_1/dbew5ctqi/image/upload',
  //       formData
  //     );
  //     console.log('uploaded img => ', data);
  //     setImage({
  //       url: data.url,
  //       public_id: data.public_id,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    console.log([...formData]);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/event/upload-image`,
        formData
      );
      // console.log('uploaded image => ', data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const currentOrganiser = organisers.find((org) => org.name === organiser);

      const newEvent = {
        organiser,
        title,
        description,
        street: currentOrganiser.street,
        city: currentOrganiser.city,
        long: currentOrganiser.long,
        lat: currentOrganiser.lat,
        category,
        startDate,
        endDate,
        startTime,
        endTime,
        image,
        link,
      };

      console.log(newEvent);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/event/`,
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
      } catch (err) {
        console.log(err);
      }
    };
    getOrganisers();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4" onClick={() => setIsOrgOpen(!isOrgOpen)}>
          <h4 className="headers-hover">Aggiungi Organizzatore</h4>
        </div>
        <div className="col-lg-4"></div>
      </div>
      {isOrgOpen && (
        <Fragment>
          <div className="row">
            {isLoggedIn && (
              <>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                  <AddOrganiserForm
                    nameInputRef={nameInputRef}
                    // addressInputRef={addressInputRef}
                    streetInputRef={streetInputRef}
                    cityInputRef={cityInputRef}
                    latInputRef={latInputRef}
                    longInputRef={longInputRef}
                    formSubmit={formSubmit}
                  />
                </div>
                <div className="col-lg-4"></div>
              </>
            )}
          </div>
        </Fragment>
      )}

      <h4 className="headers">Aggiungi nuovo evento</h4>
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
                setCategory={setCategory}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                // uploadImg={uploadImg}
                image={image}
                handleAddEvent={handleAddEvent}
                // imageUpload={imageUpload}
                handleImage={handleImage}
                categories={categoriesList}
                link={link}
                setLink={setLink}
              />
            </div>
            <div className="col-lg-4"></div>
          </>
        )}
      </div>
      {!isLoggedIn && (
        <>
          <p>Log-in per aggiungere nuovo evento o nuovo Organizzatore</p>
          <button>
            <Link href="/login">Login</Link>
          </button>
        </>
      )}
      {/* {isLoggedIn && (
        <>
          <h3>Aggiungere nuovo Organizzatore</h3>
          <button>
            <Link href="/organizzatore">Nuovo Organizzatore</Link>
          </button>
        </>
      )} */}
    </div>
  );
}

export default AddEvent;
