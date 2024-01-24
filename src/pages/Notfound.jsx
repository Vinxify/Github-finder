import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div>
      <div className='text-center hero-content'>
        <div className='max-w-lg'>
          <h1 className='text-8xl font-bold'>Oops!</h1>
          <p className='text-6xl mb-8'>404 - Page not found!</p>

          <Link to='/' className='btn btn-primary btn-lg'>
            <FaHome className='mr-2'></FaHome>
            <p>Back to Home</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notfound;
