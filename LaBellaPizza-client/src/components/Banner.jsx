import React from 'react';
import { Link } from 'react-router-dom';

export const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#fff9e3] from-100% mt-30'>
      <div className='py-48 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
        <div className='md:w-1/2'>
          <img src="coverphoto1.png" alt="Cover Photo" />
          <div className='flex flex-col md:flex-row items-center justify-around -mt-8 gap-4'>
            <div className='flex bg-[#fffcf2] py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64'>
              <img src="pizza/pizza 1.png" alt="Pizza 1" className='rounded-3xl size-24' />
              <div className='space-y-1'>
                <h6 className='font-bold mb-1'>Neapolitan Style Pizza</h6>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                </div>
                <p className='text-red'>Rs. 2,100</p>
              </div>
            </div>

            <div className='flex bg-[#fffcf2] py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64'>
              <img src="pizza/pizza 2.png" alt="Pizza 2" className='rounded-3xl size-24' />
              <div className='space-y-1'>
                <h6 className='font-bold mb-1'>Chicago Style Pizza</h6>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                </div>
                <p className='text-red'>Rs. 3,600</p>
              </div>
            </div>
          </div>
        </div>

        <div className='md:w-1/2 space-y-7 px-4'>
          <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>Indulge in the Magic of <span className='text-green'>Perfect</span> <span className='text-red'>Pizza</span></h2>
          <p className='text-xl text-gray'>Crafted with precision, each pizza is a journey of taste and passion.</p>
          <Link to="/menu">
          <button className='btn bg-red px-8 py-3 font-semibold text-[#ffffff] rounded-full'>Order Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
