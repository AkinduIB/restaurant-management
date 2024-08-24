import React from 'react'
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form"
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'


const AddMenu = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    //image hosting key
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // console.log(image_hosting_key)
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    const onSubmit = async (data) => {
        // console.log(data)
        const imageFile = { image: data.image[0] }
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        })
        // console.log(hostingImg.data)
        if (hostingImg.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImg.data.data.display_url
            };
            // console.log(menuItem);
            const postMenuItem = axiosSecure.post('/menu', menuItem);
            if(postMenuItem){
                reset()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your item has been added",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }

    };


    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Upload A New <span className='text-green'>Menu Item</span></h2>

            {/* form */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true })}
                            placeholder="Recipe Name" className="input input-bordered w-full " />

                    </div>
                    <div className='flex items-center gap-4'>
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

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number"
                                {...register("price", { required: true })}
                                placeholder="Price" className="input input-bordered w-full " />

                        </div>

                    </div>

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Recipe Description*</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24"
                            {...register("recipe", { required: true })}
                            placeholder="Description about the recipe"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                        </label>
                        <input type="file"
                            {...register("image", { required: true })}
                            className="file-input w-full max-w-xs" />

                    </div>

                    <button className='btn bg-green text-white px-6'>Add Item <FaUtensils /></button>
                </form>
            </div>
        </div>
    )
}

export default AddMenu