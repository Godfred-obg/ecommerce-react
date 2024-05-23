import React from 'react'

const Product = (props) => {
  return (
    <div className='product'>
        <img id='image' src={props.image} alt="" />
        <div className='details'>
            <h4 id='product-name'>{props.productname}</h4>
            <h4 id='price'>{props.price}</h4>
        </div>
    </div>
  )
}

export default Product;