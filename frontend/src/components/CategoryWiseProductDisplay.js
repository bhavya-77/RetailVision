import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';
import scrollToTop from '../helpers/scrollToTop';

const CategoryWiseProductDisplay = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(10).fill(null)

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("vertical data", categoryProduct?.data)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div className='container mx-auto px-4 my-6 relative'>

        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>

            {
                loading ? (
                    loadingList.map((product, index) => {
                        return(
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
    
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] items-center justify-center flex animate-pulse'>
                                    {/* <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 mix-blend-multiply'/> */}
                                </div>
    
                                <div className='p-4 grid gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200 animate-pulse rounded-full py-2'></h2>
    
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full py-2'></p>
    
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                                    </div>
    
                                    <button className='text-sm text-white px-3 rounded-full p-1 bg-slate-200 w-full animate-pulse py-2'></button>
                                </div>
    
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) => {
                        return(
                            <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollToTop}>
    
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] items-center justify-center flex'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 mix-blend-multiply'/>
                                </div>
    
                                <div className='p-4 grid gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
    
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
    
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayCurrency(product?.price)}</p>
                                    </div>
    
                                    <button className='text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
    
                            </Link>
                        )
                    })
                )   
            }
        </div>

    </div>
  )
}

export default CategoryWiseProductDisplay