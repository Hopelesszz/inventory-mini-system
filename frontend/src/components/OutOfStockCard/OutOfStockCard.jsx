import React from 'react';
import './OutOfStockCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const OutOfStockCard = ({outOfStockCount}) => {
  return (
    <div className='main-counts-out-of-stock'>
        <pre>
            <FontAwesomeIcon className="main-counts-out-of-stock-logo" icon={faXmark} />
        </pre>
        <div>
            <p>Out of stock</p>
            <h4>{outOfStockCount}</h4>
            <span>Quantity = 0</span>
        </div>
    </div>
  )
}