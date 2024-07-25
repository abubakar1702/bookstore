import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [bookPrice, setBookPrice] = useState(0);

    
    const [allProducts, setAllProducts] = useState(() => {
        const products = localStorage.getItem("Cart");
        return products ? JSON.parse(products) : [];
    });
    const addProductsToCart = (data) => {
        const existingProduct = allProducts.find(product => product.id === data.id);
        let updatedProducts;

        if (existingProduct) {

            updatedProducts = allProducts.map(product =>
                product.id === data.id
                    ? { ...product, quantity: (product.quantity || 1) + 1 }
                    : product
            );
        } else {

            updatedProducts = [...allProducts, { ...data, quantity: 1 }];
        }

        setAllProducts(updatedProducts);
        localStorage.setItem("Cart", JSON.stringify(updatedProducts));
    };

    const getProducts = () => {
        const products = localStorage.getItem("Cart");
        return products ? JSON.parse(products) : [];
    };

    const updateProductQuantity = (id, newQuantity) => {
        const updatedProducts = allProducts.map(product =>
            product.id === id
                ? { ...product, quantity: newQuantity }
                : product
        );
        setAllProducts(updatedProducts);
        localStorage.setItem("Cart", JSON.stringify(updatedProducts));
    };

    const calculateSubtotal = () => {
        return allProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
    };

    useEffect(() => {
        setBookPrice(calculateSubtotal());
    }, [allProducts]);

    return (
        <Context.Provider value={{ allProducts, setAllProducts, addProductsToCart, getProducts, updateProductQuantity, bookPrice, setBookPrice }}>
            {children}
        </Context.Provider>
    );
};
