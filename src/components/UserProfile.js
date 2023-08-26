import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    const apiUrl = 'https://api-bootcamp.do.dibimbing.id/api/v1/user';
    

    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              {user ? (
                <>
                  <h2 className="card-title">{user.name}</h2>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">Role: {user.role}</p>
                  <img src={user.profilePictureUrl} alt="Profile" className="img-fluid rounded-circle mb-3" />
                  <p className="card-text">Phone Number: {user.phoneNumber}</p>
                </>
              ) : (
                <p className="card-text">Loading...</p>
              )}
             <Link href="/updateprofile">
                <button className="btn btn-primary mt-3">
                  Update Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
