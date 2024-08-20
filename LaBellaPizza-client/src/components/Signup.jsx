import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUser, signUpWithGoogle, updateUserProfile } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUserProfile(data.name, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    };
                    axios.post('http://localhost:6001/users', userInfo)
                        .then(() => {
                            alert("Account creation successfully done!");
                            navigate(from, { replace: true });
                        })
                        .catch((error) => {
                            console.error("Error saving user info:", error);
                        });
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const handleRegister = () => {
        signUpWithGoogle()
            .then((result) => {
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                };
                axios.post('http://localhost:6001/users', userInfo)
                    .then(() => {
                        alert("Account creation successfully done!");
                        navigate("/");
                    })
                    .catch((error) => {
                        console.error("Error saving user info:", error);
                    });
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                    <h3 className='font-bold text-lg'>Create An Account!</h3>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>

                    {/* Signup Button */}
                    <div className="form-control mt-6">
                        <input type="submit" value="Signup" className="btn bg-red text-white" />
                    </div>
                    <p className='text-center my-2'>Have an account?{" "}
                        <button className='underline text-red ml-1'
                            onClick={() => document.getElementById('my_modal_5').showModal()}
                        >Login</button>{" "}
                    </p>

                    <Link
                        to="/"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                </form>

                {/* Social Sign In */}
                <div className='text-center space-x-4 mb-5'>
                    <button className="btn btn-circle hover:bg-red hover:text-white" onClick={handleRegister}>
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-red hover:text-white">
                        <FaFacebookF />
                    </button>
                    <button className="btn btn-circle hover:bg-red hover:text-white">
                        <FaGithub />
                    </button>
                </div>
            </div>
            <Modal />
        </div>
    );
};

export default Signup;
