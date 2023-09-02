import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const Navbar = ({ children }) => {
  const { authToken, setAuthToken } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
  try {
    await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/logout', {
      headers: {
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Clear the token from local storage
    localStorage.removeItem('authToken');

    // setAuthToken(null);

    router.push('/login');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className={`nav-item ${router.pathname === '/main' ? 'active' : ''}`}>
              <Link href="/main" className="nav-link text-white">Home</Link>
            </li>
            {!authToken ? (
              <li className={`nav-item ${router.pathname === '/login' ? 'active' : ''}`}>
                <Link href="/login" className="nav-link text-white">Login</Link>
              </li>
            ) : (
              <>
                <li className={`nav-item ${router.pathname === '/profile' ? 'active' : ''}`}>
                  <Link href="/profile" className="nav-link text-white">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link text-white" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        {children}
      </div>
    </div>
  );
};

export default Navbar;
