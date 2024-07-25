import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Book from "../components/Book";

// Book images
import book1 from "../assets/book1.jpeg";
import book2 from "../assets/book2.jpeg";
import book3 from "../assets/book3.jpeg";
import book4 from "../assets/book4.jpeg";
import book5 from "../assets/book5.jpg";
import book6 from "../assets/book6.jpg";
import book7 from "../assets/book7.jpg";
import book8 from "../assets/book8.jpg";

const SingleBook = () => {
    const [book, setBook] = useState({});
    const [publicationDate, setPublicationDate] = useState("");
    const [firstPublished, setFirstPublished] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [genres, setGenres] = useState("");
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [bookAvailability, setBookAvailability] = useState("");
    const [moreBooks, setMoreBooks] = useState([]);
    const { id } = useParams();

    console.log("Fetching book with ID:", id);

    const allbooks = [
        { title: "Simple Way Of Piece Life", author: "Armor Ramsey", price: "$40.00", imageUrl: book1 },
        { title: "Great Travel At Desert", author: "Sanchit Howdy", price: "$38.00", imageUrl: book2 },
        { title: "The Lady Beauty Scarlett", author: "Arthur Doyle", price: "$45.00", imageUrl: book3 },
        { title: "Once Upon A Time", author: "Klein Marry", price: "$35.00", imageUrl: book4 },
        { title: "Crime and Punishment", author: "Dostovsky", price: "$35.00", imageUrl: book5 },
        { title: "The Republic", author: "Pleto", price: "$35.00", imageUrl: book6 },
        { title: "Meditation", author: "Murqas Aurelius", price: "$35.00", imageUrl: book7 },
        { title: "Latters from the underground", author: "Dostovsky", price: "$35.00", imageUrl: book8 }
    ];

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/singlebook/${id}`);
                const fetchedBook = response.data;
                setBook(fetchedBook);

                if (fetchedBook.publication_date) {
                    const date = new Date(fetchedBook.publication_date);
                    const formatted = new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }).format(date);
                    setPublicationDate(formatted);
                }

                if (fetchedBook.first_published) {
                    const date = new Date(fetchedBook.first_published);
                    const formatted = new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }).format(date);
                    setFirstPublished(formatted);
                }

                if (fetchedBook.authordob) {
                    const date = new Date(fetchedBook.authordob);
                    const formatted = new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }).format(date);
                    setDateOfBirth(formatted);
                }

                if (fetchedBook.genres) {
                    setGenres(fetchedBook.genres);
                }

                setBookAvailability(fetchedBook.availability === 1 ? "Available" : "Not Available");
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchBooksByAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/booksbyauthor/${book.author_id}`);
                const fetchedBooksByAuthor = response.data;

                const filteredBooks = fetchedBooksByAuthor.filter(b => b.id !== parseInt(id));
                setMoreBooks(filteredBooks);
            } catch (error) {
                console.error("Error fetching books by author:", error);
            }
        };

        if (book.author_id) {
            fetchBooksByAuthor();
        }
    }, [book.author_id, id]);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncatedDescription = book.description ? book.description.slice(0, 600) : "";
    const displayDescription = showFullDescription ? book.description : truncatedDescription;


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-b-2">
                <div className="border-r-2 h-auto">
                    <div className="p-4 flex justify-center">
                        <img className="w-80 h-auto" src={book.imageurl || book1} alt={book.title} />
                    </div>
                </div>
                <div className="p-4 space-y-2">
                    <h1 className="text-2xl md:text-4xl mb-5 px-2">{book.title}</h1>
                    <div className="flex justify-start items-center">
                        <img className="rounded-full w-10 h-10 object-cover mx-2" src={book.authorimage || book1} alt={book.author} />
                        <Link to={`/author/${book.author_id}`}><p className="md:text-xl text-gray-500">{book.author}</p></Link>
                    </div>
                    {book.description && (
                        <p className="md:text-lg px-2 pb-2 border-b-2">
                            {displayDescription}
                            {book.description.length > 200 && (
                                <span
                                    className="text-blue-500 cursor-pointer ml-1"
                                    onClick={toggleDescription}
                                >
                                    {showFullDescription ? " See less" : " See more"}
                                </span>
                            )}
                        </p>
                    )}
                    <div className="grid grid-cols-2 gap-y-2 px-2">
                        <p className="text-gray-600 text-md">Genres:</p>
                        <p className="text-gray-600 text-md">{genres}</p>
                        <p className="text-gray-600 text-md">Published:</p>
                        <p className="text-gray-600 text-md">{publicationDate} by {book.publication}</p>
                        <p className="text-gray-600 text-md">First Published:</p>
                        <p className="text-gray-600 text-md">{firstPublished}</p>
                        <p className="text-gray-600 text-md">Language:</p>
                        <p className="text-gray-600 text-md">{book.language}</p>
                        <p className="text-gray-600 text-md">Format:</p>
                        <p className="text-gray-600 text-md">{book.format}</p>
                        {book.isbn && <p className="text-gray-600 text-md">ISBN:</p>}
                        {book.isbn && <p className="text-gray-600 text-md">{book.isbn}</p>}
                        <p className="text-gray-600 text-md">Status:</p>
                        <p className="text-gray-600 text-md">{bookAvailability}</p>
                        <p className="text-gray-600 text-md">Rating:</p>
                        <p className="text-gray-600 text-md">{book.rating}</p>
                        {book.discount && <p className="text-gray-600 text-md">Discount:</p>}
                        {book.discount && <p className="text-gray-600 text-md">{book.discount}%</p>}
                        {!book.discount && <p className="text-green-600">Price:</p>}
                        {!book.discount && <p className="text-green-600">${book.price}</p>}
                        {book.discount && <p className="text-green-600">Price:</p>}
                        {book.discount && <p className="text-green-600"><span className="text-gray-400 line-through">${book.price}</span>  <span>${book.price - Math.round((book.discount / 100) * book.price)}</span></p>}
                    </div>
                    <div className="flex">
                        <button className="py-2 px-4 border rounded mx-2 hover:shadow-xl">Add to Cart</button>
                        <button className="p-2 border rounded mx-2 hover:shadow-xl">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-center text-xl py-6">BOOKS YOU MAY LIKE</h1>
                <div className="flex flex-wrap justify-center gap-10">
                    {allbooks.slice(0, 6).map((book, index) => (
                        <Book
                            key={index}
                            id={index} // Use an appropriate key here
                            image={book.imageUrl}
                            title={book.title}
                            author={book.author}
                            price={book.price}
                            mainBook={true}
                        />
                    ))}
                </div>
            </div>
            <div className="my-8">
                {moreBooks.length > 0 && (
                    <div className="my-8">
                        <h1 className="text-center text-xl py-6">More Books by {book.author}</h1>
                        <div className="flex flex-wrap justify-center gap-10">
                            {moreBooks.map((book, index) => (
                                <Book
                                    key={index}
                                    id={book.id}
                                    image={book.imageurl}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    mainBook={true}
                                    discount={book.discount}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleBook;
