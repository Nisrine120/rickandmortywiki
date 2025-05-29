// context/FavoritesContext.js
import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (character) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === character.id)
        ? prev.filter((fav) => fav.id !== character.id)
        : [...prev, character]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
