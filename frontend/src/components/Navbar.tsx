import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-teal-600" />
              <span className="font-bold text-xl text-teal-800">BloodLink</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-teal-700 hover:text-teal-900 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-teal-700 hover:text-teal-900 transition-colors">
              About
            </Link>
            <Link to="/hospitals" className="text-teal-700 hover:text-teal-900 transition-colors">
              Hospitals
            </Link>
            <Link to="/register" className="text-teal-700 hover:text-teal-900 transition-colors">
              Register
            </Link>
            <Link to="/login" className="text-teal-700 hover:text-teal-900 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-lemon-500 hover:bg-lemon-600 text-teal-900 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Become a Donor
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-teal-700 hover:text-teal-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2">
              <Link
                to="/"
                className="block px-3 py-2 text-teal-700 hover:text-teal-900"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-teal-700 hover:text-teal-900"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/hospitals"
                className="block px-3 py-2 text-teal-700 hover:text-teal-900"
                onClick={() => setIsOpen(false)}
              >
                Hospitals
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-teal-700 hover:text-teal-900"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 text-teal-700 hover:text-teal-900"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 bg-lemon-500 hover:bg-lemon-600 text-teal-900 rounded-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Become a Donor
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
