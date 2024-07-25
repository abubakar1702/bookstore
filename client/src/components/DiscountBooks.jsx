import { } from "react-router-dom";
import Book from "./Book";
import { useEffect, useState } from "react";
import axios from "axios";

const DiscountBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchDiscountedBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/discountbooks');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching discounted books:', error);
            }
        };

        fetchDiscountedBooks();
    }, []);

    console.log(books)

    return (
        <div className="px-4 lg:px-20 py-8">
            <div className="flex items-center mb-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-gray-500 text-xl md:text-2xl lg:text-4xl py-8">Discounted Books</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {books.slice(0, 7).map((book, index) => (
                    <Book
                        key={index}
                        id={book.id}
                        image={book.imageurl}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        mainBook={true}
                        discount={book.discount}
                    //rating={book.rating}
                    />
                ))}
            </div>
        </div>
    )
}

export default DiscountBooks