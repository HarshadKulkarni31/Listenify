import MusicCard from "../components/MusicCard";
import { songs } from "../data/musicData";

function Home() {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Main application area */}

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}

        <main className="flex-1 bg-[#121212] overflow-y-auto">
          {/* Home content */}

          <section className="p-6">
            <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>

            {/* Quick Playlists */}

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

            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-5">Recently played</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {songs.slice(0, 2).map((song) => (
                  <MusicCard
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    description="Recently played"
                    image={song.image}
                    audio={song.audio}
                    playlist={songs}
                  />
                ))}
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
