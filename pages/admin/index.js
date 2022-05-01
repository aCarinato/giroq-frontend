import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';

function AdminDashoardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');

    if (storedUsername === 'admin') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Fragment>
          <h2 className="headers">Admin Dashboard</h2>
          <div>Aggiungi nuovo evento e/o organizzatore</div>
        </Fragment>
      ) : (
        <div className="row">
          {' '}
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            {' '}
            <button
              className="btn btn-outline-primary col-12"
              type="submit"
              onClick={() => {
                router.push('/login');
              }}
            >
              Log-in
            </button>
          </div>
          <div className="col-lg-4"></div>
        </div>
      )}
    </div>
  );
}

export default AdminDashoardPage;
