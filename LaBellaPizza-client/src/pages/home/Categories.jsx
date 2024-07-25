import React from 'react'

const CategoryItems = [
    {id: 1, title: "Pizza", des: "(34 pizzas)", image: "category/pizzaa.png"},
    {id: 2, title: "Melts", des: "(15 Melts)", image: "category/melts.jpg"},
    {id: 3, title: "Deserts", des: "(25 Deserts)", image: "category/deserts.jpeg"},
    {id: 4, title: "Browse All", des: "(165 Items)", image: "category/browse all.png"},
]

const Categories = () => {
  return (
    <div className='section-container py-16'>
        <div className='text-center'>
            <p className='subtitle'>customer favorites</p>
            <h3 className='title'>Best Selling Categories</h3>
        </div>

       {/* category card */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12' >
            {
                CategoryItems.map((item, i) =>  (
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
                        <div className='flex w-full mx-auto items-center justify-center'>
                            <img src={item.image} alt={item.title} className='p-5 rounded-full w-40 h-40' />
                        </div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='font-bold'>{item.title}</h5>
                            <p>{item.des}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories
