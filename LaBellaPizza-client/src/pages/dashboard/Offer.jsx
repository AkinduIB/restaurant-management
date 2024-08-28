import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Offer = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all offers using React Query
  const { data: offers = [], isLoading, error } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const response = await axiosSecure.get('/api/offers');
      return response.data;
    },
  });

  const formatDate = (expiryDate) => {
    const date = new Date(expiryDate);
    return date.toLocaleDateString();
  };

  return (
    <div>
      {/* Banner */}
      <div className='section-container bg-gradient-to-r from-[#fff9e3] from-100% mt-30'>
        <div className='py-36 flex flex-col justify-center items-center gap-8'>
          <div className='space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Offers That Are Available to <span className='text-green'>You</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='section-container mt-10'>
        {isLoading ? (
          <div>Loading offers...</div>
        ) : error ? (
          <div>Failed to load offers.</div>
        ) : offers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className='bg-green text-white rounded-sm'>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Discount (%)</th>
                  <th className="text-center">Coupon Code</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Expiry Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{offer.category}</td>
                    <td className="text-center">{offer.discount}</td>
                    <td className="text-center">{offer.couponCode}</td>
                    <td className="text-center">{offer.description}</td>
                    <td className="text-center">{formatDate(offer.expiryDate)}</td>
                    <td className="flex justify-center">
                      <button className="btn btn-ghost btn-xs text-red">Use Offer</button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No offers available.</div>
        )}
      </div>
    </div>
  );
};

export default Offer;
