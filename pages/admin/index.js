import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';

function AdminDashoardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('admin-user');
    setIsLoggedIn(false);
    router.push('/admin');
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('admin-user');

    if (storedUsername === 'admin') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Fragment>
          <h2 className="headers">Admin Dashboard</h2>
          <br></br>
          <br></br>
          {/* <div className="headers"> */}
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button
                className="btn btn-outline-primary col-12"
                type="submit"
                onClick={() => {
                  router.push('/admin/nuovo');
                }}
              >
                Aggiungi nuovo evento e/o organizzatore
              </button>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button
                className="btn btn-outline-primary col-12"
                type="submit"
                onClick={() => {
                  router.push('/admin/eventi');
                }}
              >
                Modifica eventi
              </button>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button
                className="btn btn-outline-primary col-12"
                type="submit"
                onClick={() => {
                  router.push('/admin/conclusi');
                }}
              >
                Eventi conclusi
              </button>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <br></br>
          <div className="row">
            {' '}
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button
                className="btn btn-outline-primary col-12"
                type="submit"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
            <div className="col-lg-4"></div>
          </div>
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
                router.push('/admin/login');
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
