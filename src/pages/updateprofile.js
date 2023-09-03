import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const UpdateProfilePage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    });
  
    const { authToken } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      // Fetch the user's existing data and pre-fill the form
      async function fetchUserData() {
        try {
          const apiUrl = 'https://api-bootcamp.do.dibimbing.id/api/v1/user'; 
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
            },
          });
  
          console.log('API Response:', response.data);

          const userData = response.data; 
  
          // Pre-fill the form fields with the user's existing data
          setFormData({
            name: userData.user.name,
            email: userData.user.email,
            phoneNumber: userData.user.phoneNumber,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          // console.error('Response data:', error.response.data);
        }
      }
  
      fetchUserData();
    }, [authToken]); 
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const apiUrl = 'https://api-bootcamp.do.dibimbing.id/api/v1/update-profile';
  
        const response = await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1pcmFAZ21haWwuY29tIiwidXNlcklkIjoiYjYwZDI5NjUtYzdmMS00NGFmLWJlZDgtMDI4NDEyOWUzMmYxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkzNjI4NzUwfQ.ezlgylYj4QoxpPpglewEZBM-ztmYp6GGXXkCl2ZUWlo`,
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        });
  
        console.log('Update successful:', response.data);
        alert('Profile updated successfully');
        router.push('/profile')

      } catch (error) {
        console.error('Update error:', error);
      }
    };
  
    const handleBackClick = () => {
      router.push('/profile');
    };
return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">Update Profile</h2>
            {formData.name !== undefined ? ( 
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleBackClick}>
                  Back to Profile
                </button>
              </form>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
            };

export default UpdateProfilePage;
