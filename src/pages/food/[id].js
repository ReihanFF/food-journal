// pages/food/FoodDetail.js
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const FoodDetail = ({ food }) => {
  const router = useRouter();
  const { authToken } = useAuth();

  // Fetch food details using its ID
  const fetchFoodDetail = async () => {
    try {
      const response = await axios.get(
        `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${router.query.id}`, // Use the food ID from the route
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching food details:', error);
      return null;
    }
  };

  // Render food details
  return (
    <div className="container mt-4">
      {food ? (
        <div className="card">
          <img src={food.imageUrl} alt={food.name} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{food.name}</h5>
            <p className="card-text">Likes: {food.totalLikes}</p>
            {/* Render additional details here */}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FoodDetail;

// Fetch initial data (food details) for the page
export async function getServerSideProps(context) {
  const foodId = context.params.id; // Retrieve food ID from the route parameters

  try {
    const response = await axios.get(
      `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodId}`, // Use the food ID from the route
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q`,
          apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        },
      }
    );

    const food = response.data.data;

    return {
      props: {
        food,
      },
    };
  } catch (error) {
    console.error('Error fetching food details:', error);
    return {
      notFound: true, // This will trigger a 404 error page
    };
  }
}