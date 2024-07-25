

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-4">
          <a href="#" className="text-white hover:text-gray-400 px-2">Home</a>
          <a href="#" className="text-white hover:text-gray-400 px-2">About</a>
          <a href="#" className="text-white hover:text-gray-400 px-2">Services</a>
          <a href="#" className="text-white hover:text-gray-400 px-2">Contact</a>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} Your Website Name. All Rights Reserved.</p>
        </div>
        <div className="mt-2">
          <a href="#" className="text-white hover:text-gray-400 px-1">Privacy Policy</a>
          <span className="text-white">|</span>
          <a href="#" className="text-white hover:text-gray-400 px-1">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
