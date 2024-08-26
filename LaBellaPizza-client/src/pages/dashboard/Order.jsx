import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Order = () => {
    const { user } = useAuth(); // Call useAuth as a function
    const token = localStorage.getItem('access-token');

    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; // Early return if email is undefined
            const res = await fetch(`http://localhost:6001/payments?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log('Fetched orders:', data); // Debugging line
            return data;
        },
        enabled: !!user?.email, // Only run the query if the email exists
    });
    
    

    // console.log(orders);
const formatDate =(createdAt) => {
    const createdAtDate = new Date(createdAt)
    return createdAtDate.toLocaleDateString();
}

    return (
        <div>
            <div className='section-container bg-gradient-to-r from-[#fff9e3] from-100% mt-30'>
                <div className='py-36 flex flex-col justify-center items-center gap-8'>
                    <div className='space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Track Your All <span className='text-green'>Orders</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Table */}
            {orders.length > 0 ? (
                <div className='section-container mt-10'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className='bg-green text-white rounded-sm'>
                                <tr>
                                    <th>#</th>
                                    <th>Order Date</th>
                                    <th>Transcation ID</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {formatDate(item.createdAt)}
                                        </td>
                                        <td className='font-medium'>{item.transactionID}</td>
                                        
                                        <td>Rs. {item.price}</td>
                                        <td>{item.status}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs text-red">Remove</button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>No orders found.</div> 
            )}
        </div>
    );
};

export default Order;
