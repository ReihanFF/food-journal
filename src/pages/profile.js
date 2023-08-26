import React from 'react';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';

const Profile = () => {
  return (
    <Navbar>
      <div>Profile</div>
      <UserProfile />
    </Navbar>
  );
};

export default Profile;
