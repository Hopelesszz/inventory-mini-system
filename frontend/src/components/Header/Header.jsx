import React from 'react'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <FontAwesomeIcon size="2xl" icon={faBoxOpen} />
          <h1>Inventory Mini System</h1>
        </Link>
        <Link to="/add_product" className="header-button">
          <FontAwesomeIcon icon={faPlus} size="sm" />
          Add Product
        </Link>
      </div>
    </header>
  )
}

export default Header;