import { useEffect, useState } from 'react';
import './Home.css';
import { AllProductsCard } from '../../components/AllProductsCard/AllProductsCard';
import Header from '../../components/Header/Header';
import { InStockCard } from '../../components/InStockCard/InStockCard';
import { LowStockCard } from '../../components/LowStockCard/LowStockCard';
import { OutOfStockCard } from '../../components/OutOfStockCard/OutOfStockCard';
import { ProductsTable } from '../../components/ProductsTable/ProductsTable';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const totalProducts = products.length;
    const inStockCount = products.filter(p => p.status === "in_stock").length;
    const lowStockCount = products.filter(p => p.status === "low_stock").length;
    const outOfStockCount = products.filter(p => p.status === "out_of_stock").length;
    const [deleteModal, setDeleteModal] = useState(false);
    const [productModal, setProductModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");
    const navigate = useNavigate();

    const handleOpenDelete = (id) => {
        setSelectedProductId(id);
        setDeleteModal(true);
    };
    const handleOpenProduct = (id) => {
        setSelectedProductId(id);
        setProductModal(true);
    }
    const openEditForm = (id) => {
        navigate(`/edit_product/${id}`);
    }
    const fetchProducts = async () => {
        try {
            setIsLoading(true); 
            const res = await axios.get("/products");
            setProducts(res.data);
        } 
        catch (err) {
            console.error(err);
        } 
        finally {
            setIsLoading(false); 
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[]);
    return (
        <>
            <Header />
            <main className="main">
                <div className="main-container"> 
                <div className="main-header">
                    <h2>Products</h2>
                    <span>Manage your inventory products</span>
                </div>
                {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#64748b', fontWeight: '500' }}>
                            Loading inventory data...
                        </div>
                    ) : (
                    <>
                        <div className="main-counts">
                            <AllProductsCard totalProducts={totalProducts} />
                            <InStockCard inStockCount={inStockCount} />
                            <LowStockCard lowStockCount={lowStockCount}/>
                            <OutOfStockCard outOfStockCount={outOfStockCount}/>
                        </div>
                        <ProductsTable products={products} openDeleteModal={handleOpenDelete} openProductModal={handleOpenProduct} openEditForm={openEditForm} />
                    </>
                    )}
                </div>
            </main>
            {deleteModal && (
                <DeleteModal 
                productId={selectedProductId} 
                setProductId={setSelectedProductId} 
                setDeleteModal={setDeleteModal} 
                fetchProducts={fetchProducts} 
                />
            )}
            {productModal && (
                <ProductModal 
                productId={selectedProductId} 
                setProductId={setSelectedProductId} 
                setProductModal={setProductModal} 
                />
            )}
        </>
    )
}