import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // Add other fields you want to update
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'https://api-bootcamp.do.dibimbing.id/api/v1/update-profile';
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJlaWhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI0MDllNGIwMC03NWE2LTRmNTctOGZhYy02YTRiNmZjMjdlNDIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTIzNTM3OTR9.37ojlhoI3e3AwFmFV9AhqxjrNpPEVD6eSMLlFlaTGTg'; // Replace with your token

      const response = await axios.put(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title">Update Profile</h2>
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
                {/* Add other form fields for updating */}
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
