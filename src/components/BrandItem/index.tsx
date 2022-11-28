import * as React from 'react'
import './style.css'

export const BrandItem = ({ onClick, brand }) => {
  return (
    <li onClick={() => onClick(brand)}>
      <img src={brand.logo} width="40" />
      <span>{brand.name}</span>
    </li>
  )
}