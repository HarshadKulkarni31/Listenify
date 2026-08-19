import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";

import { songs } from "../data/musicData";
import { usePlayer } from "../context/PlayerContext";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const { playSong } = usePlayer();

  const query = searchQuery.trim().toLowerCase();

  const filteredSongs = songs.filter((song) => {
    if (!query) return false;

    return (
      song.title.toLowerCase().includes(query) ||
      song.description.toLowerCase().includes(query)
    );
  });

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handlePlaySong = (song) => {
    playSong(song, filteredSongs);
  };

  return (
    <div className="min-h-full bg-[#121212] text-white px-4 py-6 md:px-8 md:py-8">
      {/* Page title */}

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Search</h1>

      {/* Search input */}

      <div className="relative w-full max-w-2xl">
        <SearchIcon
          size={21}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="What do you want to play?"
          className="w-full bg-white text-black pl-12 pr-12 py-3 rounded-full outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#1ed760]"
        />

        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            title="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Default state */}

      {!searchQuery && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Browse your music</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {songs.slice(0, 4).map((song) => (
              <button
                key={song.id}
                onClick={() => playSong(song, songs)}
                className="bg-[#181818] hover:bg-[#282828] p-4 rounded-lg text-left transition"
              >
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full aspect-square object-cover rounded-md mb-4"
                />

                <h3 className="font-semibold truncate">{song.title}</h3>

                <p className="text-sm text-gray-400 truncate mt-1">
                  {song.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search results */}

      {searchQuery && (
        <div className="mt-10">
          {filteredSongs.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-5">Search results</h2>

              <div className="space-y-1">
                {filteredSongs.map((song, index) => (
                  <button
                    key={song.id}
                    onClick={() => handlePlaySong(song)}
                    className="group w-full flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] text-left transition"
                  >
                    <span className="w-6 text-center text-gray-500 group-hover:text-white">
                      {index + 1}
                    </span>

                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-14 h-14 rounded object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{song.title}</h3>

                      <p className="text-sm text-gray-400 truncate">
                        {song.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold">No results found</h2>

              <p className="text-gray-400 mt-2">
                Try searching for another song or artist.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
