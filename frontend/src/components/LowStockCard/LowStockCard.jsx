import React from 'react'
import './LowStockCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

export const LowStockCard = ({lowStockCount}) => {
  return (
    <div className='main-counts-low-stock'>
        <pre>
            <FontAwesomeIcon className="main-counts-low-stock-logo" icon={faWarning} />
        </pre>
        <div>
            <p>Low stock</p>
            <h4>{lowStockCount}</h4>
            <span>Quantity 1 - 5</span>
        </div>
    </div>
  )
}