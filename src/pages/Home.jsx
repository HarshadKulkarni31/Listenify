import MusicCard from "../components/MusicCard";
import { songs } from "../data/musicData";
import { usePlayer } from "../context/PlayerContext";

function Home() {
  const { recentlyPlayed } = usePlayer();

  return (
    <div className="min-h-full bg-[#121212] text-white">
      <section className="p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

        {/* Made for you */}

        <h2 className="text-2xl font-bold mb-5">Made for you</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {songs.map((song) => (
            <MusicCard
              key={song.id}
              id={song.id}
              title={song.title}
              description={song.description}
              image={song.image}
              audio={song.audio}
              playlist={songs}
            />
          ))}
        </div>

        {/* Recently Played */}

        {recentlyPlayed.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-5">Recently Played</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {recentlyPlayed.map((song) => (
                <MusicCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  description="Recently played"
                  image={song.image}
                  audio={song.audio}
                  playlist={recentlyPlayed}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

export default Home;
