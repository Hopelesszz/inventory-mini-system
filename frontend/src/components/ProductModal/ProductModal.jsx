import React, { useEffect, useState } from 'react';
import "./ProductModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export const ProductModal = ({productId, setProductId, setProductModal}) => {
    const [product,setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const onClose = () => {
        setProductModal(false);
    }
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true); 
                const res = await axios.get(`/products/${productId}`);
                setProduct(res.data);
            } 
            catch (err) {
                console.error(err);
            } 
            finally {
                setIsLoading(false); 
            }
        }
        fetchProduct();
    },[productId]);
    return (
        <div className="background">
            <div className='product-modal'>
                <div className='product-modal-header'>
                    <h1>Product Info</h1>
                    <FontAwesomeIcon onClick={onClose} className='closeModalIcon' icon={faXmark} />
                </div>
                {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#64748b', fontWeight: '500' }}>
                            Loading inventory data...
                        </div>
                    ) : (
                        <div className="product-info">
                            <div className="info-row">
                                <span className="label">ID</span>
                                <span className="value">{product.id}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Name</span>
                                <span className="value">{product.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Description</span>
                                <span className="value">{product.description}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Quantity</span>
                                <span className="value">{product.quantity}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Price</span>
                                <span className="value">{product.price}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Status</span>
                                <span className={`status-badge ${product.status}`}>{product.status}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Created At</span>
                                <span className="value">{product.createdAt}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Updated At</span>
                                <span className="value">{product.updatedAt}</span>
                            </div>
                        </div>    
                    )}
            </div>
        </div>
    )
}