import Book from "./Book";


import book1 from "../assets/book1.jpeg";
import book2 from "../assets/book2.jpeg";
import book3 from "../assets/book3.jpeg";
import book5 from "../assets/book5.jpg";
import book6 from "../assets/book6.jpg";
import book4 from "../assets/book4.jpeg";
import book7 from "../assets/book7.jpg";
import book8 from "../assets/book8.jpg";

const allbooks = [
    { title: "Simple Way Of Piece Life", author: "Armor Ramsey", price: "40.00", imageUrl: book1 },
    { title: "Great Travel At Desert", author: "Sanchit Howdy", price: "38.00", imageUrl: book2 },
    { title: "The Lady Beauty Scarlett", author: "Arthur Doyle", price: "45.00", imageUrl: book3 },
    { title: "Once Upon A Time", author: "Klein Marry", price: "35.00", imageUrl: book4 },
    { title: "Crime and Punishment", author: "Dostovsky", price: "35.00", imageUrl: book5 },
    { title: "The Republic", author: "Pleto", price: "35.00", imageUrl: book6 },
    { title: "Meditation", author: "Murqas Aurelius", price: "35.00", imageUrl: book7 },
    { title: "Latters from the underground", author: "Dostovsky", price: "35.00", imageUrl: book8 }
];

const Wishlist = () => {
    return (
        <div className="absolute border top-14 w-auto md:min-w-80 min-w-72 right-10 md:right-16 rounded-md bg-white shadow-xl z-10">
            <ul className="w-full h-96 overflow-y-scroll">
                {allbooks.map((book, index) => (
                    <li key={index}>
                        <Book
                            image={book.imageUrl}
                            author={book.author}
                            title={book.title}
                            inWishlist={true}
                            price={book.price}
                        />
                    </li>
                ))}
            </ul>
            <div className="flex justify-around items-center py-2 px-2 border-t-2">
                <div>
                    <button className="border undeline p-1 px-2 hover:bg-blue-500 hover:text-white rounded-lg">Add All to Cart</button>
                </div>
                <div>
                    <button className="border p-1 px-2 hover:bg-red-500 hover:text-white rounded-lg">Clear List</button>
                </div>
            </div>
        </div>
    )
}

export default Wishlist