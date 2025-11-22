import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/nisrin.png";

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClass = "text-gray-300 hover:text-purple-400 transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full";

  return (
    <nav className="flex justify-between items-center p-6 bg-gray-900/90 backdrop-blur-md border-b border-purple-900/30 sticky top-0 z-50">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Nisrin Logo" className="h-10 w-auto hover:opacity-80 transition-opacity duration-300" />
      </Link>
      <div className="flex items-center space-x-8 text-l">
        <Link className={linkClass} to="/">Home</Link>
        <Link className={linkClass} to="/about">About</Link>
        <Link className={linkClass} to="/education">Education</Link>
        <Link className={linkClass} to="/services">Services</Link>
        <Link className={linkClass} to="/projects">Projects</Link>
        <Link className={linkClass} to="/contact">Contact</Link>

        {isAuthenticated() ? (
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-purple-900/50">
            <span className="text-purple-400 text-sm">
              {user?.name} {isAdmin() && <span className="text-xs bg-purple-600/30 px-2 py-1 rounded-full ml-1">Admin</span>}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 rounded-lg transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-purple-900/50">
            <Link
              to="/signin"
              className="px-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
