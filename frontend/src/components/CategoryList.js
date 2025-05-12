import React, { useEffect, useState } from 'react'
import SummaryAPI from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(10).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryAPI.categoryProduct.url, {
            method: SummaryAPI.categoryProduct.method,
        })

        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data || []);

    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {
                loading ? (
                        categoryLoading.map((el, index) => {
                            return(
                                <div className='h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}></div>
                            )
                        })
                    
                ) : 
                (
                    categoryProduct.map((product, index) => {
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category+index}>
                                <div className='flex flex-col items-center'>
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                        <img src={product?.productImage[0]} alt={product?.category} className='w-full h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                    </div>
                                    <p className='text-center justify-center text-sm md:text-base capitalize'>{product?.category.replace(/_/g, ' ')}</p>
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

export default CategoryList