import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './AllProductsCard.css';


export const AllProductsCard = ({totalProducts}) => {
  return (
    <div className='main-counts-all'>
        <pre>
            <FontAwesomeIcon className="main-counts-all-logo" icon={faBoxOpen} />
        </pre>
        <div>
            <p>Total Products</p>
            <h4>{totalProducts}</h4>
            <span>All products in inventory</span>
        </div>
    </div>
  )
}