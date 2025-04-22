import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryAPI from '../common';
import AdminProductCart from '../components/AdminProductCart';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  const[allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryAPI.allProduct.url, {
      method: SummaryAPI.allProduct.method,
    });
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className='bg-white px-4 py-2 flex items-center justify-between'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='px-3 py-1 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* all products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh - 190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              
              <AdminProductCart data={product} key={index+"allProduct"} fetchData={fetchAllProduct}/>
              
            )
          })
        }
      </div>


      {/* Upload Product Component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }

    </div>
  )
}

export default AllProducts