import { useState } from 'react';
import Select from 'react-select';
import book1 from "../assets/book1.jpeg"
import book2 from "../assets/book2.jpeg";
import book3 from "../assets/book3.jpeg";
import book5 from "../assets/book5.jpg";
import book6 from "../assets/book6.jpg";
import book4 from "../assets/book4.jpeg";
import book7 from "../assets/book7.jpg";
import book8 from "../assets/book8.jpg";
import { Link } from 'react-router-dom';
import Book from '../components/Book';

const Order = () => {
  const [totalItems, setTotalItems] = useState(1)
  const handleTotalItemsPlus = () => {
    if (totalItems <= 3) {
      setTotalItems((totalItems) => totalItems + 1)
    }
  }
  const handleTotalItemsMinus = () => {
    if (totalItems > 1) {
      setTotalItems((totalItems) => totalItems - 1)
    }
  }

  const allbooks = [
    { title: "Simple Way Of Piece Life", author: "Armor Ramsey", price: 40, imageUrl: book1 },
    { title: "Great Travel At Desert", author: "Sanchit Howdy", price: 38, imageUrl: book2 },
    { title: "The Lady Beauty Scarlett", author: "Arthur Doyle", price: 45, imageUrl: book3 },
    { title: "Once Upon A Time", author: "Klein Marry", price: 35, imageUrl: book4 },
    { title: "Crime and Punishment", author: "Dostovsky", price: 35, imageUrl: book5 },
    { title: "The Republic", author: "Pleto", price: 35, imageUrl: book6 },
    { title: "Meditation", author: "Murqas Aurelius", price: 35, imageUrl: book7 },
    { title: "Latters from the underground", author: "Dostovsky", price: 35, imageUrl: book8 }
  ];

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
              <input className="w-full p-2 border rounded-md border-gray-300" type="number" id="zip" name="zil" placeholder="Enter Zip Code" />
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
              {allbooks.splice(0,4).map((book, index) => (
                <Book
                  key={index}
                  image={book.imageUrl}
                  title={book.title}
                  inCart={true}
                  price={book.price}
                />))}
            </ul>
          </div>
          <div className='px-2 grid grid-cols-3'>
            <div className='h-14 bg-green-500'>
              Cash On Delivery
            </div>
            <div>
              Bkash
            </div>
            <div>
              Card
            </div>
          </div>
          <div className='py-2'>
            <div className="grid grid-cols-2 gap-y-2 px-2">
              <p className="text-gray-600 text-md">Total Books:</p>
              <p className="text-gray-600 text-md">3</p>
              <p className="text-gray-600 text-md">Total Price:</p>
              <p className="text-gray-600 text-md">$14</p>
              <p className="text-gray-600 text-md">Delivery Charge:</p>
              <p className="text-gray-600 text-md">$1</p>
              <p className="text-gray-600 text-md">Order Date:</p>
              <p className="text-gray-600 text-md">July 3, 2024</p>
              <p className="text-gray-600 text-md">Estimated Delivery day:</p>
              <p className="text-gray-600 text-md">2-3 days</p>

            </div>
          </div>
          <div className='w-full px-2 my-4 space-x-2'>
            <button className='border border-gray-600 p-2 rounded-md hover:bg-green-500 hover:text-white'>Confirm Order</button>
            <Link to="/books" className='border border-gray-600 py-2.5 px-4 rounded-md hover:bg-red-500 hover:text-white'>Cancel</Link>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Order