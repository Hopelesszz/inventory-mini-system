import React from 'react';
import "./DeleteModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export const DeleteModal = ({productId, setProductId, setDeleteModal,fetchProducts}) => {
    const onClose = () => {
        setDeleteModal(false);
    }
    const deleteProduct = async () => {
        try {
            await axios.delete(`/products/${productId}`);
            onClose();
            await fetchProducts();
            setProductId("");
        }
        catch(err) {
            console.log(err);
        }

    }
    return (
        <div className="background">
            <div className='modal'>
                <FontAwesomeIcon onClick={onClose} className='closeIcon' icon={faXmark} />
                <h1>Do you want to delete product?</h1>
                <div className='modal__buttons'>
                    <button onClick={deleteProduct} className='modal__button__yes'>Yes</button>
                    <button onClick={onClose} className='modal__button__no'>No</button>
                </div>
            </div>
        </div>
  )
}
