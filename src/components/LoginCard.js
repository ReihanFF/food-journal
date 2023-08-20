import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import axios from 'axios';

const LoginCard = () => {
  const router = useRouter(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'https://api-bootcamp.do.dibimbing.id/api/v1/login',
        {
          username,
          password,
        },
        {
          headers: {
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        }
      );

      const { token } = response.data;

      router.push('/main'); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-3">
        <h2 className="mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
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
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
