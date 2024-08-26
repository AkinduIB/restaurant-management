import React, { useContext, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setcartItems] = useState([]);

  // Calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle increase function
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: 'PUT',
      headers: {
        'content-type': "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ quantity: item.quantity + 1 })
    }).then(res => res.json()).then(data => {
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem._id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      refetch();
      setcartItems(updatedCart);
    });

    refetch();
  };

  // Handle decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: 'PUT',
        headers: {
          'content-type': "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ quantity: item.quantity - 1 })
      }).then(res => res.json()).then(data => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        refetch();
        setcartItems(updatedCart);
      });

      refetch();
    } else {
      alert("Item Can't be zero");
    }
  };

  // Calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  // Handle delete function
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item._id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            console.log(data); // Log the data to see the response
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
          .catch(error => {
            console.error('Error deleting item:', error);
          });
      }
    });
  };

  return (
    <div>
      {/* Banner */}
      <div className='section-container bg-gradient-to-r from-[#fff9e3] from-100% mt-30'>
        <div className='py-36 flex flex-col justify-center items-center gap-8'>
          <div className='space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Items Added to The <span className='text-green'>Perfect</span> <span className='text-red'>Pizza</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Conditional Rendering for Cart Items */}
      {cart.length > 0 ? (
        <>
          {/* Table */}
          <div className='section-container mt-10'>
            <div className="overflow-x-auto">
              <table className="table">
                {/* Head */}
                <thead className='bg-green text-white rounded-sm'>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='font-medium'>
                        {item.name}
                      </td>
                      <td>
                        <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
                        <input type="number" value={item.quantity}
                          onChange={() => console.log(item.quantity)}
                          className='w-10 mx-2 text-center overflow-hidden appearance-none' />
                        <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>
                      </td>
                      <td>Rs. {calculatePrice(item).toFixed(2)}</td>
                      <th>
                        <button className="btn btn-ghost btn-xs text-red" onClick={() => handleDelete(item)}>
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Details */}
          <div className='section-container my-12 flex flex-col md:flex-row justify-between items-start'>
            <div className='md:w-1/2 space-y-3'>
              <h3 className='font-bold'>Customer Details</h3>
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <p>User_ID: {user.uid}</p>
            </div>

            <div className='md:w-1/2 space-y-3'>
              <h3 className='font-bold'>Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: Rs. {orderTotal.toFixed(2)}</p>
              <Link to='/process-checkout'>
                <button className='btn bg-green text-white px-8 py-1 mt-5'>Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className='section-container mt-10 text-center'>
          <h3 className='text-2xl font-semibold'>No items added</h3>
          <Link to='/menu?category=all'>
          <button className='btn bg-green text-white px-8 py-1 mt-5'>Back to Menu</button>          
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
