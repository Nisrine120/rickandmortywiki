import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../../../context/FavoritesContext";

function CardApp({ character }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(character);
  };

  return (
    <Link
      to={`/character/${character.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
      className="position-relative"
    >
      <Card className="custom-card h-100" style={{ cursor: "pointer" }}>
        <Card.Img variant="top" src={character.image} />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <span
              className="me-2 rounded-circle d-inline-block"
              style={{
                width: "10px",
                height: "10px",
                backgroundColor:
                  character.status === "Alive"
                    ? "#28a745"
                    : character.status === "Dead"
                    ? "#dc3545"
                    : "#6c757d",
              }}
            ></span>
            {character.status} - {character.species}
            <span className="end-0 fs-3 pe-2 position-absolute top-0">
              <FontAwesomeIcon
                icon={isFavorite ? faHeartSolid : faHeartRegular}
                onClick={handleToggleFavorite}
                style={{
                  color: isFavorite ? "red" : "gray",
                  cursor: "pointer",
                }}
              />
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CardApp;
