import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateFood = () => {
  const router = useRouter();

  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    ingredients: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateFood = async () => {
    try {
      const response = await fetch('https://api-bootcamp.do.dibimbing.id/api/v1/create-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (response.status === 200) {
        // Food created successfully, you can redirect to another page
        router.push('/success'); // Replace with the appropriate success page
      } else {
        // Handle error response
        console.error('Failed to create food');
      }
    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  return (
    <div>
      <h1>Create Food</h1>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={foodData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={foodData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            value={foodData.ingredients.join(',')}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleCreateFood}>
          Create Food
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
