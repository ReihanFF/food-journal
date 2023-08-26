import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router'; // Import the useRouter

const Navbar = ({ children }) => {
  const { authToken } = useAuth();
  const router = useRouter(); // Initialize the router

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link href="/">
          Food Journal
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${router.pathname === '/main' ? 'active' : ''}`}>
            <Link href="/main">Home</Link>
          </li>
          {!authToken ? (
            <li className={`nav-item ${router.pathname === '/login' ? 'active' : ''}`}>
              <Link href="/login">Login</Link>
            </li>
          ) : (
            <>
              <li className={`nav-item ${router.pathname === '/profile' ? 'active' : ''}`}>
                <Link href="/profile">Profile</Link>
              </li>
              {/* Add a logout link or button here */}
            </>
          )}
        </ul>
      </nav>
      <div className="container mt-4">
        {children}
      </div>
    </div>
  );
};

export default Navbar;
