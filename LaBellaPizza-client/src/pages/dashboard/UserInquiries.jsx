import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UserInquiries = ({ userId }) => {
    const axiosSecure = useAxiosSecure();

    const { data: inquiries = [], isLoading, error } = useQuery({
        queryKey: ['userInquiries', userId],
        queryFn: async () => {
            const response = await axiosSecure.get(`/api/query/${userId}`);
            return response.data;
        },
    });

    return (
        <div className='section-container'>
            <h2 className='text-2xl font-semibold my-4'>Your Inquiries/Questions & Responses</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error loading your inquiries.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inquiry, index) => (
                                <tr key={inquiry._id}>
                                    <td>{index + 1}</td>
                                    <td>{inquiry.question}</td>
                                    <td>{inquiry.response || 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserInquiries;
