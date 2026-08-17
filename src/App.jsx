import { Routes, Route } from "react-router";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="/playlist/:playlistId" element={<Playlist />} />
      </Routes>
    </Layout>
  );
}

export default App;
