import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useStaff from '../hooks/useStaff';

const Profile = ({ user }) => {
  // console.log('Profile Photo URL:', user.photoURL);

  const { logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(); 
  const [isStaff] = useStaff();

  const handleLogout = () => {
    logOut()
      .then(() => {
        alert("Logout Successfully!");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {user.photoURL ? (
              <img alt="Profile" src={user.photoURL} />
            ) : (
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a href='/update-profile' className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a href='/order'>Order</a></li>
          
          {/* Conditionally render the Dashboard link */}
          {(isAdmin || isStaff) && (
            <li><Link to='/dashboard'>Dashboard</Link></li>
          )}
          
          <li><a>Settings</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
