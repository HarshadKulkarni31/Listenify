import { useEffect, useState } from "react";

import MusicCard from "../components/MusicCard";
import { supabase } from "../lib/supabase";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Failed to fetch songs:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setSongs(data || []);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((song) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return false;
    }

    return (
      song.title?.toLowerCase().includes(query) ||
      song.description?.toLowerCase().includes(query) ||
      song.category?.toLowerCase().includes(query) ||
      song.artist?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="h-full bg-[#121212] text-white overflow-y-auto">
      <section className="p-6">
        <h1 className="text-3xl font-bold mb-6">Search</h1>

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="What do you want to play?"
          className="w-full max-w-lg bg-white text-black px-5 py-3 rounded-full outline-none"
        />

        {loading && <p className="text-gray-400 mt-8">Loading songs...</p>}

        {error && (
          <p className="text-red-400 mt-8">Failed to load songs: {error}</p>
        )}

        {!loading && !error && searchQuery.trim() === "" && (
          <p className="text-gray-400 mt-8">
            Search for songs, artists, or categories.
          </p>
        )}

        {!loading &&
          !error &&
          searchQuery.trim() !== "" &&
          filteredSongs.length === 0 && (
            <p className="text-gray-400 mt-8">
              No songs found for "{searchQuery}".
            </p>
          )}

        {filteredSongs.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-5">Search results</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredSongs.map((song) => (
                <MusicCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  description={song.description}
                  image={song.cover_url}
                  audio={song.audio_url}
                  playlist={songs}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

export default Search;
