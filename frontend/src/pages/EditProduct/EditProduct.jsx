import Header from '../../components/Header/Header';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export const EditProduct = () => {
    const [name,setName] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [error, setError] = useState("");
    const [nameVisible,setNameVisible] = useState(false);
    const [quantityVisible,setQuantityVisible] = useState(false);
    const [priceVisible,setPriceVisible] = useState(false);
    const [descriptionVisible,setDescriptionVisible] = useState(false);
    const handleCheckboxChange = (field) => {
        switch(field) {
            case "name":
                setNameVisible(prev => !prev);
                break;
            case "quantity":
                setQuantityVisible(prev => !prev);
                break;
            case "price":
                setPriceVisible(prev => !prev);
                break;
            case "description":
                setDescriptionVisible(prev => !prev);
                break;
            default:
                console.log(`Wrong option.`);
        }
    };
    const { id } = useParams();
    const navigate = useNavigate();
    const editProduct = async (e) => {
        e.preventDefault(); 
        try {
            const updatedData = {};
            if(nameVisible === true) {
                updatedData.name = name;
            }
            if(quantityVisible === true) {
                updatedData.quantity = quantity;
            }
            if(priceVisible === true) {
                updatedData.price = price;
            }
            if(descriptionVisible === true) {
                updatedData.description = description;
            }
            await axios.patch(`/products/${id}`, updatedData);
            navigate("/")
        }
        catch(err) {
            console.log(err);
            const serverErrorText = err.response?.data?.error || "Something went wrong";
            setError(serverErrorText); 
        }
    }
    return (
        <>
            <Header/>
            <main className="main">
                <div className="main-container">
                    <form onSubmit={editProduct} className='add-product-form'>
                        <h1>Edit Product</h1>
                        <div className="checkbox-group" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                            <label>
                                <input type="checkbox" checked={nameVisible} onChange={() => handleCheckboxChange('name')} /> Name
                            </label>
                            <label>
                                <input type="checkbox" checked={quantityVisible} onChange={() => handleCheckboxChange('quantity')} /> Quantity
                            </label>
                            <label>
                                <input type="checkbox" checked={priceVisible} onChange={() => handleCheckboxChange('price')} /> Price
                            </label>
                            <label>
                                <input type="checkbox" checked={descriptionVisible} onChange={() => handleCheckboxChange('description')} /> Description
                            </label>
                        </div>
                        {nameVisible && (
                            <div className="form-group">
                                <label>Name</label>
                                <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Enter product name" />
                            </div>
                        )}
                        {quantityVisible && (
                            <div className="form-group">
                                <label>Quantity</label>
                                <input onChange={(e) => setQuantity(e.target.value)} type="number" step="1" name="quantity" min={0} placeholder="Enter product quantity" />
                            </div>
                        )}
                        {priceVisible && (
                            <div className="form-group">
                                <label>Price</label>
                                <input onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" name="price" min={0} placeholder="Enter product price" />
                            </div>
                        )}
                        {descriptionVisible && (
                            <div className="form-group">
                                <label>Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} name="description" placeholder="Enter product description"></textarea>
                            </div>
                        )}
                        <button className='add-product-button'>Edit product</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </main>
        </>
    )
}