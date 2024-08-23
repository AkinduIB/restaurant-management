import React from 'react'
import useMenu from '../../../hooks/useMenu'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure';




const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    // console.log(menu);


    
    // handleDelete
    const deleteMenuItem = async (item) => {
        if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
            try {
                const response = await axiosSecure.delete(`/menu/${item._id}`);
                if (response.status === 200) {
                    alert(`${item.name} has been deleted`);
                    refetch(); // Refresh the menu after deletion
                } else {
                    throw new Error('Failed to delete the item.');
                }
            } catch (error) {
                console.error('Error deleting menu item:', error);
                // alert('Failed to delete the item. Please try again.');
            }
        }
    };



    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Manage All <span className='text-green'>Menu Item!</span></h2>

            {/* menu table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Recipe Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => (
                                    <tr key={index}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item.name}


                                        </td>
                                        <td>Rs. {item.price}</td>
                                        <td>
                                            <Link to={`/dashboard/update-menu/${item._id}`}>
                                                <button className="btn btn-ghost btn-xs bg-orange-400 text-white"><FaEdit /></button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => deleteMenuItem(item)} className="btn btn-ghost btn-xs text-red"><FaTrashAlt /></button>
                                        </td>
                                    </tr>

                                ))}




                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    )
}

export default ManageItems