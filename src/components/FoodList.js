import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { useLikedFoods } from '../context/LikedFoodsContext';

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { authToken } = useAuth();
  const router = useRouter();
  const { likedFoods, toggleLike } = useLikedFoods();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  

  useEffect(() => {
    async function fetchFoods() {

      try {
        
        const response = await axios.get(
          'https://api-bootcamp.do.dibimbing.id/api/v1/foods',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
            },
          }
        );

        const foodItemsArray = response.data.data;

        // filter data yang punya gambar
        const filteredFoodItems = await Promise.all(
          foodItemsArray.map(async (foodItem) => {
            if (foodItem.imageUrl) {
              const image = new Image();
              image.src = foodItem.imageUrl;

              return new Promise((resolve) => {
                image.onload = () => {             
                  resolve(foodItem);
                };

                image.onerror = () => {
                  resolve(null);
                };
              });
            } else {
              return null;
            }
          })
        );

        const validFoodItems = filteredFoodItems.filter(
          (foodItem) => foodItem !== null
        );

         const foodItemsWithLikes = validFoodItems.map((foodItem) => ({
          ...foodItem,
          isLiked: likedFoods.includes(foodItem.id),
        }));

        setFoodItems(foodItemsWithLikes);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    }

    fetchFoods();
  }, [authToken, likedFoods]);

  const handleCardClick = (foodId) => {
    router.push(`/food/${foodId}`); 
  };

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

  // Function to handle liking a food item
  const handleLikeClick = async (foodId) => {
    try {
      const isLiked = likedFoods.includes(foodId);

      const apiEndpoint = isLiked
        ? 'https://api-bootcamp.do.dibimbing.id/api/v1/unlike'
        : 'https://api-bootcamp.do.dibimbing.id/api/v1/like';

      const response = await axios.post(
        apiEndpoint,
        { foodId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        }
      );

      console.log('Like status updated successfully:', response.data);

      // Update the liked status in the context provider
      toggleLike(foodId);
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Food List</h2>
      <div className="row">
        {foodItems.map((foodItem) => (
          <div className="col-md-4 mb-4" key={foodItem.id}>
            <div className="card h-100">
              <img
                src={foodItem.imageUrl}
                alt={foodItem.name}
                className="card-img-top"
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link href={`/food/${foodItem.id}`}>
                    {foodItem.name}
                  </Link>
                </h5>
                <p className="card-text">Likes: {foodItem.totalLikes}</p>
                <p className="card-text">Rating: {generateStars(foodItem.rating)}</p>
                <button
                  className={`btn btn-${foodItem.isLiked ? 'danger' : 'primary'}`}
                  onClick={() => handleLikeClick(foodItem.id, foodItem.isLiked)}
                >
                  {foodItem.isLiked ? 'Unlike' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
