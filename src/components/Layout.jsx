import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MusicPlayer from "./MusicPlayer";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}

        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 bottom-0 w-72 bg-black z-50 transform transition-transform duration-300 md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}

        <main className="flex-1 min-w-0 bg-[#121212] overflow-y-auto">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

          <div className="pb-24 md:pb-0">{children}</div>
        </main>
      </div>

      {/* Global Music Player */}

      <MusicPlayer />
    </div>
  );
}

export default Layout;
