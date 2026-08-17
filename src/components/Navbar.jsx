import { ChevronLeft, ChevronRight, Search, User } from "lucide-react";

import { useNavigate, useLocation } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <header className="h-16 bg-[#121212] flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left side */}

      <div className="flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-gray-300 hover:text-white transition"
          title="Go back"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={goForward}
          className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-gray-300 hover:text-white transition"
          title="Go forward"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Search */}

      <button
        onClick={handleSearch}
        className={`hidden md:flex items-center gap-3 w-80 bg-[#242424] hover:bg-[#2a2a2a] rounded-full px-4 py-2.5 text-gray-400 hover:text-white transition ${
          location.pathname === "/search" ? "ring-1 ring-white" : ""
        }`}
      >
        <Search size={20} />

        <span className="text-sm">What do you want to play?</span>
      </button>

      {/* Right side */}

      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm font-semibold text-gray-300 hover:text-white transition">
          Premium
        </button>

        <button className="hidden sm:block text-sm font-semibold text-gray-300 hover:text-white transition">
          Support
        </button>

        <button
          className="w-9 h-9 bg-[#282828] rounded-full flex items-center justify-center hover:bg-[#3e3e3e] transition"
          title="Profile"
        >
          <User size={19} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
