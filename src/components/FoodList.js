import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';


const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { authToken } = useAuth();
  const router = useRouter();

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

  const handleCardClick = (foodId) => {
    router.push(`/food/${foodId}`); // Navigate to the food detail page
  };


  // Function to generate star icons based on the rating
  const generateStars = (rating) => {
    const maxRating = 5;
    const filledStars = Math.round(rating);
    const emptyStars = maxRating - filledStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={filledStars + i} className="bi bi-star"></i>);
    }

    return stars;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Food List</h2>
      <div className="row">
        {foodItems.map((foodItem) => (
          <div className="col-md-4 mb-4" key={foodItem.id}>
             <Link href={`/food/${foodItem.id}`}> {/* Use Link component for navigation */}
            <div className="card">
              <img src={foodItem.imageUrl} alt={foodItem.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <p className="card-text">Likes: {foodItem.totalLikes}</p>
                <p className="card-text">Rating: {generateStars(foodItem.rating)}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
