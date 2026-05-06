import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">

      {/* FULL WIDTH CONTAINER */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-10">

        {/* LEFT - CRM (PUSHED FULL LEFT) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <h1 className="text-xl font-bold text-blue-600">
            CRM System
          </h1>
        </div>

        {/* CENTER - NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link
            to="/dashboard"
            className={`transition ${
              isActive("/dashboard")
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/leads"
            className={`transition ${
              isActive("/leads")
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Leads
          </Link>

        </div>

        {/* RIGHT - LOGOUT (FULL RIGHT) */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}