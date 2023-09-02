import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Navbar = ({ children }) => {
  const { authToken } = useAuth();
  const router = useRouter();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link href="/" className="navbar-brand text-white">
          Food Journal
        </Link>
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
                {/* Add a logout link or button here */}
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
