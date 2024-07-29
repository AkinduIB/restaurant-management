import React from 'react'

const serviceLists = [
  { id: 1, title: "Dining", des: "Delight your guests with our flavors and presentation", image: "avatars/icon1.png" },
  { id: 2, title: "Fast Delivery", des: "We deliver your order promptly to your door", image: "avatars/icon2.png" },
  { id: 3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering", image: "avatars/icon3.png" },
]

const Services = () => {
  return (
    <div className='section-container my-16'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-12'>

        <div className='md:w-1/2'>
          <div className='text-left md:w-4/5'>
            <p className='subtitle'>Our Story & Services</p>
            <h3 className='title'>Our Culinary Journey And Services</h3>
            <p className='my-5 text-gray leading-[30px]'>
              Rooted in passion, we curate unforgettable dining experience and offer exceptional services,
              blending culinary artistry with warm hospitality.
            </p>
            <button className='btn bg-green text-white px-8 py-3 rounded-full'>Explore</button>
          </div>
        </div>

        <div className='md:w-1/2 flex items-center justify-center '>
          <div className='grid gap-8 '>
            {
              serviceLists.map((service) => (
                <div key={service.id} className='shadow-md rounded-sm py-5 px-4 text-center space-y-2
                 text-red cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border'>
                  <img src={service.image} alt='' className='mx-auto' />
                  <h5 className='pt-3 font-semibold'>{service.title}</h5>
                  <p className='text-[#333333]'>{service.des}</p>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Services
