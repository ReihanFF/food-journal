import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://api-bootcamp.do.dibimbing.id/api/v1/user';
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJlaWhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI0MDllNGIwMC03NWE2LTRmNTctOGZhYy02YTRiNmZjMjdlNDIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTIzNTM3OTR9.37ojlhoI3e3AwFmFV9AhqxjrNpPEVD6eSMLlFlaTGTg';

    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
      }
    })
    .then(response => {
      setUser(response.data.user);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <img src={user.profilePictureUrl} alt="Profile" />
          <p>Phone Number: {user.phoneNumber}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
