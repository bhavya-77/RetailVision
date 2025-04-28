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

      <HorizontalCardProduct category={"refrigerator"} heading={"Top 10 Refrigerators"}/>
      <HorizontalCardProduct category={"camera"} heading={"Top 10 Camera"}/>

      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"}/>
      <VerticalCardProduct category={"airpods"} heading={"Airpods"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
    </div>
  )
}

export default Home