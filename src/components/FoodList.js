import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { authToken } = useAuth();

useEffect(() => {
  async function fetchFoods() {
    try {
      const response = await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        },
      });

      const foodItemsArray = response.data.data;

     // filter data yang punya gambar
     const filteredFoodItems = foodItemsArray.filter((foodItem) => foodItem.imageUrl);

     setFoodItems(filteredFoodItems);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  }

  fetchFoods();
}, []);


return (
  <div className="container mt-4">
    <h2 className="text-center mb-4">Food List</h2>
    <div className="row">
      {foodItems.map((foodItem) => (
        <div className="col-md-4 mb-4" key={foodItem.id}>
          <div className="card">
            <img src={foodItem.imageUrl} alt={foodItem.name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{foodItem.name}</h5>
              <p className="card-text">Likes: {foodItem.totalLikes}</p>
              <p className="card-text">Rating: {foodItem.rating}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default FoodList;
