import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAdmin from '../../../hooks/useAdmin'; 

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users'); 
      return res.data;
    },
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin] = useAdmin(); // Check if the current user is an admin

  const handleMakeAdmin = async (user) => {
    await axiosSecure.patch(`/users/admin/${user._id}`);
    alert(`${user.name} is now an admin`);
    refetch(); // Refetch data to update the UI
  };

  const handleMakeStaff = async (user) => {
    await axiosSecure.patch(`/users/staff/${user._id}`);
    alert(`${user.name} is now staff`);
    refetch(); // Refetch data to update the UI
  };

  const handleRoleChange = (user, role) => {
    if (role === 'admin') {
      handleMakeAdmin(user);
    } else if (role === 'staff') {
      handleMakeStaff(user);
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      await axiosSecure.delete(`/users/${user._id}`);
      alert(`${user.name} has been deleted`);
      refetch(); 
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between m-4'>
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className='bg-green text-white rounded-lg'>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => (
                  <tr key={user._id}> 
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {
                        user.role === 'admin' ? "Admin" : user.role === 'staff' ? "Staff" : (
                          <div className="dropdown">
                            <button 
                              onClick={() => isAdmin && setSelectedUser(user)}  // Only allow setting selected user if the current user is an admin
                              className='btn btn-xs btn-circle text-indigo-500'>
                              <FaUsers />
                            </button>
                            {isAdmin && selectedUser === user && ( // Show dropdown only for admins
                              <ul className="dropdown-menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                  <button 
                                    onClick={() => handleRoleChange(user, 'admin')} 
                                    className='dropdown-item'>
                                    Make Admin
                                  </button>
                                </li>
                                <li>
                                  <button 
                                    onClick={() => handleRoleChange(user, 'staff')} 
                                    className='dropdown-item'>
                                    Make Staff
                                  </button>
                                </li>
                              </ul>
                            )}
                          </div>
                        )
                      }
                    </td>
                    <td>
                      {
                        isAdmin ? (
                          <button 
                            onClick={() => handleDeleteUser(user)} 
                            className='btn btn-xs text-red'>
                            <FaTrashAlt />
                          </button>
                        ) : (
                          <button 
                            className='btn btn-xs text-red' 
                            disabled // Disable the button for non-admins
                            style={{ cursor: 'not-allowed' }}
                          >
                            <FaTrashAlt />
                          </button>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
