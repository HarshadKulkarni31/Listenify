import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  // =========================================================
  // PLAYER STATE
  // =========================================================

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // =========================================================
  // QUEUE
  // =========================================================

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // =========================================================
  // SHUFFLE / REPEAT
  // =========================================================

  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");

  // repeatMode:
  // 'off'
  // 'all'
  // 'one'

  // =========================================================
  // VOLUME
  // =========================================================

  const [volume, setVolume] = useState(0.7);

  // =========================================================
  // LIKED SONGS
  // =========================================================

  const [likedSongs, setLikedSongs] = useState(() => {
    const savedSongs = localStorage.getItem("listenify-liked-songs");

    return savedSongs ? JSON.parse(savedSongs) : [];
  });

  // Save liked songs to localStorage
  useEffect(() => {
    localStorage.setItem("listenify-liked-songs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  // =========================================================
  // PLAYLISTS
  // =========================================================

  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem("listenify-playlists");

    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  // Save playlists to localStorage
  useEffect(() => {
    localStorage.setItem("listenify-playlists", JSON.stringify(playlists));
  }, [playlists]);

  // =========================================================
  // PLAY SONG
  // =========================================================

  const playSong = (song, songs = []) => {
    const newQueue = songs.length > 0 ? songs : [song];

    const index = newQueue.findIndex((item) => item.id === song.id);

    setQueue(newQueue);

    setCurrentIndex(index >= 0 ? index : 0);

    setCurrentSong(song);

    setCurrentTime(0);
    setDuration(0);

    setIsPlaying(true);
  };

  // =========================================================
  // PLAY / PAUSE
  // =========================================================

  const togglePlay = () => {
    if (!currentSong) return;

    setIsPlaying((previous) => !previous);
  };

  // =========================================================
  // PLAY FROM QUEUE
  // =========================================================

  const playFromQueue = (index) => {
    if (!queue[index]) return;

    setCurrentIndex(index);

    setCurrentSong(queue[index]);

    setCurrentTime(0);
    setDuration(0);

    setIsPlaying(true);
  };

  // =========================================================
  // NEXT SONG
  // =========================================================

  const nextSong = () => {
    if (queue.length === 0) return;

    // Shuffle
    if (isShuffle) {
      if (queue.length === 1) {
        return;
      }

      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * queue.length);
      } while (randomIndex === currentIndex);

      playFromQueue(randomIndex);

      return;
    }

    // Normal next song
    const nextIndex = currentIndex + 1;

    // End of queue
    if (nextIndex >= queue.length) {
      if (repeatMode === "all") {
        playFromQueue(0);
      } else {
        setIsPlaying(false);
      }

      return;
    }

    playFromQueue(nextIndex);
  };

  // =========================================================
  // PREVIOUS SONG
  // =========================================================

  const previousSong = () => {
    if (queue.length === 0) return;

    // If more than 3 seconds have played,
    // restart current song
    if (currentTime > 3) {
      seek(0);
      return;
    }

    const previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
      if (repeatMode === "all") {
        playFromQueue(queue.length - 1);
      } else {
        seek(0);
      }

      return;
    }

    playFromQueue(previousIndex);
  };

  // =========================================================
  // SHUFFLE
  // =========================================================

  const toggleShuffle = () => {
    setIsShuffle((previous) => !previous);
  };

  // =========================================================
  // REPEAT
  // =========================================================

  const toggleRepeat = () => {
    setRepeatMode((previous) => {
      if (previous === "off") {
        return "all";
      }

      if (previous === "all") {
        return "one";
      }

      return "off";
    });
  };

  // =========================================================
  // SEEK
  // =========================================================

  const seek = (time) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;

    setCurrentTime(time);
  };

  // =========================================================
  // VOLUME
  // =========================================================

  const changeVolume = (value) => {
    const newVolume = Math.min(1, Math.max(0, value));

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // =========================================================
  // LIKE / UNLIKE SONG
  // =========================================================

  const toggleLike = (song) => {
    setLikedSongs((previous) => {
      const alreadyLiked = previous.some((item) => item.id === song.id);

      // Remove song
      if (alreadyLiked) {
        return previous.filter((item) => item.id !== song.id);
      }

      // Add song
      return [...previous, song];
    });
  };

  // =========================================================
  // CHECK IF SONG IS LIKED
  // =========================================================

  const isLiked = (songId) => {
    return likedSongs.some((song) => song.id === songId);
  };

  // =========================================================
  // CREATE PLAYLIST
  // =========================================================

  const createPlaylist = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const newPlaylist = {
      id: Date.now(),
      name: trimmedName,
      songs: [],
    };

    setPlaylists((previous) => [...previous, newPlaylist]);
  };

  // =========================================================
  // ADD SONG TO PLAYLIST
  // =========================================================

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((previous) =>
      previous.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }

        const alreadyExists = playlist.songs.some(
          (item) => item.id === song.id,
        );

        if (alreadyExists) {
          return playlist;
        }

        return {
          ...playlist,
          songs: [...playlist.songs, song],
        };
      }),
    );
  };

  // =========================================================
  // REMOVE SONG FROM PLAYLIST
  // =========================================================

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((previous) =>
      previous.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }

        return {
          ...playlist,
          songs: playlist.songs.filter((song) => song.id !== songId),
        };
      }),
    );
  };

  // =========================================================
  // DELETE PLAYLIST
  // =========================================================

  const deletePlaylist = (playlistId) => {
    setPlaylists((previous) =>
      previous.filter((playlist) => playlist.id !== playlistId),
    );
  };

  // =========================================================
  // RENAME PLAYLIST
  // =========================================================

  const renamePlaylist = (playlistId, newName) => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    setPlaylists((previous) =>
      previous.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }

        return {
          ...playlist,
          name: trimmedName,
        };
      }),
    );
  };

  // =========================================================
  // LOAD CURRENT SONG
  // =========================================================

  useEffect(() => {
    if (!currentSong || !audioRef.current) {
      return;
    }

    const audio = audioRef.current;

    audio.src = currentSong.audio;

    audio.currentTime = 0;

    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);

        setIsPlaying(false);
      });
    }
  }, [currentSong]);

  // =========================================================
  // PLAY / PAUSE AUDIO
  // =========================================================

  useEffect(() => {
    if (!audioRef.current || !currentSong) {
      return;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);

        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // =========================================================
  // UPDATE VOLUME
  // =========================================================

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  // =========================================================
  // AUDIO EVENTS
  // =========================================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // Current playback position
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Song duration
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Song finished
    const handleEnded = () => {
      // Repeat one
      if (repeatMode === "one") {
        audio.currentTime = 0;

        audio.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });

        return;
      }

      // Play next song
      nextSong();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);

      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);

      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeatMode, queue, currentIndex, isShuffle]);

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <PlayerContext.Provider
      value={{
        // -------------------------
        // Current song
        // -------------------------

        currentSong,

        // -------------------------
        // Playback
        // -------------------------

        isPlaying,

        // -------------------------
        // Progress
        // -------------------------

        currentTime,
        duration,

        // -------------------------
        // Queue
        // -------------------------

        queue,
        currentIndex,

        // -------------------------
        // Shuffle / Repeat
        // -------------------------

        isShuffle,
        repeatMode,

        // -------------------------
        // Volume
        // -------------------------

        volume,

        // -------------------------
        // Liked songs
        // -------------------------

        likedSongs,

        // -------------------------
        // Playlists
        // -------------------------

        playlists,

        // -------------------------
        // Playback functions
        // -------------------------

        playSong,
        togglePlay,

        nextSong,
        previousSong,

        // -------------------------
        // Shuffle / Repeat
        // -------------------------

        toggleShuffle,
        toggleRepeat,

        // -------------------------
        // Progress
        // -------------------------

        seek,

        // -------------------------
        // Volume
        // -------------------------

        changeVolume,

        // -------------------------
        // Likes
        // -------------------------

        toggleLike,
        isLiked,

        // -------------------------
        // Playlists
        // -------------------------

        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        deletePlaylist,
        renamePlaylist,
      }}
    >
      {children}

      {/* Actual audio element */}

      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}

// =========================================================
// CUSTOM HOOK
// =========================================================

export function usePlayer() {
  return useContext(PlayerContext);
}
