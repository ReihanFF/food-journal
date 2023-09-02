import React from 'react';
import Navbar from '../components/Navbar';
import FoodList from '../components/FoodList';
import Link from 'next/link'; // Import Link from Next.js

const Main = () => {
  return (
    <Navbar>
      <div className="card p-3 mt-3">
      <div className="d-flex justify-content-between align-items-center">
  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue' }}>Main Page</div>
  <div className="text-center">
    <img src="/logo.jpg" alt="Logo" width="100" height="100" />
  </div>
  <Link href="/createfood">
    <button className="btn btn-primary">Create Food</button>
  </Link>
</div>
      </div>
      <FoodList />
    </Navbar>
  );
};

export default Main;
