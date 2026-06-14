import {prisma} from "../db_config/db.js";
const addProduct = async (req, res) => {
    try {
        const {name, quantity, price, description} = req.body;
        const isNameTaken = await prisma.product.count({
            where: {
                name: name,
            }
        })
        const isDescriptionTaken = await prisma.product.count({
            where: {
                description: description,
            }
        })
        if (!name || name === "") {
            return res.status(400).json({error: "Product name is required"});
        }
        if(isNameTaken > 0) {
            return res.status(400).json({error: "Product name must be unique"});
        }
        if(isDescriptionTaken > 0) {
            return res.status(400).json({error: "Product description must be unique"});
        }
        if(quantity === undefined || quantity < 0) {
            return res.status(400).json({error: "Quantity must be more than or equal to 0"});
        }
        if(price === undefined || price < 0) {
            return res.status(400).json({error: "Price must be more than or equal to 0"});
        }
        const status = quantity > 5 ? "in_stock" : quantity >=1 && quantity <= 5 ? "low_stock" : "out_of_stock";
        const newProduct = await prisma.product.create({
            data: {
                name,
                quantity,
                price,
                status,
                description,
            }
        });
        res.status(201).json(newProduct);
       
    } 
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({error: "Failed to add product"});
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({error: "Failed to fetch products"});
    }
};
const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {id: req.params.id},
        });
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({error: "Failed to fetch product"});
    }
};
const updateProduct = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {id: req.params.id},
        });
        if (!product) {
            return res.status(404).json({error: "Product to update was not found"});
        }
        const {name, quantity, price, description} = req.body;
        const updateData = {};

        if (name !== undefined) {
            if (!name || name.trim() === "") {
                return res.status(400).json({ error: "Product name cannot be empty" });
            }
            if(name === product.name) {
                return res.status(400).json({ error: "Product name must be different from the current name" });
            }
            updateData.name = name;
        }
        if (quantity !== undefined) {
            if (Number(quantity) < 0) {
                return res.status(400).json({ error: "Quantity cannot be negative" });
            }
            if(Number(quantity) === product.quantity) {
                return res.status(400).json({ error: "Quantity must be different from the current quantity" });
            }
            updateData.quantity = Number(quantity);
            updateData.status = quantity > 5 ? "in_stock" : quantity >= 1 && quantity <= 5 ? "low_stock" : "out_of_stock";
        }
        if (price !== undefined) {
            if (Number(price) < 0) {
                return res.status(400).json({ error: "Price cannot be negative" });
            }
            if(Number(price) === product.price) {
                return res.status(400).json({ error: "Price must be different from the current price" });
            }
            updateData.price = Number(price);
        }
        if (description !== undefined) {
            if(description === product.description) {
                return res.status(400).json({ error: "Description must be different from the current description" });
            }
            updateData.description = description;
        }
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
        }
        const updatedProduct = await prisma.product.update({
            where: { id: req.params.id },
            data: updateData
        });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({error: "Failed to update product"});
    }
};
const deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({
            where: {id: req.params.id},
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({error: "Failed to delete product"});
    }
};

export {addProduct, getAllProducts, getProductById, updateProduct, deleteProduct};