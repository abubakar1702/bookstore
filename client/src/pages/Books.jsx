import { useState, useEffect } from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select';
import { IoFilter } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";
import RangeSlider from '../components/RangeSlider';
import Book from '../components/Book';


const Books = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filterDiv, setFilterDiv] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 18;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, genresResponse, authorsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/books/allbooks'),
          axios.get('http://localhost:5000/api/books/genres'),
          axios.get('http://localhost:5000/api/books/authors'),
        ]);

        setBooks(booksResponse.data);
        setGenres(genresResponse.data);
        setAuthors(authorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredBooks = books.filter(book => {
    const isGenreMatch = selectedGenres.length ? selectedGenres.some(genre => book.genres?.includes(genre.name)) : true;
    const isAuthorMatch = selectedAuthor ? book.author === selectedAuthor.label : true;
    const isPriceMatch = book.price >= priceRange[0] && book.price <= priceRange[1];
    return isGenreMatch && isAuthorMatch && isPriceMatch;
  });

  const handleFilterButton = () => {
    setFilterDiv(!filterDiv);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      {!filterDiv ? (
        <IoFilter onClick={handleFilterButton} className='text-2xl ml-5 my-4 cursor-pointer' />
      ) : (
        <MdFilterListOff onClick={handleFilterButton} className='text-2xl ml-5 my-4 cursor-pointer' />
      )}
      <div className='flex flex-col md:flex-row items-stretch md:items-start justify-center'>
        {/* Filters Section */}
        {filterDiv && (
          <div className={`w-full md:w-1/4 p-4 bg-white`}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Filters</h2>
              <hr className="border-gray-300 mb-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Genres</label>
              <Multiselect
                options={genres}
                selectedValues={selectedGenres}
                onSelect={setSelectedGenres}
                onRemove={setSelectedGenres}
                displayValue="name"
                placeholder="Select genres"
                className="shadow appearance-none w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
              <Select
                options={[{ value: null, label: "Clear" }, ...authors.map(author => ({ value: author.id, label: author.name }))]}
                onChange={(selectedOption) => setSelectedAuthor(selectedOption.value === null ? null : { value: selectedOption.value, label: selectedOption.label })}
                value={selectedAuthor}
                placeholder="Select author"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price Range</label>
            </div>
            <RangeSlider
              minValue={priceRange[0]}
              maxValue={priceRange[1]}
              onChange={(min, max) => setPriceRange([min, max])}
            />
          </div>
        )}

        {/* Books Section */}
        <div className="w-full md:w-3/4 px-4 min-h-screen">
          <div className='flex flex-wrap justify-center gap-6'>
            {currentBooks.map((book, index) => (
              <Book
                key={index}
                mainBook={true}
                id={book.id}
                title={book.title}
                author={book.author}
                image={book.imageurl}
                discount={book.discount}
                price={book.price}
              />
            ))}
          </div>
          <div className='flex justify-center my-6'>
            {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 border rounded ${currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
