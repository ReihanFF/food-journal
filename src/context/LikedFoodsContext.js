import { createContext, useContext, useEffect, useState } from 'react';

const LikedFoodsContext = createContext();

export function useLikedFoods() {
  return useContext(LikedFoodsContext);
}

export function LikedFoodsProvider({ children }) {
  const [likedFoods, setLikedFoods] = useState([]);

  // Load liked foods from local storage when the component mounts
  useEffect(() => {
    const storedLikedFoods = JSON.parse(localStorage.getItem('likedFoods')) || [];
    setLikedFoods(storedLikedFoods);
  }, []);

  // Function to toggle like and update liked foods in local storage
  const toggleLike = (foodId) => {
    const updatedLikedFoods = likedFoods.includes(foodId)
      ? likedFoods.filter((id) => id !== foodId)
      : [...likedFoods, foodId];

    setLikedFoods(updatedLikedFoods);
    localStorage.setItem('likedFoods', JSON.stringify(updatedLikedFoods)); // Store liked foods in local storage
  };

  return (
    <LikedFoodsContext.Provider value={{ likedFoods, toggleLike }}>
      {children}
    </LikedFoodsContext.Provider>
  );
}
