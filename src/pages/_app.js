import { AuthProvider } from '../context/AuthContext';
import { LikedFoodsProvider } from '../context/LikedFoodsContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function MyApp({ Component, pageProps }) {
  return (
    <LikedFoodsProvider>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    </LikedFoodsProvider>
  );
}

export default MyApp;
