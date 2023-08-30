import React from 'react';
import Navbar from '../components/Navbar';
import FoodList from '../components/FoodList';

const Main = () => {
  return (
    <Navbar>
      <div>Main Page</div>
      <FoodList />
    </Navbar>
  );
};

export default Main;
