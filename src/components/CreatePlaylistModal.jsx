import { useState } from "react";
import { X } from "lucide-react";

import { usePlayer } from "../context/PlayerContext";

function CreatePlaylistModal({ onClose }) {
  const [name, setName] = useState("");

  const { createPlaylist } = usePlayer();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    createPlaylist(trimmedName);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#282828] w-full max-w-md rounded-xl p-6 shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create Playlist</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>
          <label htmlFor="playlist-name" className="text-sm text-gray-300">
            Playlist name
          </label>

          <input
            id="playlist-name"
            autoFocus
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="My playlist"
            className="w-full mt-2 bg-[#3e3e3e] text-white px-4 py-3 rounded-md outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-white"
          />

          {/* Buttons */}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-sm font-semibold text-white hover:bg-[#3e3e3e] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePlaylistModal;
