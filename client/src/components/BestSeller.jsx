import {  } from "react-router-dom";

import book1 from "../assets/book1.jpeg";
import book2 from "../assets/book2.jpeg";
import book3 from "../assets/book3.jpeg";
import book5 from "../assets/book5.jpg";
import book6 from "../assets/book6.jpg";
import book4 from "../assets/book4.jpeg";
import book7 from "../assets/book7.jpg";
import book8 from "../assets/book8.jpg";
import Book from "./Book";

const BestSeller = () => {

    const books = [
        { title: "Simple Way Of Piece Life", author: "Armor Ramsey", price: "$40.00", imageUrl: book1, disscount:43, rating: 4.5 },
        { title: "Great Travel At Desert", author: "Sanchit Howdy", price: "$38.00", imageUrl: book2, disscount:23, rating: 4.5 },
        { title: "The Lady Beauty Scarlett", author: "Arthur Doyle", price: "$45.00", imageUrl: book3, disscount:50, rating: 4.5 },
        { title: "Once Upon A Time", author: "Klein Marry", price: "$35.00", imageUrl: book4, disscount:43, rating: 4.5 },
        { title: "Crime and Punishment", author: "Dostovsky", price: "$35.00", imageUrl: book5, disscount:43, rating: 4.5 },
        { title: "The Republic", author: "Pleto", price: "$35.00", imageUrl: book6, disscount:43, rating: 4.5 },
        { title: "Meditation", author: "Murqas Aurelius", price: "$35.00", imageUrl: book7, disscount:43, rating: 4.5 },
        { title: "Latters from the underground", author: "Dostovsky", price: "$35.00", imageUrl: book8, disscount:43, rating: 4.5 }
    ];
    return (
        <div className="px-4 lg:px-20 py-8">
            <div className="flex items-center mb-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-gray-500 text-xl md:text-2xl lg:text-4xl py-8">Best Seller</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {books.slice(0, 7).map((book, index) => (
                    <Book
                        key={index}
                        image={book.imageUrl}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        mainBook={true}
                        //disscount={book.disscount}
                        //rating={book.rating}
                    />
                ))}
            </div>
        </div>
    )
}

export default BestSeller