import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const FoodDetail = ({ food }) => {
  const router = useRouter();
  const { authToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [foodReviews, setFoodReviews] = useState([]);
  const handleBackClick = () => {
    router.back(); 
  };

  // Fetch food details using its ID
  const fetchFoodDetail = async () => {
    try {
      const response = await axios.get(
        `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${router.query.id}`,
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

  const handleShowModal = () => {
    axios
      .get(
        `https://api-bootcamp.do.dibimbing.id/api/v1/food-rating/${food.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        }
      )
      .then((response) => {
        setFoodReviews(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching food reviews:', error);
      });

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Render food details
return (
  <div className="container mt-4">
    <button
        className="btn btn-secondary mb-3"
        onClick={handleBackClick}
      >
        Back
      </button>
    {food ? (
      <div className="card">
        <img src={food.imageUrl} alt={food.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{food.name}</h5>
          <p className="card-text">Likes: {food.totalLikes}</p>
          <p className="card-text">
            Description: {food.description} {/* Add food description */}
          </p>
          <p className="card-text">
            Ingredients: {food.ingredients.join(', ')} {/* Add food ingredients */}
          </p>
          <p className="card-text">
            Liked: {food.isLiked ? <FontAwesomeIcon icon={faHeart} color="red" /> : <FontAwesomeIcon icon={faHeart} color="black" />} {/* Add heart symbol if liked */}
          </p>
          <button
              className="btn btn-primary"
              onClick={handleShowModal}
            >
              View Reviews
            </button>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  {/* Modal for displaying food reviews */}
  <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Food Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {foodReviews.map((review) => (
           <div key={review.id} className="mb-3 border-bottom pb-3">
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
              <p>User: {review.user.name}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  
  </div>
);
    
};

export default FoodDetail;

// Fetch initial data (food details) for the page
export async function getServerSideProps(context) {
  const foodId = context.params.id; 
  try {
    const response = await axios.get(
      `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodId}`, 
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
      notFound: true,
    };
  }
}