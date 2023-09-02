import React from 'react';
import Navbar from '../components/Navbar';
import LoginCard from '../components/LoginCard';


const Login = () => {
  const handleLogin = (username, password) => {
    console.log('Login attempt:', username, password);
  };

  return (

      <div style={{ textAlign: 'center' }}>
        <LoginCard onLogin={handleLogin} />
      </div>
  );
};

export default Login;
