import { Heart, Play } from "lucide-react";

import { usePlayer } from "../context/PlayerContext";

function MusicCard({ id, title, description, image, audio, playlist }) {
  const { playSong, toggleLike, isLiked } = usePlayer();

  const song = {
    id,
    title,
    description,
    image,
    audio,
  };

  const handlePlay = () => {
    playSong(song, playlist);
  };

  const handleLike = (event) => {
    event.stopPropagation();
    toggleLike(song);
  };

  const liked = isLiked(id);

  return (
    <div className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-lg transition duration-300 cursor-pointer">
      {/* Artwork */}

      <div className="relative aspect-square rounded-md overflow-hidden mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Play button */}

        <button
          onClick={handlePlay}
          className="absolute bottom-3 right-3 w-12 h-12 bg-[#1ed760] text-black rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
        >
          <Play size={22} fill="currentColor" />
        </button>
      </div>

      {/* Song information */}

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-semibold truncate">{title}</h2>

          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Like button */}

        <button
          onClick={handleLike}
          className={`shrink-0 transition ${
            liked ? "text-[#1ed760]" : "text-gray-500 hover:text-white"
          }`}
          aria-label={liked ? "Remove from liked songs" : "Add to liked songs"}
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

export default MusicCard;
