import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    ingredients: [], // Initialize as an empty array
  });
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const router = useRouter();
  const { authToken } = useAuth();

  useEffect(() => {
    // Fetch your auth token here or from your context
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ingredients') {
      // Split ingredients input into an array
      const ingredientsArray = value.split(',').map((ingredient) => ingredient.trim());
      setFormData({ ...formData, [name]: ingredientsArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add headers for API key and auth token
      const headers = {
        Authorization: `Bearer ${authToken}`,
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-', // Replace with your actual API key
      };

      // Make a POST request to the API to create a new food item
      const response = await axios.post(
        'https://api-bootcamp.do.dibimbing.id/api/v1/create-food',
        formData,
        { headers }
      );

      console.log('Food created successfully:', response.data);

      // Show success message
      setSuccessMessage('Food created successfully');

      // Clear the form
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        ingredients: [], // Initialize as an empty array
      });

      // Hide the success message after a few seconds (e.g., 3 seconds)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  const handleBackClick = () => {
    router.push('/main'); // Redirect back to main page
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title">Create Food</h2>

              {/* Display success message */}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ingredients" className="form-label">Ingredients:</label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients.join(', ')}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <small className="form-text text-muted">
                    Enter ingredients separated by commas (e.g., ingredient1, ingredient2, ingredient3).
                  </small>
                </div>
                <button type="submit" className="btn btn-primary">Create Food</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleBackClick}>
                  Go Back
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
