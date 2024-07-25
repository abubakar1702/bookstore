import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/Context";

const Book = ({ id, image, author, description, title, price, rating, alt, inCart, inWishlist, mainBook, discount }) => {
    const [totalItems, setTotalItems] = useState(1);
    const [isInCart, setIsInCart] = useState(false);

    const { allProducts, setAllProducts, addProductsToCart } = useContext(Context);

    useEffect(() => {
        const found = allProducts.some(product => product.id === id);
        setIsInCart(found);
    }, [allProducts, id]);

    const handleTotalItemsPlus = () => {
        if (totalItems < 3) {
            const newQuantity = totalItems + 1;
            setTotalItems(newQuantity);
            updateProductQuantity(newQuantity);
        }
    };

    const handleTotalItemsMinus = () => {
        if (totalItems > 1) {
            const newQuantity = totalItems - 1;
            setTotalItems(newQuantity);
            updateProductQuantity(newQuantity);
        }
    };

    const numericPrice = Number(price);
    const priceAfterDiscount = discount ? numericPrice - Math.round((discount / 100) * numericPrice) : numericPrice;

    const handleAddToCart = () => {
        addProductsToCart({
            id,
            title,
            image,
            author,
            price: priceAfterDiscount,
            discount,
            quantity: totalItems
        });
    };

    const updateProductQuantity = (newQuantity) => {
        const updatedProducts = allProducts.map(product =>
            product.id === id
                ? { ...product, quantity: newQuantity }
                : product
        );
        setAllProducts(updatedProducts);
        localStorage.setItem("Cart", JSON.stringify(updatedProducts));
    };

    return (
        <>
            {inCart && (
                <div className="h-22 w-auto p-1 flex border justify-between items-center">
                    <div className="flex">
                        <div className="h-auto w-14 shadow-lg">
                            <img className="w-full h-full object-contain overflow-hidden" src={image} alt={alt} />
                        </div>
                        <div className="h-auto px-2 space-y-1">
                            <Link to="/singlebook"><p className="text-sm cursor-pointer">{title}</p></Link>
                            <p className="text-xs text-gray-600">Price: ${priceAfterDiscount.toFixed(2)} x {totalItems}</p>
                            <p className="text-xs text-gray-600">Total: ${(totalItems * priceAfterDiscount).toFixed(2)}</p>
                            <div className="space-x-2">
                                <button onClick={handleTotalItemsPlus} className="px-4 border rounded">+</button>
                                <button onClick={handleTotalItemsMinus} className="px-4 border rounded">-</button>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4">
                        <button className="px-2 border rounded-full hover:text-white hover:bg-black">x</button>
                    </div>
                </div>
            )}
            {inWishlist && (
                <div className="h-22 w-auto p-1 flex border justify-between items-center">
                    <div className="flex">
                        <div className="h-full w-14">
                            <img className="w-full h-full object-contain overflow-hidden" src={image} alt={alt} />
                        </div>
                        <div className="h-auto px-2 space-y-1">
                            <Link to="/singlebook"><p className="text-sm cursor-pointer">{title}</p></Link>
                            <p className="text-xs text-gray-600">{author}</p>
                            <p className="text-xs text-gray-600">Price: ${priceAfterDiscount.toFixed(2)}</p>
                            <button className="px-2 rounded-md border my-2" onClick={handleAddToCart}>Add to cart</button>
                        </div>
                    </div>
                    <div className="mx-2">
                        <button className="px-2 border rounded-full hover:text-white hover:bg-black">x</button>
                    </div>
                </div>
            )}
            {mainBook && (
                <div className="group h-auto w-40 flex flex-col justify-between">
                    <div className="h-48 w-full rounded-md overflow-hidden">
                        <img className="object-contain h-full w-full shadow-lg" src={image} alt={alt} />
                    </div>
                    <div className="h-auto py-1">
                        <Link to={`/singlebook/${id}`}><p className="text-center font-bold cursor-pointer">{title}</p></Link>
                        <p className="text-gray-600 text-center">{author}</p>
                    </div>
                    <div>
                        <p className="text-center text-gray-600">{rating}</p>
                        {!discount && (<p className="text-green-600 text-center">${numericPrice.toFixed(2)}</p>)}
                        {discount && (<p className="text-green-600 text-center">${priceAfterDiscount.toFixed(2)}  <span className="text-center line-through text-gray-400">${numericPrice.toFixed(2)}</span></p>)}
                    </div>
                    {!isInCart && (<div onClick={handleAddToCart} className="hidden group-hover:block absolute bg-red-600 w-40 py-2 mt-20 text-white text-md cursor-pointer shadow-xl">
                        <div className="flex justify-center items-center">
                            Add to cart
                        </div>
                    </div>)}
                    {isInCart && (<div className="hidden group-hover:block absolute bg-orange-400 w-40 py-2 mt-20 text-white text-md cursor-pointer shadow-xl">
                        <div className="flex justify-center items-center">
                            Added to cart
                        </div>
                    </div>)}

                    {discount && (<div className="bg-red-500 text-white w-max py-1 px-2 my-2 absolute ml-24">
                        {discount}% off
                    </div>)}
                </div>
            )}
        </>
    );
}

export default Book;
