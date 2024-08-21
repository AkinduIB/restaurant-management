import React, { useContext, useState } from 'react';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signUpWithGoogle, login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const { email, password } = data;
        login(email, password)
            .then((result) => {
                const user = result.user;
                const userInfor = {
                    name: user.displayName || data.name,
                    email: user.email,
                };
                return axios.post('http://localhost:6001/users', userInfor);
            })
            .then(() => {
                alert("Login successfully done!");
                document.getElementById('my_modal_5').close();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setErrorMessage("Provide a correct email and password!");
            });
    };

    const handleLogin = () => {
        signUpWithGoogle()
            .then((result) => {
                const user = result.user;
                const userInfor = {
                    name: user.displayName,
                    email: user.email,
                };
                return axios.post('http://localhost:6001/users', userInfor);
            })
            .then(() => {
                alert("Login successfully done!");
                document.getElementById('my_modal_5').close();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
            <div className="modal-action flex flex-col justify-center mt-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                        <h3 className='font-bold text-lg'>Please Login! </h3>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="email" 
                                className="input input-bordered"  
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className='text-red text-xs italic'>{errors.email.message}</p>}
                        </div>

                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="password" 
                                className="input input-bordered" 
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className='text-red text-xs italic'>{errors.password.message}</p>}
                            <label className="label mt=1">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {/* error */}
                        {errorMessage && <p className='text-red text-xs italic'>{errorMessage}</p>}

                        {/* login btn */}
                        <div className="form-control mt-6">
                            <input type="submit" value="Login" className="btn bg-red text-white" />
                        </div>
                        <p className='text-center my-2'>Do not have an account? 
                            <Link to="/signup" className='underline text-red ml-1'>Signup Now</Link>
                        </p>

                        <button
                            htmlFor="my_modal_5"
                            onClick={() => document.getElementById('my_modal_5').close()}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {/* social sign in */}
                    <div className='text-center space-x-4 mb-5'>
                        <button className="btn btn-circle hover:bg-red hover:text-white" onClick={handleLogin}>
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
            </div>
    );
};

export default Login;
