import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Book from '../components/Book';

import bkash from "../assets/bkash.png"
import cod from "../assets/cod.png"
import card from "../assets/card.png"

const Order = () => {
  const [totalItems, setTotalItems] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(''); // State for selected payment method

  useEffect(() => {
    const items = localStorage.getItem("Cart");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  const handleTotalItemsPlus = () => {
    if (totalItems <= 3) {
      setTotalItems(prevTotal => prevTotal + 1);
    }
  };

  const handleTotalItemsMinus = () => {
    if (totalItems > 1) {
      setTotalItems(prevTotal => prevTotal - 1);
    }
  };

  const calculateTotals = () => {
    const totalBooks = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalBooks, totalPrice };
  };

  const { totalBooks, totalPrice } = calculateTotals();
  const deliveryCharge = 1;
  const orderDate = new Date().toLocaleDateString();
  const estimatedDeliveryDay = '2-3 days';

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
        <div className="px-6 mb-6">
          <form className='space-y-2 md:space-y-4' action="">
            <h1 className="text-xl text-center p-4">Customer Details</h1>
            <div className="mb-2">
              <label className="py-2" htmlFor="name">Name</label>
              <input className="w-full p-2 border border-gray-300 rounded-md" type="text" id="name" name="name" placeholder="Enter name" />
            </div>
            <div className="mb-2">
              <label className="py-2" htmlFor="phone">Phone Number</label>
              <input className="w-full p-2 border rounded-md border-gray-300" type="number" id="phone" name="phone" placeholder="Enter Phone Number" />
            </div>
            <div className="mb-2">
              <label className="py-2" htmlFor="email">Email</label>
              <input className="w-full p-2 border rounded-md border-gray-300" type="email" id="email" name="email" placeholder="Enter email" />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:space-x-2'>
              <div className="mb-2">
                <label className="py-2" htmlFor="division">Select Division</label>
                <Select />
              </div>
              <div className="mb-2">
                <label className="py-2" htmlFor="district">Select District</label>
                <Select />
              </div>
            </div>
            <div className="mb-2">
              <label className="py-2" htmlFor="zip">Zip Code</label>
              <input className="w-full p-2 border rounded-md border-gray-300" type="number" id="zip" name="zip" placeholder="Enter Zip Code" />
            </div>
            <div className="mb-2">
              <label className="py-2" htmlFor="address">Address in details</label>
              <textarea className="w-full p-2 border rounded-md border-gray-300" type="text" id="address" name="address" placeholder="Enter address" />
            </div>
          </form>
        </div>

        <div className="flex flex-col md:border-l-2 px-4">
          <h1 className="text-xl text-center p-4">Order Details</h1>
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <Book
                  key={index}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  inOrder={true}
                  price={item.price}
                  format={item.format}
                  discount={item.discount}
                  quantity={item.quantity}
                />
              ))}
            </ul>
          </div>

          {/* Payment Method Section */}
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <div className="flex flex-col">
              <label className="flex items-center cursor-pointer mb-2">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')} 
                  className="peer hidden" 
                />
                <span className="w-full flex items-center p-2 border rounded-md border-gray-300 peer-checked:bg-gray-200">
                  <img src={cod} alt="Cash on Delivery" className="w-16 h-8 object-contain" />
                  <span className="ml-2">Cash on Delivery</span>
                </span>
              </label>
              <label className="flex items-center cursor-pointer mb-2">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bkash" 
                  checked={paymentMethod === 'bkash'} 
                  onChange={() => setPaymentMethod('bkash')} 
                  className="peer hidden" 
                />
                <span className="w-full flex items-center p-2 border rounded-md border-gray-300 peer-checked:bg-gray-200">
                  <img src={bkash} alt="Bkash" className="w-16 h-8 object-contain" />
                  <span className="ml-2">Bkash</span>
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')} 
                  className="peer hidden" 
                />
                <span className="w-full flex items-center p-2 border rounded-md border-gray-300 peer-checked:bg-gray-200">
                  <img src={card} alt="Card" className="w-16 h-8 object-contain" />
                  <span className="ml-2">Credit/Debit Card</span>
                </span>
              </label>
            </div>
          </div>

          <div className='py-2'>
            <div className="grid grid-cols-2 gap-y-2 px-2">
              <p className="text-gray-600 text-md">Total Books:</p>
              <p className="text-gray-600 text-md">{totalBooks}</p>
              <p className="text-gray-600 text-md">Total Price:</p>
              <p className="text-gray-600 text-md">${totalPrice.toFixed(2)}</p>
              <p className="text-gray-600 text-md">Delivery Charge:</p>
              <p className="text-gray-600 text-md">${deliveryCharge.toFixed(2)}</p>
              <p className="text-gray-600 text-md">Order Date:</p>
              <p className="text-gray-600 text-md">{orderDate}</p>
              <p className="text-gray-600 text-md">Estimated Delivery day:</p>
              <p className="text-gray-600 text-md">{estimatedDeliveryDay}</p>
            </div>
          </div>
          <div className='w-full px-2 my-4 space-x-2'>
            <button className='border border-gray-600 p-2 rounded-md hover:bg-green-500 hover:text-white'>Confirm Order</button>
            <Link to="/books" className='border border-gray-600 py-2.5 px-4 rounded-md hover:bg-red-500 hover:text-white'>Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
