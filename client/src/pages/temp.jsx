import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Multiselect from 'multiselect-react-dropdown';
import AuthorForm from './AuthorForm';

const Admin = () => {
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [publicationDate, setPublicationDate] = useState(null);
    const [firstPublished, setFirstPublished] = useState(null);
    const [currentForm, setCurrentForm] = useState('AddBook');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        author: '',
        price: '',
        language: '',
        publication: '',
        pages: '',
        isbn: '',
    });
    

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

        getAuthors();
        getGenres();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handlePublicationDateChange = date => {
        setPublicationDate(date);
    };

    const handleFirstPublishedChange = date => {
        setFirstPublished(date);
    };

    const handleSubmit = async () => {
        try {
            const bookResponse = await axios.post('http://localhost:5000/api/books/addbook', {
                title: formData.title,
                description: formData.description,
                imageUrl: formData.imageUrl,
                author: formData.author,
                price: formData.price,
                language: formData.language,
                publication: formData.publication,
                publicationDate: publicationDate ? publicationDate.toString().split('T')[0] : null,
                firstPublished: firstPublished ? firstPublished.toString().split('T')[0] : null,
                pages: formData.pages,
                isbn: formData.isbn,
            });

            const bookId = bookResponse.data.bookId;

            const genreRequests = selectedGenres.map(genreId => {
                return axios.post('http://localhost:5000/api/books/addbookgenres', {
                    book_id: bookId,
                    genre_id: genreId,
                });
            });

            await Promise.all(genreRequests);

            alert('Book and genres added successfully!');
            setFormData({
                title: '',
                description: '',
                imageUrl: '',
                author: '',
                price: '',
                language: '',
                publication: '',
                pages: '',
                isbn: '',
            });
            setSelectedGenres([]);
            setPublicationDate(null);
            setFirstPublished(null);

        } catch (error) {
            console.error('Error adding book and genres:', error);
            alert('Failed to add book and genres');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-sky-100">
            <nav className="absolute top-32 w-full mt-4 md:mt-0 bg-blue-500 text-white py-2">
                <ul className="flex justify-center space-x-8">
                    <li>
                        <button onClick={() => setCurrentForm('AddBook')} className="hover:underline text-xl">Add Book</button>
                    </li>
                    <li>
                        <button onClick={() => setCurrentForm('AddAuthor')} className="hover:underline text-xl">Add Author</button>
                    </li>
                </ul>
            </nav>
            {currentForm === 'AddBook' ? (
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Genres</label>
                            <Multiselect
                                options={genres}
                                onSelect={(selectedList) => {
                                    const genreIds = selectedList.map(genre => genre.id);
                                    setSelectedGenres(genreIds);
                                }}
                                onRemove={(selectedList) => {
                                    const genreIds = selectedList.map(genre => genre.id);
                                    setSelectedGenres(genreIds);
                                }}
                                displayValue="name"
                                placeholder="Select genres"
                                className="shadow appearance-none w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                                Image URL
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="imageUrl"
                                type="text"
                                placeholder="Enter image URL"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                                Author
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="author"
                                value={formData.author}
                                onChange={handleChange}
                            >
                                <option value="">Select an author</option>
                                {authors.map(author => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price (USD)
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                                Language
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="language"
                                type="text"
                                placeholder="Enter language"
                                value={formData.language}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publication">
                                Publication
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="publication"
                                type="text"
                                placeholder="Enter publication"
                                value={formData.publication}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publicationDate">
                                Publication Date
                            </label>
                            <DatePicker
                                selected={publicationDate}
                                onChange={handlePublicationDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select publication date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstPublished">
                                First Published
                            </label>
                            <DatePicker
                                selected={firstPublished}
                                onChange={handleFirstPublishedChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select first published date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pages">
                                Pages
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="pages"
                                type="number"
                                placeholder="Enter pages"
                                value={formData.pages}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">
                                ISBN
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="isbn"
                                type="text"
                                placeholder="Enter ISBN"
                                value={formData.isbn}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            ) : (
                <AuthorForm />
            )}
        </div>
    );
};

export default Admin;
