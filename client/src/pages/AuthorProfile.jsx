import Book from "../components/Book";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthorProfile = () => {
    const { id } = useParams(); // Get the author ID from URL params
    const [author, setAuthor] = useState({});
    const [moreBooks, setMoreBooks] = useState([]);

    // Fetch author profile data
    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/author/${id}`);
                setAuthor(response.data);
            } catch (error) {
                console.error("Error fetching author:", error);
            }
        };

        fetchAuthor();
    }, [id]);

    // Fetch books by the author
    useEffect(() => {
        const fetchBooksByAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/booksbyauthor/${id}`);
                setMoreBooks(response.data);
            } catch (error) {
                console.error("Error fetching books by author:", error);
            }
        };

        fetchBooksByAuthor();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return "Date of Birth";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    return (
        <div className="space-y-10">
            <div className="lg:mx-40 md:mx-10 mx-8">
                <h1 className="text-center text-xl py-4 md:text-2xl text-gray-900">ABOUT THE AUTHOR</h1>
                <div className="grid space-y-5">
                    <div className="flex justify-start items-center bg-gray-400 py-10 px-2 rounded-lg">
                        <div className="flex justify-center md:items-center">
                            <img className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover" src={author.imageurl || "default-author-image.jpg"} alt={author.name || "Author"} />
                        </div>
                        <div className="mx-4">
                            <p className="text-xl md:text-2xl">{author.name || "Author Name"}</p>
                            <p className="text-gray-700">Born: {formatDate(author.date_of_birth)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl">{author.about || "Author bio not available."}</p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-center text-xl py-4 md:text-2xl text-gray-900">All Books by {author.name || "Author"}</h1>
                <div className="flex flex-wrap justify-center gap-14 my-8">
                    {moreBooks.length > 0 ? (
                        moreBooks.map((book) => (
                            <Book
                                key={book.id}
                                id={book.id}
                                image={book.imageurl}
                                title={book.title}
                                author={book.author}
                                price={book.price}
                                mainBook={true}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600">No books available by this author.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthorProfile;
