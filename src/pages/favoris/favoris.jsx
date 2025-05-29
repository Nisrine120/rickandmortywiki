import { useFavorites } from "../../context/FavoritesContext";
import CardApp from "../home/card/card";

function Favoris() {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <h1 className="text-center my-4">My Favorites</h1>
      <div className="row">
        {favorites.map((character) => (
          <div className="col-6 col-md-4 col-lg-2 mb-4" key={character.id}>
            <CardApp character={character} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoris;
