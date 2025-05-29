import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!response.ok) throw new Error("Character not found");
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    }

    if (id) fetchCharacter();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!character) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <Image
              src={character.image}
              className="img-fluid rounded-start h-100 w-100 object-fit-cover"
              alt="character-image"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{character.name}</h4>
              <h6>
                <span
                  className={`me-2 rounded-circle d-inline-block`}
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
              </h6>
              <p className="card-text">
                <div>
                  <span>Origin: {character.origin.name}</span>
                </div>
                <div>
                  <span>Location: {character.location.name}</span>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Character;
