import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/displayCurrency';

const AdminProductCart = ({
    data,
    fetchData,
}) => {
    const [editProduct, setEditProduct] = useState(false)

    
  return (
    <div className='bg-white p-4 rounded'>
        <div className='w-40'>
            
            <div className='w-32 h-32 flex items-center justify-center rounded-full mx-auto'>
                <img src={data?.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full'/>
            </div>
            <h1 className='text-elipsis line-clamp-2 text-center'>{data.productName}</h1>

            <div>
                <div className='text-sm font-semibold text-center'>
                    {
                        displayCurrency(data?.sellingPrice)
                    }
                </div>

                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 hover:text-white rounded-full cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEdit/>
                </div>
            </div>

        </div>

        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
            )
        }
        
    </div>
  )
}

export default AdminProductCart;