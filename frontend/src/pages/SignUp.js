import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryAPI from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: ""
    });

    const navigate = useNavigate();

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

        if(data.password === data.confirmPassword){
            
            const dataResponse = await fetch(SummaryAPI.signUp.url, {
                method: SummaryAPI.signUp.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
    
            const dataApi = await dataResponse.json();

            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }

            if(dataApi.error){
                toast.error(dataApi.message)
            }

        } else{
            toast.error("Password and Confirm Password do not match")
        }
    }

    const handleUploadPic = async(e) => {
        const file = e.target.files[0];

        const imagePic = await imageToBase64(file);

        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }

    console.log("data login", data);
    
  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcon} alt="login icon"/>
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-75 bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}></input>
                        </label>
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div>
                        <label>Name: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type="text" 
                                className='w-full h-full outline-none bg-transparent'
                                onChange={handleOnChange}
                                name='name'
                                value={data.name} 
                                required
                                placeholder='Enter your name' />
                        </div>
                    </div>

                    <div>
                        <label>Email: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type="email" 
                                className='w-full h-full outline-none bg-transparent'
                                onChange={handleOnChange}
                                name='email'
                                value={data.email} 
                                required
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
                                required
                                placeholder='Enter your password' />

                            <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                <span>
                                    {
                                        showPassword ? (<FaEyeSlash />):(<FaEye />)
                                    }
                                </span>
                            </div>

                        </div>

                    </div>

                    <div>
                        <label>Confirm Password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className='w-full h-full outline-none bg-transparent'
                                onChange={handleOnChange}
                                name='confirmPassword'
                                value={data.confirmPassword} 
                                required
                                placeholder='Confirm your password' />

                            <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                <span>
                                    {
                                        showConfirmPassword ? (<FaEyeSlash />):(<FaEye />)
                                    }
                                </span>
                            </div>

                        </div>

                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 text-center'>Sign Up</button>

                </form>

                <p className='text-center my-5'>Already have an account? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

            </div>

        </div>
    </section>
  )
}

export default SignUp