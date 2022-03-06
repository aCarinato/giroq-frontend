import '../styles/globals.css';
// const bootstrap = require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    // <UserProvider>
    // <AuthContext.Provider value={{ isLoggedIn: false }}>
    <Component {...pageProps} />
    // </AuthContext.Provider> */}
    // </UserProvider> */}
  );
}

export default MyApp;
