import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { FaLocationArrow, FaPercent, FaQuestionCircle, FaUsers } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoBagAddSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import logo from "/logo.png";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaCartShopping } from 'react-icons/fa6';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import useStaff from '../hooks/useStaff';

const sharedLinks = (
    <>
        <li className='mt-3'><Link to="/"><MdSpaceDashboard />Home</Link></li>
        <li><Link to="/menu"><FaCartShopping /> Menu</Link></li>
        <li><Link to="/menu"><FaLocationArrow /> Order Tracking</Link></li>
        <li><Link to="/menu"><FaQuestionCircle /> Customer Support</Link></li>
    </>
);

const DashboardLayout = () => {
    const { isAuthenticated, loading } = useAuth(); 
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isStaff, isStaffLoading] = useStaff();

    // Check loading states for both isAdmin and isStaff
    if (loading || isAdminLoading || isStaffLoading) {
        return <div>Loading...</div>;
    }

    // Determine if the user is authenticated based on their role
    const isUserAuthenticated = isAuthenticated || isAdmin || isStaff;

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout clicked");
    };

    return (
        <div>
            {isUserAuthenticated ? (
                <div>
                    <div className="drawer sm:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                            {/* Page content here */}
                            <div className='flex items-center justify-between m-4'>
                                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                                    <MdOutlineDashboardCustomize />
                                </label>
                                <button
                                    className='btn rounded-full px-6 bg-red text-white flex items-center gap-2 sm:hidden'
                                    onClick={handleLogout}
                                >
                                    <FiLogOut />Logout
                                </button>
                            </div>
                            <div className='mt-5 md:mt-2 mx-4'>
                                <Outlet />
                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                {/* Sidebar content here */}
                                <li>
                                    <Link to="/" className='flex justify-start mb-4'>
                                        <img src={logo} alt="" className='w-20' />
                                        <span className={`badge ${isAdmin ? 'badge-primary' : 'badge-secondary'}`}>
                                            {isAdmin ? 'Admin' : isStaff ? 'Staff' : ''}
                                        </span>
                                    </Link>
                                </li>
                                <hr style={{ borderColor: '#D3D3D3' }} />
                                <li className='mt-3'><Link to="/dashboard"><MdSpaceDashboard />Dashboard</Link></li>
                                <li><Link to="/dashboard/manage-booking"><FaShoppingCart />Manage Booking</Link></li>
                                
                                {/* Only show these links to admins */}
                                {isAdmin && (
                                    <>
                                        <li><Link to="/dashboard/add-menu"><IoBagAddSharp />Add Items</Link></li>
                                        <li><Link to="/dashboard/manage-items"><FaEdit />Manage Items</Link></li>
                                        <li><Link to="/dashboard/users"><FaUsers />All Users</Link></li>
                                        <li><Link to="/dashboard/manage-offers"><FaPercent />Offers</Link></li>
                                    </>
                                )}
                                
                                {/* shared nav link */}
                                <hr className='mt-4' style={{ borderColor: '#D3D3D3' }} />
                                {sharedLinks}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <button Link to="/">Move back to Home</button>
            )}
        </div>
    );
};

export default DashboardLayout;
