import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './style.scss'
import UserCard from  '../UserCard';

const Navbar = () => {

  return (
    <>
    <div className="navbar-container">
        <div className="search">
        <FaSearch/>
        <h5>Search</h5>
        </div>
      <UserCard />
    
    </div>
    </>

  );
};

export default Navbar;


  