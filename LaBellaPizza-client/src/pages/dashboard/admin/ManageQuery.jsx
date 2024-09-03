import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageQueries = () => {
    const axiosSecure = useAxiosSecure();
    
    // Corrected useQuery hook usage with object-based API
    const { data: queries = [], refetch } = useQuery({
        queryKey: ['queries'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/queries');
            return res.data;
        },
    });

    const handleResponseSubmit = async (id, response) => {
        try {
            await axiosSecure.put(`/api/query/${id}/respond`, { response });
            refetch();
        } catch (error) {
            console.error('Failed to submit response:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/api/query/${id}`);
            refetch();
        } catch (error) {
            console.error('Failed to delete query:', error);
        }
    };

    return (
        <div>
            <h2 className='text-2xl font-semibold my-4'>Manage Inquiries/Questions</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Question</th>
                            <th>Response</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map((query, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{query.userId.name}</td>
                                <td>{query.question}</td>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={query.response}
                                        onBlur={(e) => handleResponseSubmit(query._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(query._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageQueries;
