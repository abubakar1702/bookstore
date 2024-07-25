import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthorForm = () => {
  const [authorData, setAuthorData] = useState({
    name: '',
    date_of_birth: '',
    imageurl: '',
    about: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData({ ...authorData, [name]: value });
  };

  const handleDateChange = (date) => {
    setAuthorData({ ...authorData, date_of_birth: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedData = {
        ...authorData,
        date_of_birth: authorData.date_of_birth.toString().slice(0, 10)
      };

      const response = await axios.post('http://localhost:5000/api/books/addauthor', formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Author added:', response.data);
      toast.success("Author added")

      setAuthorData({
        name: '',
        date_of_birth: '',
        imageurl: '',
        about: ''
      });

    } catch (error) {
      console.error('Error adding author:', error.response.data);
      toast.error("Error adding author")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mx-10 h-screen">
      <form onSubmit={handleSubmit} className="lg:mx-8 mb-10">
        <div className="flex flex-col mx-5">
          <label className="text-lg py-2 mt-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={authorData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mx-5">
          <label className="text-lg py-2 mt-2" htmlFor="date_of_birth">
            Date of Birth
          </label>
          <DatePicker
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            selected={authorData.date_of_birth}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date of birth"
          />
        </div>
        <div className="flex flex-col mx-5">
          <label className="text-lg py-2 mt-2" htmlFor="imageurl">
            Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imageurl"
            name="imageurl"
            type="text"
            placeholder="Enter image URL"
            value={authorData.imageurl}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mx-5">
          <label className="text-lg py-2 mt-2" htmlFor="about">
            About
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="about"
            name="about"
            placeholder="Enter about author"
            value={authorData.about}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {loading ? 'Processing...' : 'Add Author'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AuthorForm;
