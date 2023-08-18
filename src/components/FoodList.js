import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);

useEffect(() => {
  async function fetchFoods() {
    try {
      const response = await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJlaWhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI0MDllNGIwMC03NWE2LTRmNTctOGZhYy02YTRiNmZjMjdlNDIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTIzNTM3OTR9.37ojlhoI3e3AwFmFV9AhqxjrNpPEVD6eSMLlFlaTGTg',
          apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        },
      });

      const foodItemsArray = response.data.data;

      setFoodItems(foodItemsArray);
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
            <div className="card-body">
              <h5 className="card-title">{foodItem.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default FoodList;
