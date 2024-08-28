import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Gallery = () => {
  const axiosSecure = useAxiosSecure();

  // Use useQuery to fetch galleries
  const { data: galleries = [], isLoading, error } = useQuery({
    queryKey: ['galleries'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/gallery');
      return res.data;
    },
  });

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  // Error handling
  if (error) {
    return <div>Error fetching galleries: {error.message}</div>;
  }

  return (
    <div>
      {/* Banner */}
      <div className='section-container bg-gradient-to-r from-[#fff9e3] from-100% mt-30'>
        <div className='py-36 flex flex-col justify-center items-center gap-8'>
          <div className='space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Memorable Moments with <span className='text-green'>Us</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
        {Array.isArray(galleries) && galleries.length > 0 ? (
          galleries.map((item) => (
            <div key={item._id} className=' rounded-lg overflow-hidden shadow-lg'>
              <img src={item.imageUrl} alt={item.description} className='w-full h-64 object-cover' />
              <div className='p-4'>
                <p className='text-center text-gray-700'>{item.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No gallery items found.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
