import React from 'react';
import Navbar from '../components/Navbar';
import FoodList from '../components/FoodList';
import Link from 'next/link'; // Import Link from Next.js

const Main = () => {
  return (
    <Navbar>
      <div className="d-flex justify-content-between align-items-center">
        <div>Main Page</div>
        <Link href="/createfood">
          <button className="btn btn-primary">Create Food</button>
        </Link>
      </div>
      <FoodList />
    </Navbar>
  );
};

export default Main;
