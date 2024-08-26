import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import { GiConfirmed } from "react-icons/gi";
import Swal from 'sweetalert2'



const ManageBooking = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/all');
            return res.data;
        },
    });
    console.log(orders);

    const handleConfirm = async (item)=>{
        console.log(item)
        await axiosSecure.patch(`/payments/${item._id}`)
        .then(res => {
            console.log(res.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Payment Confirmed",
                showConfirmButton: false,
                timer: 1500
              });
              refetch();

        })
    };

    const handleDelete = async(item) => {
        console.log(item)
        await axiosSecure.delete(`/payments/${item._id}`)
        .then(res => {
            console.log(res.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Payment Deleted",
                showConfirmButton: false,
                timer: 1500
              });
              refetch();

        })
    };





    return (
        <div>
            <div className='flex items-center justify-between m-4'>
                <h5>All Orders</h5>
                <h5>Total Orders: {orders.length}</h5>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md:w-[870px]">
                        {/* head */}
                        <thead className='bg-green text-white rounded-lg'>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Transcation ID</th>
                                <th>Price</th>
                                <th>Status</th>

                                <th>Confirm Order</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((item, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.email}</td>
                                        <td>{item.transactionID}</td>
                                        <td>Rs.{item.price}</td>
                                        <td>{item.status}</td>
                                        <td className='text-center'>{item.status === "confirmed" ? "Done" : 
                                            <button onClick={() => handleConfirm(item)} className='btn btn-xs text-green'>
                                            <GiConfirmed /></button>}</td>
                                        <td className='text-center'><button onClick={() => handleDelete(item)} className='btn btn-xs  text-red'>
                                            <FaTrashAlt /></button></td>


                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageBooking