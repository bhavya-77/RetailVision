import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"accessories"} heading={"Top Accessories"}/>
      <HorizontalCardProduct category={"clothing"} heading={"Top Clothing Products"}/>

      <VerticalCardProduct category={"furniture"} heading={"Furniture"}/>
      <VerticalCardProduct category={"lighting"} heading={"Lighting"}/>
      <VerticalCardProduct category={"footwear"} heading={"Footwear"}/>
      <VerticalCardProduct category={"stationery"} heading={"Stationery"}/>
    </div>
  )
}

export default Home