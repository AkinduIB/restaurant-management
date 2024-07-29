import React from 'react'
import { FaStar } from 'react-icons/fa'

const Testimonials = () => {
  return (
    <div className="section-container">
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
        <div className='md:w-1/2 flex justify-center items-center'>
            <img src="testimonials.png" alt="" />            
            </div>

            <div className='md:w-1/2'>
                <div className='text-left md:w-4/5'>
                <p className='subtitle'>Testimonials</p>
                <h3 className='title'>What Our Customers Say About Us</h3>
                <blockquote className='my-5 text-gray leading-[30px]'>
                    "La Bella Pizza Restaurant offers a cozy ambiance, friendly service, 
                    and exceptional pizzas, making it a top choice for pizza enthusiasts."
                </blockquote>

                <div className='flex items-center gap-4 flex-wrap '>
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className="avatar">
                        <div className="w-12">
                        <img src="avatars\avatar1.png" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                        <img src="avatars\avatar2.png" />
                        </div>
                    </div>
                    <div className="avatar">
                        <div className="w-12">
                        <img src="avatars\avatar3.png" />
                        </div>
                    </div>
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-12">
                        <span>+99</span>
                        </div>
                    </div>
                    </div>

                <div className='space-y-1'>
                <h5 className='text-lg font-semibold'>Customer Feedback</h5>
                <div className='flex items-center gap-2'>
                    <FaStar className='text-yellow-400'/>
                    <span>4.9</span> <span className='text-[#807E7e]'>(18.6k Reviews)</span>
                </div>
                
                </div>

            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Testimonials