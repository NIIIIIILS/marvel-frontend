import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

const formatString = (str) => {
  if (str.length < 60) {
    return str;
  } else {
    for (let i = 0; i < str.length; i++) {
      if (i > 60 && str[i] === " ") {
        return str.slice(0, i) + "...";
      }
    }
  }
};

const Characters = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20); // Nombre de personnages par page

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Calcul du skip (combien d'éléments ignorer)
        const skip = (currentPage - 1) * limit;

        const response = await axios.get(
          `https://site--marvel-back--fn6hxrqtx4nq.code.run/characters?limit=${limit}&skip=${skip}`
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, limit]); // Relancer quand currentPage change

  // Fonction pour changer de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll vers le haut de la page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculer le nombre total de pages
  const totalPages = data.count ? Math.ceil(data.count / limit) : 1;

  return loading ? (
    <p>Chargement...</p>
  ) : (
    <div>
      <h1>Voici la liste des super héros</h1>

      <div className="superheroList">
        {data.results?.map((result) => {
          return (
            <Link
              key={result._id}
              to={`/comicscharacters/${result._id}`}
              className="character"
            >
              <div className="character-image-container">
                <img
                  src={result.thumbnail.path + "." + result.thumbnail.extension}
                  alt={result.name}
                />
              </div>
              <div className="character-content">
                <p className="tagCharacter">{result.name}</p>
                {result.description ? (
                  <p className="descriptionCharacter">
                    {formatString(result.description)}
                  </p>
                ) : (
                  <p className="zéroDescription">Pas de description</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Composant de pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {/* Informations sur la pagination */}
      <div className="pagination-info">
        <p>
          Page {currentPage} sur {totalPages} - Affichage de{" "}
          {data.results?.length || 0} personnages sur {data.count || 0} au total
        </p>
      </div>
    </div>
  );
};

export default Characters;
