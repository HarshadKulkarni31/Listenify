import { useState } from "react";

import { House, Search, Library, Plus, Heart, Music } from "lucide-react";

import { NavLink } from "react-router";

import { usePlayer } from "../context/PlayerContext";

import CreatePlaylistModal from "./CreatePlaylistModal";

function Sidebar() {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const { playlists } = usePlayer();

  return (
    <>
      <aside className="w-64 bg-black text-white p-6 flex flex-col shrink-0">
        {/* Logo */}

        <h1 className="text-2xl font-bold mb-8">Listenify</h1>

        {/* Main Navigation */}

        <nav className="space-y-2">
          {/* Home */}

          <NavLink
            to="/"
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

        {/* Playlist Section */}

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
            className="flex items-center gap-3 text-gray-400 hover:text-white transition mb-4"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center rounded-sm">
              <Heart size={14} fill="white" />
            </div>

            <span>Liked Songs</span>
          </NavLink>

          {/* User Created Playlists */}

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

        {/* Bottom Section */}

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
