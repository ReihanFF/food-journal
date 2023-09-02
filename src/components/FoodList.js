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
        if (!authToken) {
          // Redirect to the login page if authToken is not available
          router.push('/login');
          return;
        }

        const response = await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        });

        const foodItemsArray = response.data.data;

        // filter data yang punya gambar
        const filteredFoodItems = await Promise.all(
          foodItemsArray.map(async (foodItem) => {
            if (foodItem.imageUrl) {
              const image = new Image();
              image.src = foodItem.imageUrl;
  
              return new Promise((resolve) => {
                image.onload = () => {
                  // Image loaded successfully, include this food item
                  resolve(foodItem);
                };
  
                image.onerror = () => {
                  // Image URL is broken or not accessible, exclude this food item
                  resolve(null);
                };
              });
            } else {
              // No image URL, exclude this food item
              return null;
            }
          })
        );
  
        // Filter out null values (items with broken image URLs)
        const validFoodItems = filteredFoodItems.filter((foodItem) => foodItem !== null);
  
        setFoodItems(validFoodItems);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    }
  
    fetchFoods();
  }, [authToken]);

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
              <div className="card h-100">
                <img
                  src={foodItem.imageUrl}
                  alt={foodItem.name}
                  className="card-img-top"
                  style={{ objectFit: 'cover', height: '200px' }} // Adjust height as needed
                />
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
