import { Link, useLocation } from "react-router-dom";
import { BsCart3, BsPerson } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Login from "./Login";
import SignUp from "./SignUp";

import logo from "../assets/Screenshot_5-6-2024_212219_www.logoai.com-ai-brush-removebg-st4sxgj6123.png";

const Navbar = () => {
    const [search, setSearch] = useState(false);
    const location = useLocation();
    const [showCartItems, setShowCartItems] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const cartDropdownRef = useRef(null);

    const handleSearchField = () => {
        setSearch(!search);
    }

    const getLinkClass = (path) => {
        return location.pathname === path ? 'text-red-500' : 'text-black';
    }

    const handleCartItems = () => {
        setShowCartItems(!showCartItems)
    }

    const handleWishlist = () => {
        setWishlist(!wishlist)
    }

    const handleLogin = () => {
        setShowLogin(!showLogin)
        setShowSignUp(false)
    }

    const handleSignUp = () => {
        setShowSignUp(!showSignUp)
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
                setShowCartItems(false);
            }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
    
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showCartItems]);
    

    return (
        <div>
            <div className="flex justify-between items-center py-4">
                <div className="px-2 md:px-4 w-40">
                    <img className="w-40" src={logo} alt="Logo" />
                    {/* <h1 className="text-2xl">Bookworm</h1> */}
                </div>
                <div className="relative w-full max-w-md mx-auto">
                    <div className="hidden lg:block">
                        <input
                            type="text"
                            className="w-full rounded-full px-4 py-2 border"
                            placeholder="Search a book"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <IoMdSearch size={24} />
                        </button>
                    </div>
                </div>
                <div className="lg:hidden">
                    <IoMdSearch className="cursor-pointer" onClick={handleSearchField} size={22} />
                </div>
                <div className="hidden md:block px-4">
                    <ul className="flex flex-row justify-center items-center divide-x-2">
                        {showCartItems ?
                            (
                                <li className={`text-center px-2 text-red-500 flex cursor-pointer`} onClick={handleCartItems}>
                                    <BsCart3 className="mt-1 text-xl" /><span className="text-center text-xl px-2 flex flex-row">Cart</span>
                                </li>
                            ) : (
                                <li className={`text-center px-2 flex cursor-pointer`} onClick={handleCartItems}>
                                    <BsCart3 className="mt-1 text-xl" /><span className="text-center text-xl px-2 flex flex-row">Cart</span>
                                </li>
                            )}

                        {showCartItems && <Cart ref={cartDropdownRef} />}

                        {wishlist ?
                            (
                                <li onClick={handleWishlist} className={`text-center px-2 flex flex-row text-red-500 text-xl cursor-pointer`}>
                                    <IoMdHeartEmpty className="mt-1 text-xl" /> <span className="text-center px-2 flex flex-row text-xl">Wishlist</span>
                                </li>
                            ) : (
                                <li onClick={handleWishlist} className="text-center px-2 flex flex-row text-xl cursor-pointer">
                                    <IoMdHeartEmpty className="mt-1 text-xl" /> <span className="text-center px-2 flex flex-row text-xl">Wishlist</span>
                                </li>
                            )}

                        {wishlist && <Wishlist />}

                        <div>
                            <li onClick={handleLogin} className="text-center w-32 text-nowrap px-2 py-1 mx-2 border rounded-md text-xl flex justify-center cursor-pointer">
                                <BsPerson className="text-xl mt-1" />
                                <span className="text-center px-2">Log in</span>
                            </li>
                        </div>

                    </ul>
                </div>

                <div className="px-4 md:hidden">
                    <ul className="flex items-center space-x-4">
                        <li>
                            <IoMdHeartEmpty onClick={handleWishlist} size={22} />
                            {wishlist && <Wishlist />}

                        </li>

                        <li>
                            <BsCart3 onClick={handleCartItems} size={22} />
                            {showCartItems && <Cart ref={cartDropdownRef} />}
                        </li>
                        <li>
                            <BsPerson onClick={handleLogin} size={22} />
                        </li>
                        {showLogin && (
                            <div className="flex justify-center">
                                {!showSignUp && <Login loginBtn={handleLogin} signUpBtn={handleSignUp} logo={logo} />}
                                {showSignUp && <SignUp loginBtn={handleLogin} signUpBtn={handleSignUp} logo={logo} />}
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            {search && (
                <div className="relative w-full max-w-md mx-auto px-4 lg:hidden">
                    <div className="">
                        <input
                            type="text"
                            className="w-full rounded-full px-4 py-2 border"
                            placeholder="Search a book"
                        />
                        <button className="absolute right-6 top-1/2 transform -translate-y-1/2">
                            <IoMdSearch size={24} />
                        </button>
                    </div>
                </div>
            )}
            <div className="">
                <ul className="flex md:space-x-4 divide-x justify-center items-center py-5">
                    <Link to="/" className={`text-center px-2 md:px-4 md:text-xl ${getLinkClass('/')}`}>HOME</Link>
                    <Link to="/books" className={`text-center px-2 md:px-4 md:text-xl ${getLinkClass('/books')}`}>BOOKS</Link>
                    <Link to="/stationeries" className={`text-center px-2 md:px-4 md:text-xl ${getLinkClass('/stationeries')}`}>STATIONERIES</Link>
                    <Link to="/blog" className={`text-center px-2 md:px-4 md:text-xl ${getLinkClass('/blog')}`}>BLOG</Link>
                    <Link to="/aboutus" className={`text-center px-2 md:px-4 md:text-xl ${getLinkClass('/aboutus')}`}>ABOUT US</Link>
                </ul>
            </div>
            {showLogin && (
                <div className="flex justify-center">
                    {!showSignUp && <Login loginBtn={handleLogin} signUpBtn={handleSignUp} logo={logo} />}
                    {showSignUp && <SignUp loginBtn={handleLogin} signUpBtn={handleSignUp} logo={logo} />}
                </div>
            )}
        </div>
    );
};

export default Navbar;
