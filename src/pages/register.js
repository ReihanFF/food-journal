import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: 'admin', // Default role
    profilePictureUrl: '',
    phoneNumber: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = 'https://api-bootcamp.do.dibimbing.id/api/v1/register';
      const response = await axios.post(apiUrl, formData, {
        headers: {
          apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        },
      });

      console.log('Registration successful:', response.data);
      setRegistrationSuccess(true);
      // Redirect to the login page after successful registration
      setTimeout(() => {
        router.push('/login');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      setError('Registration failed. Please check your input.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Registration</h2>
          {registrationSuccess && (
            <div className="alert alert-success" role="alert">
              Registration successful. You can now{' '}
              <strong>log in</strong>.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordRepeat"
                name="passwordRepeat"
                value={formData.passwordRepeat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profilePictureUrl" className="form-label">
                Profile Picture URL
              </label>
              <input
                type="text"
                className="form-control"
                id="profilePictureUrl"
                name="profilePictureUrl"
                value={formData.profilePictureUrl}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-danger mb-3">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
