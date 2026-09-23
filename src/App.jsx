import { Routes, Route } from "react-router";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />

      <Route
        path="/library"
        element={
          <Layout>
            <Library />
          </Layout>
        }
      />

      <Route
        path="/playlist/:playlistId"
        element={
          <Layout>
            <Playlist />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;

/*import { useEffect } from "react";
import { Routes, Route } from "react-router";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import Login from "./pages/Login";

import { supabase } from "./lib/supabase";

function App() {
  useEffect(() => {
    const testSupabase = async () => {
      const { data, error } = await supabase.from("songs").select("*");

      console.log("Supabase songs:", data);
      console.log("Supabase error:", error);
    };

    testSupabase();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />

      <Route
        path="/library"
        element={
          <Layout>
            <Library />
          </Layout>
        }
      />

      <Route
        path="/playlist/:playlistId"
        element={
          <Layout>
            <Playlist />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
