import React from 'react';
import Navbar from '../components/Navbar';
import LoginCard from '../components/LoginCard';


const Login = () => {
  const handleLogin = (username, password) => {
    console.log('Login attempt:', username, password);
  };

  return (
    <Navbar>
      <div style={{ textAlign: 'center' }}>
        <LoginCard onLogin={handleLogin} />
      </div>
    </Navbar>
  );
};

export default Login;
