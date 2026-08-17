import { Library as LibraryIcon, Heart } from "lucide-react";

import MusicCard from "../components/MusicCard";
import { usePlayer } from "../context/PlayerContext";

function Library() {
  const { likedSongs } = usePlayer();

  return (
    <div className="p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">
        <LibraryIcon size={32} />

        <h1 className="text-3xl font-bold">Your Library</h1>
      </div>

      {/* Filters */}

      <div className="flex gap-3 mb-8">
        <button className="bg-white text-black px-5 py-2 rounded-full font-semibold">
          All
        </button>

        <button className="bg-[#282828] px-5 py-2 rounded-full hover:bg-[#383838]">
          Playlists
        </button>

        <button className="bg-[#282828] px-5 py-2 rounded-full hover:bg-[#383838]">
          Songs
        </button>

        <button className="bg-[#282828] px-5 py-2 rounded-full hover:bg-[#383838]">
          Albums
        </button>
      </div>

      {/* Liked Songs */}

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-5">Liked Songs</h2>

        <div className="bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg p-6 flex items-center gap-5 max-w-2xl">
          <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center">
            <Heart size={40} fill="white" />
          </div>

          <div>
            <p className="text-sm">Playlist</p>

            <h3 className="text-2xl font-bold">Liked Songs</h3>

            <p className="text-gray-200 text-sm mt-1">
              {likedSongs.length} liked songs
            </p>
          </div>
        </div>
      </section>

      {/* Liked songs */}

      <section>
        <h2 className="text-2xl font-bold mb-5">Your Liked Songs</h2>

        {likedSongs.length === 0 ? (
          <div className="text-gray-400 py-10">
            <p className="text-lg">You haven't liked any songs yet.</p>

            <p className="text-sm mt-2">
              Click the heart icon on a song to add it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {likedSongs.map((song) => (
              <MusicCard
                key={song.id}
                id={song.id}
                title={song.title}
                description={song.description}
                image={song.image}
                audio={song.audio}
                playlist={likedSongs}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Library;
