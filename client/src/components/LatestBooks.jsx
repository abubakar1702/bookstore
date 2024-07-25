import { useState, useEffect } from 'react'
import axios from 'axios'
import Book from './Book'


const LatestBooks = () => {
    const [latestbooks, setLatestBooks] = useState([])

    useEffect(() => {
        const latestBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/latestbooks`)
                setLatestBooks(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        latestBooks()
    }, [])
    return (
        <div className="px-4 lg:px-20 py-8">
            <div className="flex items-center mb-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-gray-500 text-xl md:text-2xl lg:text-4xl py-8">Latest Books</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {latestbooks.map((book, index) => (
                    <Book
                        key={index}
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
    )
}

export default LatestBooks