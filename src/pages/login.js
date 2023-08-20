import React from 'react';
import Layout from '../components/Layout';
import LoginCard from '../components/LoginCard';

const Login = () => {
  const handleLogin = (username, password) => {
    console.log('Login attempt:', username, password);
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <LoginCard onLogin={handleLogin} />
      </div>
    </Layout>
  );
};

export default Login;
