import { useEffect, useState } from "react";
import CardApp from "./card/card";
import { Form, Pagination } from "react-bootstrap";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("All");
  const [species, setSpecies] = useState("All");
  const [gender, setGender] = useState("All");
  const charactersPerPage = 12;

  useEffect(() => {
    const fetchCharacters = async () => {
      let allCharacters = [];
      let url = "https://rickandmortyapi.com/api/character";

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        url = data.info.next;
      }

      setCharacters(allCharacters);
    };

    fetchCharacters();
  }, []);

  // Filter characters
  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      status === "All" ||
      character.status.toLowerCase() === status.toLowerCase();
    const matchesSpecies =
      species === "All" ||
      character.species.toLowerCase() === species.toLowerCase();
    const matchesGender =
      gender === "All" ||
      character.gender.toLowerCase() === gender.toLowerCase();

    return matchesSearch && matchesStatus && matchesSpecies && matchesGender;
  });

  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const renderPaginationItems = () => {
    const items = [];

    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    return items;
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
    setCurrentPage(1);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-md-8 col-lg-6">
          <Form.Control
            type="text"
            placeholder="Search for a character"
            value={searchQuery}
            onChange={handleSearchChange}
            id="searchCharacter"
            aria-describedby="searchCharacter"
          />
        </div>
      </div>

      <div className="row justify-content-center mb-3">
        <div className="col-4 col-md-3 col-lg-2">
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              aria-label="Select Status"
              value={status}
              onChange={handleStatusChange}
            >
              <option>All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-4 col-md-3 col-lg-2">
          <Form.Group className="mb-3" controlId="species">
            <Form.Label>Species</Form.Label>
            <Form.Select
              aria-label="Select Species"
              value={species}
              onChange={handleSpeciesChange}
            >
              <option>All</option>
              <option value="human">Human</option>
              <option value="alien">Alien</option>
              <option value="humanoid">Humanoid</option>
              <option value="robot">Robot</option>
              <option value="cronenberg">Cronenberg</option>
              <option value="animal">Animal</option>
              <option value="mythological creature">
                Mythological Creature
              </option>
              <option value="disease">Disease</option>
              <option value="unknown">Unknown</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-4 col-md-3 col-lg-2">
          <Form.Group className="mb-3" controlId="sender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Select Gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <option>All</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <div className="row">
        {currentCharacters.map((character) => (
          <div className="col-6 col-md-4 col-lg-2 mb-4" key={character.id}>
            <CardApp character={character} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default Home;
