import { useState } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  Play,
  Trash2,
  Pencil,
  Heart,
  Plus,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";

import { usePlayer } from "../context/PlayerContext";
import { songs } from "../data/musicData";

function Playlist() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const {
    playlists,
    playSong,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
    renamePlaylist,
  } = usePlayer();

  const [showAddSongs, setShowAddSongs] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState("");

  const playlist = playlists.find((item) => item.id === Number(playlistId));

  if (!playlist) {
    return (
      <div className="p-6 text-white">
        <button
          onClick={() => navigate("/library")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft size={20} />
          Back to Library
        </button>

        <h1 className="text-2xl font-bold">Playlist not found</h1>
      </div>
    );
  }

  const handlePlayPlaylist = () => {
    if (playlist.songs.length === 0) return;

    playSong(playlist.songs[0], playlist.songs);
  };

  const handleAddSong = (song) => {
    addSongToPlaylist(playlist.id, song);
  };

  const handleRemoveSong = (songId) => {
    removeSongFromPlaylist(playlist.id, songId);
  };

  const handleDeletePlaylist = () => {
    deletePlaylist(playlist.id);
    navigate("/library");
  };

  const startRename = () => {
    setNewName(playlist.name);
    setIsRenaming(true);
    setShowMenu(false);
  };

  const handleRename = () => {
    if (!newName.trim()) return;

    renamePlaylist(playlist.id, newName);

    setIsRenaming(false);
  };

  const playlistSongIds = new Set(playlist.songs.map((song) => song.id));

  const availableSongs = songs.filter((song) => !playlistSongIds.has(song.id));

  return (
    <div className="min-h-full text-white">
      {/* Header */}

      <div className="bg-gradient-to-b from-[#3a3a3a] to-[#121212] px-6 pt-6 pb-8">
        <button
          onClick={() => navigate("/library")}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-8"
        >
          <ArrowLeft size={20} />
          Library
        </button>

        <div className="flex items-end gap-6">
          {/* Playlist artwork */}

          <div className="w-52 h-52 shrink-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-2xl">
            <Heart size={80} fill="white" className="text-white" />
          </div>

          {/* Playlist information */}

          <div>
            <p className="text-sm font-semibold">PLAYLIST</p>

            {isRenaming ? (
              <div className="flex items-center gap-3 mt-3">
                <input
                  autoFocus
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleRename();
                    }

                    if (event.key === "Escape") {
                      setIsRenaming(false);
                    }
                  }}
                  className="bg-[#282828] text-white text-4xl font-bold px-3 py-2 rounded outline-none"
                />

                <button
                  onClick={handleRename}
                  className="bg-white text-black px-4 py-2 rounded-full font-semibold"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1 className="text-5xl font-bold mt-3">{playlist.name}</h1>
            )}

            <p className="text-gray-300 mt-4">{playlist.songs.length} songs</p>
          </div>
        </div>
      </div>

      {/* Controls */}

      <div className="px-6 py-6 flex items-center gap-5">
        <button
          onClick={handlePlayPlaylist}
          disabled={playlist.songs.length === 0}
          className="w-14 h-14 rounded-full bg-[#1ed760] text-black flex items-center justify-center hover:scale-105 transition disabled:opacity-40 disabled:hover:scale-100"
        >
          <Play size={25} fill="currentColor" />
        </button>

        <button
          onClick={() => setShowAddSongs(!showAddSongs)}
          className="text-gray-400 hover:text-white transition"
          title="Add songs"
        >
          <Plus size={25} />
        </button>

        {/* More menu */}

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-white"
          >
            <MoreHorizontal size={25} />
          </button>

          {showMenu && (
            <div className="absolute left-0 top-8 bg-[#282828] rounded-md shadow-xl w-48 py-2 z-20">
              <button
                onClick={startRename}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3e3e3e] text-left"
              >
                <Pencil size={17} />
                Rename playlist
              </button>

              <button
                onClick={handleDeletePlaylist}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3e3e3e] text-left text-red-400"
              >
                <Trash2 size={17} />
                Delete playlist
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add songs */}

      {showAddSongs && (
        <section className="mx-6 mb-8 bg-[#181818] rounded-lg p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Add songs</h2>

            <button
              onClick={() => setShowAddSongs(false)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>

          {availableSongs.length === 0 ? (
            <p className="text-gray-400">
              All available songs are already in this playlist.
            </p>
          ) : (
            <div className="space-y-2">
              {availableSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-[#282828]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-12 h-12 rounded object-cover"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold truncate">{song.title}</p>

                      <p className="text-sm text-gray-400 truncate">
                        {song.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddSong(song)}
                    className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Playlist songs */}

      <section className="px-6 pb-10">
        {playlist.songs.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold">This playlist is empty</h2>

            <p className="text-gray-400 mt-2">Add some songs to get started.</p>

            <button
              onClick={() => setShowAddSongs(true)}
              className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              Add songs
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {playlist.songs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#282828]"
              >
                <span className="w-6 text-center text-gray-500">
                  {index + 1}
                </span>

                <img
                  src={song.image}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{song.title}</p>

                  <p className="text-sm text-gray-400 truncate">
                    {song.description}
                  </p>
                </div>

                <button
                  onClick={() => playSong(song, playlist.songs)}
                  className="opacity-0 group-hover:opacity-100 text-white transition"
                >
                  <Play size={20} fill="currentColor" />
                </button>

                <button
                  onClick={() => handleRemoveSong(song.id)}
                  className="text-gray-500 hover:text-red-400 transition"
                  title="Remove song"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Playlist;
