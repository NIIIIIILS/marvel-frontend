import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchType, setSearchType] = useState("characters"); // "characters" ou "comics"
  const searchRef = useRef(null);

  // Fonction pour rechercher les personnages
  const searchCharacters = async (query) => {
    try {
      const response = await axios.get(
        `https://site--marvel-back--fn6hxrqtx4nq.code.run/characters?name=${encodeURIComponent(
          query
        )}`
      );
      return response.data.results || [];
    } catch (error) {
      console.error("Erreur lors de la recherche de personnages:", error);
      return [];
    }
  };

  // Fonction pour rechercher les comics
  const searchComics = async (query) => {
    try {
      const response = await axios.get(
        `https://site--marvel-back--fn6hxrqtx4nq.code.run/comics?title=${encodeURIComponent(
          query
        )}`
      );
      return response.data.results || [];
    } catch (error) {
      console.error("Erreur lors de la recherche de comics:", error);
      return [];
    }
  };

  // Fonction principale de recherche
  const handleSearch = async (query) => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);

    try {
      let searchResults = [];

      if (searchType === "characters") {
        searchResults = await searchCharacters(query);
      } else {
        searchResults = await searchComics(query);
      }

      setResults(searchResults.slice(0, 8)); // Limite à 8 résultats
    } catch (error) {
      console.error("Erreur de recherche:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce pour éviter trop de requêtes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchType]);

  // Fermer les résultats si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = () => {
    setShowResults(false);
    setSearchTerm("");
  };

  const formatString = (str) => {
    if (!str || str.length <= 50) return str;
    return str.substring(0, 50) + "...";
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-bar">
        <div className="search-type-selector">
          <button
            className={`search-type-btn ${
              searchType === "characters" ? "active" : ""
            }`}
            onClick={() => setSearchType("characters")}
          >
            Héros
          </button>
          <button
            className={`search-type-btn ${
              searchType === "comics" ? "active" : ""
            }`}
            onClick={() => setSearchType("comics")}
          >
            Comics
          </button>
        </div>

        <input
          type="text"
          placeholder={`Rechercher ${
            searchType === "characters" ? "un héros" : "un comic"
          }...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
          className="search-input"
        />

        <div className="search-icon">🔍</div>
      </div>

      {showResults && (
        <div className="search-results">
          {isLoading ? (
            <div className="search-loading">Recherche en cours...</div>
          ) : results.length > 0 ? (
            <div className="results-list">
              {results.map((result) => (
                <Link
                  key={result._id}
                  to={
                    searchType === "characters"
                      ? `/comicscharacters/${result._id}`
                      : `/comics/${result._id}`
                  }
                  className="search-result-item"
                  onClick={handleResultClick}
                >
                  <div className="result-image">
                    <img
                      src={
                        result.thumbnail.path + "." + result.thumbnail.extension
                      }
                      alt={
                        searchType === "characters" ? result.name : result.title
                      }
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/50x75/cccccc/666666?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="result-info">
                    <h4>
                      {searchType === "characters" ? result.name : result.title}
                    </h4>
                    {result.description && (
                      <p>{formatString(result.description)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : searchTerm.length >= 2 ? (
            <div className="no-results">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
