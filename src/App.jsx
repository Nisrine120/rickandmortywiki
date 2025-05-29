import { Route, Routes } from "react-router-dom";
import "./App.css";
import Favoris from "./pages/favoris/favoris";
import Home from "./pages/home/home";
import Layout from "./layout/layout";
import Character from "./pages/character/character";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favoris" element={<Favoris />} />
          <Route path="character/:id" element={<Character />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
