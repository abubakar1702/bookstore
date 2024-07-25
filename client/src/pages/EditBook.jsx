import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditBook = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [authorId, setAuthorId] = useState('');
    const [publicationDate, setPublicationDate] = useState(null);
    const [firstPublished, setFirstPublished] = useState(null);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookSelect = async (book) => {
        setSelectedBook(book);
    
        try {
            const response = await axios.get(`http://localhost:5000/api/books/getbookgenres/${book.id}`);
            const bookGenres = response.data;
    
            // Set form data based on selected book
            setFormData({
                title: book.title,
                description: book.description,
                imageurl: book.imageurl,
                author: book.author_id,
                price: book.price,
                availability: book.availability ? 'yes' : 'no',
                language: book.language,
                publication: book.publication,
                pages: book.pages,
                isbn: book.isbn,
            });
    

            setAuthorId(book.author_id);
    
            setSelectedGenres(bookGenres.map(genre => genre.genre_name));
    
            console.log(selectedGenres);
    
            // Set publication dates
            setPublicationDate(book.publication_date ? new Date(book.publication_date) : null);
            setFirstPublished(book.first_published ? new Date(book.first_published) : null);
        } catch (error) {
            console.error('Error fetching book genres:', error);
        }
    };
    
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageurl: '',
        author: '',
        price: '',
        availability: '',
        language: '',
        publication: '',
        pages: '',
        isbn: '',
    });

    const handlePublicationDateChange = date => {
        setPublicationDate(date);
    };
    const handleFirstPublishedChange = date => {
        setFirstPublished(date);
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const handleAvailabilityChange = (e) => {
        setFormData({ ...formData, availability: e.target.value === 'yes' });
    };

    useEffect(() => {
        const getAuthors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/authors');
                setAuthors(response.data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        const getGenres = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/genres');
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        const getBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/allbooks');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }

        getAuthors();
        getGenres();
        getBooks();
    }, []);

    console.log(books.title)


    const handleAddBook = async (e) => {
        e.preventDefault();
        if (!formData.title) {
            toast.error("Title is required");
            return;
        }
        if (!formData.description) {
            toast.error("Description is required");
            return;
        }
        if (!formData.imageurl) {
            toast.error("Image URL is required");
            return;
        }
        if (!formData.author) {
            toast.error("Author is required");
            return;
        }
        if (!formData.price) {
            toast.error("Price is required");
            return;
        }

        setLoading(true);
        console.log(formData)

        const bookData = {
            title: formData.title,
            description: formData.description,
            imageurl: formData.imageurl,
            author_id: formData.author,
            price: formData.price,
            language: formData.language,
            publication: formData.publication,
            publication_date: publicationDate ? publicationDate.toString().split('T')[0] : null,
            first_published: firstPublished ? firstPublished.toString().split('T')[0] : null,
            pages: formData.pages,
            isbn: formData.isbn,
        }

        console.log(formData)

        try {
            const response = await axios.put('http://localhost:5000/api/books/editbook', bookData);
            console.log('Book added successfully:', response.data.bookId);
            toast.success('Book added successfully!');

            const book_id = response.data.bookId;

            if (selectedGenres.length > 0) {
                for (const genreId of selectedGenres) {
                    await axios.post('http://localhost:5000/api/books/addbookgenres', {
                        book_id: book_id,
                        genre_id: genreId
                    });
                }
                console.log('Genres added successfully');
                toast.success('Genres added successfully!');
            }

            setFormData({
                title: '',
                description: '',
                imageurl: '',
                author: '',
                price: '',
                availability: '',
                language: '',
                publication: '',
                pages: '',
                isbn: '',
            });
            setAuthorId('');
            setPublicationDate(null);
            setFirstPublished(null);
            setSelectedGenres([]);

        } catch (error) {
            console.error('Error adding book:', error);
            toast.error('Error adding book: Something went wrong.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            if (error.response) {
                console.error('Server error details:', error.response.data);
            }
        } finally {
            setLoading(false);
        }

    };



    return (
        <div>
            <div className="lg:mx-10">
                <form className="lg:mx-8 mb-10" action="">
                    <div className=" mx-5 border p-4 rounded-lg mt-6 bg-sky-100">
                        <label className="text-lg py-2 mt-2 my-6" htmlFor="book">Search a book to edit</label>
                        <Select
                            options={books.map(book => ({ value: book.id, label: book.title }))}
                            onChange={(selectedOption) => handleBookSelect(books.find(book => book.id === selectedOption.value))}
                            value={selectedBook ? { value: selectedBook.id, label: selectedBook.title } : null}
                            placeholder="Select a book"
                        />
                    </div>
                    <div className="flex flex-col mx-5">
                        <label className="text-lg py-2 mt-2" htmlFor="title">Title <span className="text-sm text-red-500">*</span></label>
                        <input className="p-2 border border-gray-300 rounded" id="title"
                            type="text"
                            placeholder="Enter title"
                            value={formData.title}
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col mx-5">
                        <label className="text-lg py-2 mt-2" htmlFor="description">Description <span className="text-sm text-red-500">*</span></label>
                        <textarea className="p-2 border border-gray-300 rounded" id="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange} />
                    </div>
                    <div className="grid md:grid-cols-2">
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="author">Author <span className="text-sm text-red-500">*</span></label>
                            <Select
                                options={authors.map(author => ({ value: author.id, label: author.name }))}
                                onChange={(selectedOption) => {
                                    setAuthorId(selectedOption.value);
                                    setFormData({ ...formData, author: selectedOption.value });
                                }}
                                value={formData.author ? { value: authorId, label: formData.author } : null}
                                placeholder="Select author"
                            />
                        </div>
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="imageurl">Image Url <span className="text-sm text-red-500">*</span></label>
                            <input className="p-2 border border-gray-300 rounded" id="imageurl"
                                type="text"
                                placeholder="Enter image URL"
                                value={formData.imageurl}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex flex-col mx-5">
                        <label className="text-lg py-2 mt-2" htmlFor="genres">Genre(s)</label>
                        <Select
                            options={genres.map((genre) => ({ value: genre.id, label: genre.name }))}
                            isMulti
                            onChange={(selectedOptions) => {
                                setSelectedGenres(selectedOptions.map(option => option.value));
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="price">Price <span className="text-sm text-red-500">*</span></label>
                            <input className="p-2 border border-gray-300 rounded" id="price"
                                type="number"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="availability">Availability</label>
                            <div className="flex items-center p-2 border border-gray-300 rounded">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id="available"
                                    name="availability"
                                    value="yes"
                                    checked={formData.availability === true}
                                    onChange={handleAvailabilityChange}
                                />
                                <label className="mr-4" htmlFor="available">Yes</label>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id="unavailable"
                                    name="availability"
                                    value="no"
                                    checked={formData.availability === false}
                                    onChange={handleAvailabilityChange}
                                />
                                <label htmlFor="unavailable">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="pages">Pages</label>
                            <input className="p-2 border border-gray-300 rounded" id="pages"
                                type="number"
                                placeholder="Enter pages"
                                value={formData.pages}
                                onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="language">Language</label>
                            <input className="p-2 border border-gray-300 rounded" id="language"
                                type="text"
                                placeholder="Enter language"
                                value={formData.language}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2">
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="pubication">Publication</label>
                            <input className="p-2 border border-gray-300 rounded" id="publication"
                                type="text"
                                placeholder="Enter publication"
                                value={formData.publication}
                                onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="publicationdate">Publication Date</label>
                            <DatePicker
                                selected={publicationDate}
                                onChange={handlePublicationDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select publication date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2">
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="isbn">ISBN</label>
                            <input className="p-2 border border-gray-300 rounded" id="isbn"
                                type="text"
                                placeholder="Enter ISBN"
                                value={formData.isbn}
                                onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="name">First Published</label>
                            <DatePicker
                                selected={firstPublished}
                                onChange={handleFirstPublishedChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select first published date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleAddBook}
                            className={`mt-8 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4zm2 5.29l1.42 1.42A10 10 0 0112 22v-8h8a8 8 0 00-14-4.71z"></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : (
                                'Add Book'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    )
}

export default EditBook