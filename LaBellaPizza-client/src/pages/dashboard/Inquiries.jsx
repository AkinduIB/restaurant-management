import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Inquiries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [question, setQuestion] = useState('');

    const { data: inquiries = [], isLoading, error, refetch } = useQuery({
        queryKey: ['userInquiries', user.id],
        queryFn: async () => {
            const response = await axiosSecure.get(`/api/user-inquiries/${user.id}`);
            return response.data;
        },
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/queries/query', { question, userId: user.id });
            if (response.status === 201) {
                alert('Query submitted successfully!');
                setQuestion('');
                refetch(); // Refresh the inquiries list after submission
            }
        } catch (error) {
            console.error('Failed to submit query:', error);
        }
    };

    return (
        <div>
            <div className='section-container bg-gradient-to-r from-[#fff9e3] from-100% mt-30'>
                <div className='py-36 flex flex-col justify-center items-center gap-8'>
                    <div className='space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                        Submit Your  <span className='text-green'>Inquiries and Questions </span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* User input section */}
            <div className='px-4 mx-auto ml-14'>
                <h2 className='text-2xl font-semibold my-4'>Ask Your <span className='text-green'>Inquiries/Questions</span></h2>
                <textarea
                    className="textarea textarea-bordered w-96"
                    placeholder="Ask Anything"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                    className='btn bg-red px-8 py-3 font-semibold text-[#ffffff] rounded-full ml-20'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            <hr className='mt-9' style={{ borderColor: '#D3D3D3' }} />

            {/* Display user’s inquiries and admin’s responses */}
            <div className='section-container'>
                <h2 className='text-2xl font-semibold my-4'>Your Inquiries/Questions & Responses</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>No inquiries found.</div>
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
        </div>
    );
};

export default Inquiries;
