// Importing required libraries and components
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GrSearch } from "react-icons/gr";
import { FaCamera, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import Logo from './Logo';
import SummaryAPI from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const context = useContext(Context);
    const navigate = useNavigate();

    const searchInput = useLocation();
    const urlSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = urlSearch.getAll("q");
    const [search, setSearch] = useState(searchQuery);

    // Creating a state that is tracking whether user menu dropdown is open
    const [menuDisplay, setMenuDisplay] = useState(false);


    // Handling logout functionality
    const handleLogout = async () => {
        const fetchData = await fetch(SummaryAPI.logout.url, {
            method: SummaryAPI.logout.method,
            credentials: "include",
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    // Handling text search input changes
    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate("/search");
        }
    };

    // Handling when user clicks camera icon and uploads an image
    const handleImageUpload = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "mern_product");

            // Uploading the image to Cloudinary
            const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            // Navigating to the search page and passing uploaded image URL for AI search
            navigate(`/search?image=${uploadData.secure_url}`);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>

                {/* Logo */}
                <div className=''>
                    <Link to={"/"}>
                        <Logo w={90} h={50} />
                    </Link>
                </div>

                {/* Search Bar with Camera Icon */}
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                    <input
                        type="text"
                        placeholder='Search Product Here... (Text or Image)'
                        className='w-full outline-none'
                        onChange={handleSearch}
                        value={search}
                    />
                    <label htmlFor="searchImageUpload" className='text-lg min-w-[50px] h-8 bg-gray-300 flex items-center justify-center cursor-pointer'>
                        <FaCamera />
                    </label>
                    <input
                        type="file"
                        id="searchImageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className='hidden'
                    />
                </div>

                {/* User / Cart / Login Buttons */}
                <div className='flex items-center gap-7'>
                    {/* User Profile Section */}
                    <div className='relative flex justify-center'>
                        {user?._id && (
                            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                                {user?.profilePic ? (
                                    <img src={user?.profilePic} alt={user?.name} className='w-10 h-10 rounded-full' />
                                ) : (
                                    <div>
                                        <FaRegUserCircle />
                                    </div>
                                )}
                            </div>
                        )}
                        {menuDisplay && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                                <nav>
                                    {user?.role === ROLE.ADMIN && (
                                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                                    )}
                                </nav>
                            </div>
                        )}
                    </div>

                    {/* Cart Icon */}
                    {user?._id && (
                        <Link to={"/cart"} className='text-2xl relative'>
                            <span><FaShoppingCart /></span>
                            <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3 rounded-full'>
                                <p className='text-sm'>{context?.cartProductCount}</p>
                            </div>
                        </Link>
                    )}

                    {/* Login / Logout Button */}
                    <div>
                        {user?._id ? (
                            <button onClick={handleLogout} className='bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-all duration-300'>Logout</button>
                        ) : (
                            <Link to={"/login"} className='bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-all duration-300'>Login</Link>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;