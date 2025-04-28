import React from 'react'
import logo from '../assest/RetailVision.png'

const Logo = ({w, h}) => {
  return (
    <img
      className='mix-blend-multiply object-fit-contain'
      src={logo}
      alt="RetailVision Logo"
      width = {w}
      height = {h}
      style={{ objectFit: 'contain' }}
    />
  )
}

export default Logo