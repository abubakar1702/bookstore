import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/Context";
import Book from "./Book";

const Cart = () => {
    const { getProducts , allProducts} = useContext(Context);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const storedProducts = getProducts();
        if (storedProducts) {
            setCartProducts(storedProducts);
        }
    }, [getProducts, allProducts]);
    
    const calculateSubtotal = () => {
        return cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
    };

    return (
        <>
            <div className="absolute border top-14 md:min-w-80 min-w-72 w-auto right-6 md:right-44 rounded-md bg-white shadow-xl z-10">
                <ul className="w-full h-96 overflow-y-scroll">
                    {cartProducts.map((product) => (
                        <li key={product.id}>
                            <Book
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                author={product.author}
                                price={product.price}
                                inCart={true}
                            />
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center border-t-2 py-4 px-2">
                    <div>
                        <p className="text-md">SUBTOTAL: ${calculateSubtotal()}</p>
                    </div>
                    <div>
                        <Link to="/order" className="text-md hover:bg-green-500 hover:text-white border border-gray-600 p-2 rounded-lg">Place Order</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
