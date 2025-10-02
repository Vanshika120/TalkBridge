import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-4 text-white shadow-md flex justify-between items-center">
      <div className="font-extrabold text-2xl">🌍 LangBridge</div>
      <div className="space-x-6">
        <Link to="/" className="hover:underline font-medium">Home</Link>
        {!isAuthenticated && (
          <>
            <Link to="/login" className="hover:underline font-medium">Login</Link>
            <Link to="/signup" className="hover:underline font-medium">Signup</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/translate" className="hover:underline font-medium">Translate</Link>
            <Link to="/history" className="hover:underline font-medium">History</Link>
            <button
              onClick={logout}
              className="ml-4 bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
