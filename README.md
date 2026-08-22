# Listenify

Listenify is a Spotify-inspired music streaming web application built with React and Vite.

The project is currently focused on building the frontend experience, including music playback, playlists, search, and library management.

## Features

- Music playback
- Play and pause
- Next and previous tracks
- Shuffle
- Repeat
- Volume control
- Progress bar and seeking
- Music search
- Liked songs
- Liked songs persistence using localStorage
- Your Library
- Playlist creation
- Add songs to playlists
- Remove songs from playlists
- Rename playlists
- Delete playlists
- Playlist persistence using localStorage
- React Router navigation
- Dark music streaming interface
- Responsive design in progress
- Responsive desktop and mobile navigation
- Mobile hamburger menu
- Responsive music player
- Functional music search
- Search by song title and description
- Search result playback

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide React
- HTML5 Audio API
- LocalStorage

## Project Structure

```text
src/
├── components/
│   ├── CreatePlaylistModal.jsx
│   ├── Layout.jsx
│   ├── MusicCard.jsx
│   ├── MusicPlayer.jsx
│   ├── Navbar.jsx
│   ├── Queue.jsx
│   └── Sidebar.jsx
│
├── context/
│   └── PlayerContext.jsx
│
├── data/
│   └── musicData.js
│
├── pages/
│   ├── Home.jsx
│   ├── Search.jsx
│   ├── Library.jsx
│   └── Playlist.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/HarshadKulkarni31/Listenify
```

### Navigate to the project directory

```bash
cd listenify
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local development URL displayed in the terminal.

## Development Status

### Completed

- [x] React and Vite setup
- [x] Listenify branding
- [x] Sidebar navigation
- [x] Home page
- [x] Search page
- [x] Library
- [x] Music player
- [x] Playback controls
- [x] Shuffle and repeat
- [x] Volume control
- [x] Liked songs
- [x] Playlist creation
- [x] Playlist management
- [x] LocalStorage persistence
- [x] Responsive and mobile UI
- [x] Improved search experience
- [x] Recently played system
- [x] Queue Interface 


### In Progress

- [ ] Advanced music player UI
- [ ] Artist pages
- [ ] Album pages
- [ ] Final UI and UX improvements

### Planned

- [ ] User authentication
- [ ] Backend API
- [ ] Database
- [ ] Cloud persistence
- [ ] User profiles
- [ ] Production deployment

## Current Limitations

Listenify currently uses local music files and browser localStorage

This means:

- Music is available only from bundled local files.
- Liked songs are stored per browser.
- Playlists are stored per browser.
- User data is not synchronized across devices.
- There is currently no authentication or backend.

These limitations will be addressed during the backend development phase.

## Project Goal

The goal is to develop Listenify from a frontend prototype into a full-stack music streaming application with a clean and scalable architecture.

## License

This project is created for educational and portfolio purposes.
