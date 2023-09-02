import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LoginCard = () => {
  const router = useRouter();
  const { setAuthToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api-bootcamp.do.dibimbing.id/api/v1/login',
        {
          email,
          password,
        },
        {
          headers: {
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        }
      );

      const token = response.data.token;
      setAuthToken(token);
      console.log('Token:', token);

      router.push('/main');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-3">
      <div className="text-center mb-3">
      <img src="/logo.jpg" alt="Logo" width="100" height="100" />
        </div>
        <h2 className="mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              aria-label="Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              autoComplete="current-password"
              aria-label="Password"
            />
          </div>
          {error && <p className="text-danger mb-3">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-3">
            Don't have an account?{' '}
            <Link href="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
