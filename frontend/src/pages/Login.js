import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryAPI from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const { fetchUserDetails } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryAPI.signIn.url, {
            method: SummaryAPI.signIn.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/");
            fetchUserDetails(); // fetch user details after login
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

    console.log("data login", data);

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcon} alt="login icon"/>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div>
                        <label>Email: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type="email" 
                                className='w-full h-full outline-none bg-transparent'
                                onChange={handleOnChange}
                                name='email'
                                value={data.email} 
                                placeholder='Enter your email' />
                        </div>
                    </div>

                    <div>
                        <label>Password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className='w-full h-full outline-none bg-transparent'
                                onChange={handleOnChange}
                                name='password'
                                value={data.password} 
                                placeholder='Enter your password' />

                            <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                <span>
                                    {
                                        showPassword ? (<FaEyeSlash />):(<FaEye />)
                                    }
                                </span>
                            </div>

                        </div>
                        <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>Forgot Password?</Link>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 text-center'>Login</button>

                </form>

                <p className='text-center my-5'>Don't have an account? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link></p>

            </div>

        </div>
    </section>
  )
}

export default Login