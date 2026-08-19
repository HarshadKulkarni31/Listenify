import { House, Search, Library, Plus, Heart, Music, X } from "lucide-react";

import { NavLink } from "react-router";

import { useState } from "react";

import { usePlayer } from "../context/PlayerContext";

import CreatePlaylistModal from "./CreatePlaylistModal";

function Sidebar({ onClose }) {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const { playlists } = usePlayer();

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <aside className="w-64 h-full bg-black text-white p-6 flex flex-col">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Listenify</h1>

          {/* Mobile close button */}

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-gray-400 hover:text-white"
              title="Close menu"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Main Navigation */}

        <nav className="space-y-2">
          {/* Home */}

          <NavLink
            to="/"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-3 rounded-md transition ${
                isActive
                  ? "bg-[#282828] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#181818]"
              }`
            }
          >
            <House size={22} />

            <span>Home</span>
          </NavLink>

          {/* Search */}

          <NavLink
            to="/search"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-3 rounded-md transition ${
                isActive
                  ? "bg-[#282828] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#181818]"
              }`
            }
          >
            <Search size={22} />

            <span>Search</span>
          </NavLink>

          {/* Library */}

          <NavLink
            to="/library"
            onClick={handleNavigation}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-3 rounded-md transition ${
                isActive
                  ? "bg-[#282828] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#181818]"
              }`
            }
          >
            <Library size={22} />

            <span>Your Library</span>
          </NavLink>
        </nav>

        {/* Playlists */}

        <div className="mt-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Your Playlists
          </h2>

          {/* Create Playlist */}

          <button
            onClick={() => setShowCreatePlaylist(true)}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition mb-4"
          >
            <div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-sm">
              <Plus size={16} />
            </div>

            <span>Create Playlist</span>
          </button>

          {/* Liked Songs */}

          <NavLink
            to="/library"
            onClick={handleNavigation}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition mb-4"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center rounded-sm">
              <Heart size={14} fill="white" />
            </div>

            <span>Liked Songs</span>
          </NavLink>

          {/* Created Playlists */}

          <div className="space-y-1 max-h-64 overflow-y-auto">
            {playlists.length === 0 ? (
              <p className="text-xs text-gray-600 px-3 py-2">
                No playlists yet
              </p>
            ) : (
              playlists.map((playlist) => (
                <NavLink
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                      isActive
                        ? "bg-[#282828] text-white"
                        : "text-gray-400 hover:text-white hover:bg-[#181818]"
                    }`
                  }
                >
                  <Music size={18} />

                  <span className="truncate">{playlist.name}</span>
                </NavLink>
              ))
            )}
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-auto border-t border-[#282828] pt-4">
          <p className="text-xs text-gray-500">Listenify</p>

          <p className="text-xs text-gray-600 mt-1">Your music. Your way.</p>
        </div>
      </aside>

      {/* Create Playlist Modal */}

      {showCreatePlaylist && (
        <CreatePlaylistModal onClose={() => setShowCreatePlaylist(false)} />
      )}
    </>
  );
}

export default Sidebar;
