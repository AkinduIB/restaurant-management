import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';
import { FaRegUser } from "react-icons/fa";
import Modal from './Modal';
import Profile from './Profile';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';


const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const {user} = useAuth();
  // console.log(user)
  const [cart, refetch] = useCart();
  // console.log(cart)

  

  // handle scroll function
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const navItems = (
    <>
      <li><Link className='text-red' to="/">Home</Link></li>
      <li tabIndex={0}>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li><Link to="/menu?category=all">All</Link></li>
            <li><Link to="/menu?category=pizza">Pizza</Link></li>
            <li><Link to="/menu?category=melts">Melts</Link></li>
            <li><Link to="/menu?category=dessert">Desserts</Link></li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li><Link to="/menu?category=all">Online Order</Link></li>
            <li><Link to="#table-booking">Table Booking</Link></li>
            <li><Link to="#order-tracking">Make Inquiries</Link></li>
          </ul>
        </details>
      </li>
      <li><Link to="#offers">Offers</Link></li>
      <li><Link to="#gallery">Gallery</Link></li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/* Search btn */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Cart items */}
          <Link to="cart-page">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-4 lg:flex items-center justify-center">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item text-red">{cart.length || 0}</span>
            </div>
          </div>
          </Link>
          {/* login btn */}
          {
            user? <Profile user={user} /> : <button
            onClick={() => document.getElementById('my_modal_5').showModal()}
            className="btn bg-red rounded-full px-6 text-white flex items-center gap-2">
            <FaRegUser /> Login
          </button>
          }
          <Modal/>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
