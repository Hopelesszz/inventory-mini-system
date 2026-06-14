import React from 'react';
import "./ProductsTable.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faTrashCan,faEye } from '@fortawesome/free-solid-svg-icons';


export const ProductsTable = ({products, openDeleteModal, openProductModal, openEditForm}) => {
  return (
    <>
    <div className="table-card">
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              <td>
                <div className="product-name">
                  {product.name}
                </div>
              </td>

              <td>{product.quantity}</td>

              <td>${product.price}</td>

              <td>
                <span
                  className={`status-badge ${product.status}`}
                >
                  {product.status}
                </span>
              </td>

              <td>{product.createdAt}</td>

              <td>
                <div className="actions">
                    <button onClick={() => openEditForm(product.id)} className='edit-btn'>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={() => openDeleteModal(product.id)} className='delete-btn'>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button onClick={() => openProductModal(product.id)} className='get-one-btn'>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}
