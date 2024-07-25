import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddGenreForm = () => {
    const [genreName, setGenreName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setGenreName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/books/addgenre', {
                genre_name: genreName
            });

            console.log('Genre added successfully:', response.data);
            toast.success('Genre added successfully');
            setGenreName('');
        } catch (error) {
            console.error('Error adding genre:', error);
            toast.error('Error adding genre. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:mx-10 h-screen">
            <form onSubmit={handleSubmit} className="lg:mx-8 mb-10">
                <div className="flex flex-col mx-5">
                    <label className="text-lg py-2 mt-2" htmlFor="genreName">
                        Genre Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="genreName"
                        name="genreName"
                        type="text"
                        placeholder="Enter genre name"
                        value={genreName}
                        onChange={handleChange}
                        required
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
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        )}
                        {loading ? 'Adding Genre...' : 'Add Genre'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddGenreForm;
