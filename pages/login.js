import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { useContext, useState } from 'react';
// import { UserContext } from '../context';
// import AuthContext from '../store/auth-context';

function Login() {
  //   if (typeof window !== 'undefined') {
  //     const myStorage = window.localStorage;
  //   }

  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [state, setState] = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/`, {
        password,
      });
      //   const myStorage = window.localStorage;
      //   myStorage.setItem('user', res.data.username);
      // setState({ user: res.data.username });

      localStorage.setItem('user', res.data.username);
      setIsLoggedIn(true);
      //   router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');

    if (storedUsername === 'admin') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    // <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
    <div>
      {!isLoggedIn && (
        <form onSubmit={handleLogin}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-outline-primary col-12" type="submit">
            Log in
          </button>
        </form>
      )}
      {isLoggedIn && (
        <button
          className="btn btn-outline-primary col-12"
          type="submit"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </div>
    // </AuthContext.Provider>
  );
}

export default Login;
