import React, { useCallback, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthProvider';
import { FaHeart } from "react-icons/fa";
import Swal from 'sweetalert2'

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Add to cart button handler
  const handleAddToCart = async (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
  
      try {
        const response = await fetch('http://localhost:6001/carts', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data._id || data.menuItemId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Item added to cart successfully",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          console.error("Item was not added to the cart:", data);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to add item to cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred",
          text: "Unable to add item to cart. Please try again.",
          showConfirmButton: true
        });
      }
    } else {
      Swal.fire({
        title: "Please Login!",
        text: "Without an account, you cannot add items to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', { state: { from: location } });
        }
      });
    }
  };
  
  

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl relative">
      <div 
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}
        onClick={handleHeartClick}
      >
        <FaHeart className='h-5 w-5 cursor-pointer' />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body bg-white">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className='font-semibold'>
            <span className='text-sm text-red'>Rs. </span>{item.price}
          </h5>
          <button 
            className="btn bg-green text-white" 
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
