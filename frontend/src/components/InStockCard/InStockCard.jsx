import React from 'react';
import './InStockCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const InStockCard = ({inStockCount}) => {
  return (
    <div className='main-counts-in-stock'>
        <pre>
            <FontAwesomeIcon className="main-counts-in-stock-logo" icon={faCheck} />
        </pre>
        <div>
            <p>In stock</p>
            <h4>{inStockCount}</h4>
            <span>Quantity &gt; 5</span>
        </div>
    </div>
  )
}
