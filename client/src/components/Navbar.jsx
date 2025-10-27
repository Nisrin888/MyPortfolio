import { Link } from "react-router-dom";
import logo from "../assets/nisrin.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-900/90 backdrop-blur-md border-b border-purple-900/30 sticky top-0 z-50">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Nisrin Logo" className="h-10 w-auto hover:opacity-80 transition-opacity duration-300" />
      </Link>
      <div className="space-x-8 text-l">
        <Link className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full" to="/">Home</Link>
        <Link className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full" to="/about">About</Link>
        <Link className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full" to="/education">Education</Link>
        <Link className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full" to="/services">Services</Link>
        <Link className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full" to="/projects">Projects</Link>
        <Link className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full" to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
