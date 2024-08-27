import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaPercent, FaTrashAlt } from 'react-icons/fa';

const ManageOffer = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [offers, setOffers] = useState([]);

    // Fetch all offers when the component mounts
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axiosSecure.get('/api/offers');
                setOffers(response.data);
            } catch (error) {
                console.error("Failed to fetch offers", error);
            }
        };
        fetchOffers();
    }, [axiosSecure]);

    const onSubmit = async (data) => {
        const offerData = {
            category: data.category,
            discount: parseFloat(data.discount),
            couponCode: data.couponCode,
            description: data.description,
            expiryDate: data.expiryDate
        };

        try {
            const response = await axiosSecure.post('/api/offers', offerData);
            if (response.status === 200) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Offer has been added",
                    showConfirmButton: false,
                    timer: 1500
                });
                setOffers([...offers, response.data]); // Update offers state with the new offer
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to add offer",
                showConfirmButton: true
            });
        }
    };

    // Handle offer deletion
    const handleDeleteOffer = async (offerId) => {
        try {
            const response = await axiosSecure.delete(`/api/offers/${offerId}`);
            if (response.status === 200) {
                setOffers(offers.filter(offer => offer._id !== offerId)); // Update offers state
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Offer has been deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to delete offer",
                showConfirmButton: true
            });
        }
    };

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Add New <span className='text-green'>Offer</span></h2>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select
                            {...register("category", { required: true })}
                            className="select select-bordered" defaultValue="default">
                            <option disabled value="default">Select a category</option>
                            <option value="pizza">Pizza</option>
                            <option value="melts">Melts</option>
                            <option value="dessert">Dessert</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Discount Percentage*</span>
                        </label>
                        <input type="number"
                            {...register("discount", { required: true })}
                            placeholder="Discount Percentage" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Coupon Code*</span>
                        </label>
                        <input type="text"
                            {...register("couponCode", { required: true })}
                            placeholder="Coupon Code" className="input input-bordered w-full " />
                    </div>

                    <div className="form-control my-6">
                        <label className="label">
                            <span className="label-text">Offer Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" {...register("description")}
                            placeholder="Description about the offer"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Expiry Date*</span>
                        </label>
                        <input type="date"
                            {...register("expiryDate", { required: true })}
                            className="input input-bordered w-full" />
                    </div>

                    <button className='btn bg-green text-white px-6'>Add Offer <FaPercent /></button>
                </form>
            </div>
            <hr className='mt-6' style={{ borderColor: '#D3D3D3' }} />


            {/* Offers Table */}
            <div className='flex items-center justify-between m-4'>
                <h5>All Offers</h5>
                <h5>Total Offers: {offers.length}</h5>
            </div>
            <div className="overflow-x-auto mt-8 w-full">
                <table className="table table-zebra w-full">
                    <thead className='bg-green text-white rounded-lg'>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Discount (%)</th>
                            <th className="text-center">Coupon Code</th>
                            <th className="text-center">Expiry Date</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer, index) => (
                            <tr key={offer._id}>
                                <th className="text-center">{index + 1}</th>
                                <td className="text-center">{offer.category}</td>
                                <td className="text-center">{offer.discount}</td>
                                <td className="text-center">{offer.couponCode}</td>
                                <td className="text-center">{new Date(offer.expiryDate).toLocaleDateString()}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => handleDeleteOffer(offer._id)}
                                        className='btn btn-xs text-red'>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOffer;
