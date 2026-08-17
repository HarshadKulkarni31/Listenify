import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MusicPlayer from "./MusicPlayer";

function Layout({ children }) {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}

        <Sidebar />

        {/* Main content */}

        <main className="flex-1 bg-[#121212] overflow-y-auto">
          <Navbar />

          {children}
        </main>
      </div>

      {/* Global player */}

      <MusicPlayer />
    </div>
  );
}

export default Layout;
