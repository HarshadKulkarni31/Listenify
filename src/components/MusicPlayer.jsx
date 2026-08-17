import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
} from "lucide-react";

import { usePlayer } from "../context/PlayerContext";

function formatTime(time) {
  if (!time || Number.isNaN(time)) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    volume,
    togglePlay,
    nextSong,
    previousSong,
    toggleShuffle,
    toggleRepeat,
    seek,
    changeVolume,
  } = usePlayer();

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (event) => {
    if (!duration) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const clickPosition = event.clientX - rect.left;

    const percentage = clickPosition / rect.width;

    const newTime = percentage * duration;

    seek(newTime);
  };

  return (
    <footer className="h-20 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-6">
      {/* Song information */}

      <div className="flex items-center gap-3 w-1/4 min-w-0">
        <div className="w-12 h-12 bg-[#282828] rounded overflow-hidden shrink-0">
          {currentSong && (
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">
            {currentSong?.title || "No song playing"}
          </h3>

          <p className="text-xs text-gray-400 truncate">
            {currentSong?.description || "Select a song"}
          </p>
        </div>
      </div>

      {/* Controls */}

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-5">
          {/* Shuffle */}

          <button
            onClick={toggleShuffle}
            className={`transition ${
              isShuffle ? "text-[#1ed760]" : "text-gray-400 hover:text-white"
            }`}
          >
            <Shuffle size={17} />
          </button>

          {/* Previous */}

          <button
            onClick={previousSong}
            disabled={!currentSong}
            className="text-gray-400 hover:text-white transition disabled:opacity-50"
          >
            <SkipBack size={20} />
          </button>

          {/* Play / Pause */}

          <button
            onClick={togglePlay}
            disabled={!currentSong}
            className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition disabled:opacity-50"
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" />
            )}
          </button>

          {/* Next */}

          <button
            onClick={nextSong}
            disabled={!currentSong}
            className="text-gray-400 hover:text-white transition disabled:opacity-50"
          >
            <SkipForward size={20} />
          </button>

          {/* Repeat */}

          <button
            onClick={toggleRepeat}
            className={`transition ${
              repeatMode !== "off"
                ? "text-[#1ed760]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Repeat size={17} />
          </button>
        </div>

        {/* Progress */}

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 w-8 text-right">
            {formatTime(currentTime)}
          </span>

          <div
            onClick={handleSeek}
            className="w-72 h-1 bg-gray-600 rounded-full cursor-pointer group"
          >
            <div
              className="h-full bg-white rounded-full relative"
              style={{
                width: `${progressPercentage}%`,
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
            </div>
          </div>

          <span className="text-[11px] text-gray-400 w-8">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}

      <div className="w-1/4 flex justify-end items-center gap-2">
        <Volume2 size={18} className="text-gray-300" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => changeVolume(Number(event.target.value))}
          className="w-24 accent-white cursor-pointer"
        />
      </div>
    </footer>
  );
}

export default MusicPlayer;
