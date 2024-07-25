import { Link } from "react-router-dom";
const Pagination = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex items-center">
        <span className="text-red-500 text-4xl mx-2 cursor-pointer">•</span>
        <span className="text-gray-400 text-4xl mx-2 cursor-pointer">•</span>
        <span className="text-gray-400 text-4xl mx-2 cursor-pointer">•</span>
        <span className="text-gray-400 text-4xl mx-2 cursor-pointer">•</span>
      </div>
      <Link to="/books" className="ml-auto text-red-500 text-sm flex items-center">
        View All Products <span className="ml-1">→</span>
      </Link>
    </div>
  );
};

export default Pagination;
