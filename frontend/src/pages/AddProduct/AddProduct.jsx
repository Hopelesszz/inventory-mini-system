import './AddProduct.css';
import Header from '../../components/Header/Header';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const AddProduct = () => {
    const [name,setName] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const addProduct = async (e) => {
        e.preventDefault(); 
        try {
            await axios.post("/products",{
                name: name,
                quantity: Number(quantity), 
                price: Number(price),       
                description: description
            });
            navigate("/")
        }
        catch(err) {
            const serverErrorText = err.response?.data?.error || "Something went wrong";
            setError(serverErrorText); 
        }
    }
    return (
        <>
            <Header/>
            <main className="main">
                <div className="main-container">
                    <form onSubmit={addProduct} className='add-product-form'>
                        <h1>Add Product</h1>
                        <div className="form-group">
                            <label>Name</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Enter product name" />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input onChange={(e) => setQuantity(e.target.value)} type="number" step="1"  name="quantity" min={0} placeholder="Enter product quantity" />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" name="price" min={0} placeholder="Enter product price" />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea onChange={(e) => setDescription(e.target.value)} name="description" placeholder="Enter product description"></textarea>
                        </div>
                        <button className='add-product-button'>Add product</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </main>
        </>
    )
}