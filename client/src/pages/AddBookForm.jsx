import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddBookForm = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [authorId, setAuthorId] = useState('');
    const [publicationDate, setPublicationDate] = useState(null);
    const [firstPublished, setFirstPublished] = useState(null);
    const [loading, setLoading] = useState(false);
    const [format, setFormat] = useState('');


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
        format: '',
        discount: ''
    });


    console.log(format)

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
        const value = e.target.value === "yes";
        setFormData({ ...formData, availability: value });
    };

    const handleFormatChange = (selectedOption) => {
        const selectedFormat = selectedOption ? selectedOption.label : '';
        setFormat(selectedFormat);
        setFormData({ ...formData, format: selectedFormat });
    };


    const options = [
        { value: 'paperback', label: 'Paperback' },
        { value: 'hardcover', label: 'Hardcover' },
        { value: 'ebook', label: 'Ebook' }
    ];


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
            publication_date: publicationDate ? publicationDate.toISOString().split('T')[0] : null,
            first_published: firstPublished ? firstPublished.toISOString().split('T')[0] : null,
            pages: formData.pages,
            isbn: formData.isbn,
            availability: formData.availability,
            format: formData.format,
            discount: formData.discount
        }

        console.log(formData)

        try {
            const response = await axios.post('http://localhost:5000/api/books/addbooks', bookData);
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
                genres: '',
                format: '',
                discount: ''
            });
            setAuthorId('');
            setPublicationDate(null);
            setFirstPublished(null);
            setSelectedGenres([]);
            setFormat('')

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
                        <textarea className="p-2 border border-gray-300 rounded h-auto" id="description"
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
                                type="number"
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
                    <div className="grid md:grid-cols-2">
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="discount">Discount(%)</label>
                            <input className="p-2 border border-gray-300 rounded" id="discount"
                                type="number"
                                placeholder="Enter discount"
                                value={formData.discount}
                                onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mx-5">
                            <label className="text-lg py-2 mt-2" htmlFor="format">Format</label>
                            <Select
                                options={options}
                                onChange={handleFormatChange}
                                value={options.find(option => option.label === format) || null}
                                placeholder="Select format"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleAddBook}
                            className={`mt-8 mx-5 px-4 w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                'Adding Book...'
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

export default AddBookForm