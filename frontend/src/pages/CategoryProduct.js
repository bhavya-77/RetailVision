import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryAPI from '../common'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListInArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const[sortBy, setSortBy] = useState("")


    const fetchData = async () => {
      const response = await fetch(SummaryAPI.filterProduct.url, {
        method: SummaryAPI.filterProduct.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      })

      const dataResponse = await response.json()

      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
      const { name, value, checked } = e.target

      setSelectCategory((prev) => {
        return {
          ...prev,

          [value]: checked,
        }
      })
    }

    useEffect(() => {
      fetchData()
    }, [filterCategoryList])

    useEffect(() => {
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
        
        if(selectCategory[categoryKeyName]) {
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      // format for URL change
      const urlFormat = arrayOfCategory.map((el, index) => {
        if((arrayOfCategory.length - 1) === index) {
          return `category=${el}`
        }

        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    }, [selectCategory])


    const handleOnChangeSortBy = (e) => {
      const { value } = e.target

      setSortBy(value)

      if(value === "ascending") {
        setData(prev => prev.sort((a,b) => a.sellingPrice - b.sellingPrice))
      }

      if(value === "descending") {
        setData(prev => prev.sort((a,b) => b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(() => {}, [sortBy])


  return (
    <div className='container mx-auto p-4'>

      {/* desktop version */}
      <div className='hidden lg:grid grid-cols-[180px,1fr]'>

        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>

          {/* sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300'>Sort By</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"ascending"} onChange={handleOnChangeSortBy} checked={sortBy === "ascending"} />
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"descending"} onChange={handleOnChangeSortBy} checked={sortBy === "descending"} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300'>Filter By</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3'>
                      <input 
                        type='checkbox' 
                        name={'category'} 
                        id={categoryName?.value} 
                        value={categoryName?.value} 
                        onChange={handleSelectCategory}
                        checked={selectCategory[categoryName?.value]}
                      />
                      <label htmlFor={categoryName?.value} className='capitalize'>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>

        {/* right side (products) */}
        <div className='px-2'>
          <p className='font-medium text-lg text-slate-800 my-2'>Search Results : {data.length}</p>

          <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll'>
            {
              data.length !== 0 && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>

        </div>

      </div>

      {/* mobile version */}
        
    </div>
  )
}

export default CategoryProduct