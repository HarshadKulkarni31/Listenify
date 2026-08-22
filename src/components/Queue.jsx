import { X, ListMusic } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

function Queue({ onClose }) {
  const { queue, currentIndex, playFromQueue } = usePlayer();

  return (
    <div className="fixed right-0 top-0 bottom-20 w-full sm:w-96 bg-[#181818] border-l border-[#282828] z-50 shadow-2xl">
      {/* Header */}

      <div className="h-16 flex items-center justify-between px-5 border-b border-[#282828]">
        <div className="flex items-center gap-3">
          <ListMusic size={22} />

          <h2 className="font-bold text-lg">Queue</h2>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#282828] transition"
          title="Close queue"
        >
          <X size={20} />
        </button>
      </div>

      {/* Queue content */}

      <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
        {queue.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <ListMusic size={48} className="text-gray-600 mb-4" />

            <h3 className="font-semibold text-lg">Your queue is empty</h3>

            <p className="text-sm text-gray-500 mt-2">
              Play a song to start building your queue.
            </p>
          </div>
        ) : (
          <>
            {/* Now Playing */}

            {queue[currentIndex] && (
              <section className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 mb-3">
                  Now Playing
                </h3>

                <div className="flex items-center gap-3 p-3 bg-[#282828] rounded-md">
                  <img
                    src={queue[currentIndex].image}
                    alt={queue[currentIndex].title}
                    className="w-14 h-14 rounded object-cover"
                  />

                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {queue[currentIndex].title}
                    </p>

                    <p className="text-sm text-[#1ed760]">Playing</p>
                  </div>
                </div>
              </section>
            )}

            {/* Next */}

            <section>
              <h3 className="text-sm font-bold text-gray-400 mb-3">Next</h3>

              <div className="space-y-1">
                {queue.map((song, index) => {
                  if (index === currentIndex) {
                    return null;
                  }

                  return (
                    <button
                      key={`${song.id}-${index}`}
                      onClick={() => playFromQueue(index)}
                      className="w-full flex items-center gap-3 p-3 rounded-md text-left hover:bg-[#282828] transition"
                    >
                      <img
                        src={song.image}
                        alt={song.title}
                        className="w-12 h-12 rounded object-cover shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="font-medium truncate">{song.title}</p>

                        <p className="text-sm text-gray-400 truncate">
                          {song.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Queue;
