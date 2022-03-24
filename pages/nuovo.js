import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddEventForm from '../components/forms/add-event-form';

function AddEvent() {
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

  const [image, setImage] = useState({});

  // const [imageUpload, setImageUpload] = useState({});

  const router = useRouter();

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
        long: currentOrganiser.long,
        lat: currentOrganiser.lat,
        type,
        date,
        image,
      };

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
                setType={setType}
                date={date}
                setDate={setDate}
                // uploadImg={uploadImg}
                image={image}
                handleAddEvent={handleAddEvent}
                // imageUpload={imageUpload}
                handleImage={handleImage}
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
