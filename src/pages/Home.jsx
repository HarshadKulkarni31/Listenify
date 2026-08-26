import { useEffect, useState } from "react";

import MusicCard from "../components/MusicCard";
import { supabase } from "../lib/supabase";

function Home() {
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

  if (loading) {
    return (
      <div className="h-full bg-[#121212] text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

        <p className="text-gray-400">Loading your music...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-[#121212] text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

        <p className="text-red-400">Failed to load songs: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#121212] text-white overflow-y-auto">
      <section className="p-6">
        <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

        {/* Made for you */}

        <h2 className="text-2xl font-bold mb-5">Made for you</h2>

        {songs.length === 0 ? (
          <p className="text-gray-400">No songs available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {songs.map((song) => (
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
        )}

        {/* Recently Played */}

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Recently played</h2>

          {songs.length === 0 ? (
            <p className="text-gray-400">No recently played songs.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {songs.slice(0, 2).map((song) => (
                <MusicCard
                  key={`recent-${song.id}`}
                  id={song.id}
                  title={song.title}
                  description="Recently played"
                  image={song.cover_url}
                  audio={song.audio_url}
                  playlist={songs}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

export default Home;
