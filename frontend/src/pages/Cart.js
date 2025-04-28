import React, { useContext, useEffect, useState } from 'react'
import SummaryAPI from '../common'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        const response = await fetch(SummaryAPI.addToCartView.url, {
            method: SummaryAPI.addToCartView.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const responseData = await response.json()

        if(responseData.success) {
            setData(responseData.data)
        }

    }

    const handleLoading = async() => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryAPI.updateCartProduct.url, {
            method: SummaryAPI.updateCartProduct.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })

        const responseData = await response.json()

        if(responseData.success) {
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if(qty>=2){
            const response = await fetch(SummaryAPI.updateCartProduct.url, {
                method: SummaryAPI.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })
    
            const responseData = await response.json()
    
            if(responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryAPI.deleteCartProduct.url, {
            method: SummaryAPI.deleteCartProduct.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json()

        if(responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data?.reduce((previousValue, CurrentValue) => previousValue + CurrentValue?.quantity, 0)
    const totalPrice = data?.reduce((previousValue, CurrentValue) => previousValue + (CurrentValue?.productId?.sellingPrice * CurrentValue?.quantity), 0)

  return (
    <div className='container mx-auto'>

        <div className='text-center text-lg py-2 my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 justify-between p-4'>

            {/* view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (

                        loadingCart?.map((el, index) => {
                            return (
                                <div key={el+"Add To Cart Loading"+index} className='w-full h-32 bg-slate-200 my-2 border border-slate-300 animate-pulse rounded'></div>
                            )
                        })
                        
                    ) : (

                        data?.map((product, index)=>{
                            return (
                                <div key={product?._id+"Add To Cart Loading"} className='w-full h-32 bg-white my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>

                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply p-2' />
                                    </div>

                                    <div className='px-4 py-2 relative'>

                                        {/* delete product */}
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>
                                        
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        
                                        <div className='flex justify-between items-center gap-2'>
                                            <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>

                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-400 hover:bg-red-400 hover:text-white text-red-400 w-6 h-6 flex justify-center items-center rounded-full' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className='border border-red-400 hover:bg-red-400 hover:text-white text-red-400 w-6 h-6 flex justify-center items-center rounded-full' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>

                                    </div>

                                </div>
                            )
                        })

                    )
                }
            </div>

            {/* summary */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (

                        <div className='h-36 bg-slate-200 my-2 border border-slate-200 animate-pulse'>Total</div>

                    ) : (

                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-4'>Summary</h2>

                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity: </p>
                                <p>{totalQty}</p>
                            </div>

                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price: </p>
                                <p>{displayCurrency(totalPrice)}</p>
                            </div>

                            <button className='bg-blue-600 p-2 text-white w-full'>Payment</button>
                        </div>

                    )
                }
            </div>
            

        </div>

    </div>
  )
}

export default Cart