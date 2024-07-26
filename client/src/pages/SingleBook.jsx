import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Book from "../components/Book";

const SingleBook = () => {
    const [book, setBook] = useState({});
    const [publicationDate, setPublicationDate] = useState("");
    const [firstPublished, setFirstPublished] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [genres, setGenres] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [bookAvailability, setBookAvailability] = useState("");
    const [moreBooks, setMoreBooks] = useState([]);
    const [booksYouMayLike, setBooksYouMayLike] = useState([]);
    const { id } = useParams();


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
                    setGenres(fetchedBook.genres.split(', ')); // Assuming genres are comma-separated
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

    useEffect(() => {
        const fetchBooksByGenres = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/allbooks`);
                const allBooks = response.data;

                // Filter books by genres and exclude the current book
                const filtered = allBooks.filter(b =>
                    b.genres && genres.some(genre => b.genres.includes(genre)) &&
                    b.id !== parseInt(id) // Exclude current book
                );

                setBooksYouMayLike(filtered);
            } catch (error) {
                console.error("Error fetching books by genres:", error);
            }
        };

        if (genres.length > 0) {
            fetchBooksByGenres();
        }
    }, [genres, id]);

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
                        <img className="w-80 h-auto" src={book.imageurl} alt={book.title} />
                    </div>
                </div>
                <div className="p-4 space-y-2">
                    <h1 className="text-2xl md:text-4xl mb-5 px-2">{book.title}</h1>
                    <div className="flex justify-start items-center">
                        <img className="rounded-full w-10 h-10 object-cover mx-2" src={book.authorimage} alt={book.author} />
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
                        <p className="text-gray-600 text-md">{genres.join(', ')}</p>
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
                        {book.discount && <p className="text-red-600 text-md">{book.discount}%</p>}
                        {!book.discount && <p className="text-gray-600 text-md">Price:</p>}
                        {!book.discount && <p className="text-green-600">{book.price}</p>}
                        {book.discount && <p className="text-gray-500 text-md">Price:</p>}
                        {book.discount && (
                            <p className="text-green-600 text-md">
                                <span className="text-gray-400 line-through">${book.price}</span>{" "}
                                <span>${(book.price - Math.round((book.discount / 100) * book.price)).toFixed(2)}</span>
                            </p>
                        )}
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
                    {booksYouMayLike.slice(0, 6).map((book, index) => (
                        <Book
                            key={book.id}
                            id={book.id}
                            image={book.imageurl}
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
                            {moreBooks.map((book) => (
                                <Book
                                    key={book.id}
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
