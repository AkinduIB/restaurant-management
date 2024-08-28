import React from 'react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form'; 
import Swal from 'sweetalert2'


const ManageGallery = () => {
    const { register, handleSubmit, reset } = useForm(); 
    const axiosSecure = useAxiosSecure();

    // Image hosting key
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    // Submit function
    const onSubmit = async (data) => {
        try {
            // Upload image to imgbb
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);

            const hostingImg = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = hostingImg.data.data.display_url;

            // Prepare gallery data
            const galleryData = {
                imageUrl,
                description: data.description,
            };

            // Save gallery data to MongoDB
            const response = await axiosSecure.post('/api/gallery', galleryData);

            if (response.status === 201) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Image has been added",
                    showConfirmButton: false,
                    timer: 1500
                  });
                reset();
            }
        } catch (error) {
            console.error('Error uploading image or saving gallery data:', error);
        }
    };

    return (
        <div className='section-container'>
            <h2 className='text-2xl font-bold mb-4'>Manage Gallery</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className="form-control w-full my-6">
                    <label className="label">
                    </label>
                    <input type="file"
                        {...register("image", { required: true })}
                        className="file-input w-full max-w-xs" />

                </div>
                <div>
                    <label htmlFor='description' className='block text-sm font-medium'>
                        Description
                    </label>
                    <textarea
                        {...register('description', { required: true })}
                        className='textarea textarea-bordered w-full'
                        rows='3'
                    ></textarea>
                </div>
                <button type='submit' className='btn bg-green text-white px-8 py-1'>
                    Add to Gallery
                </button>
            </form>
        </div>
    );
};

export default ManageGallery;
