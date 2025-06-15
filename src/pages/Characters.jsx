import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--fn6hxrqtx4nq.code.run/characters`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <p>Chargement</p>
  ) : (
    <div>
      <h1>Voici la liste des super héros</h1>
      <div className="superheroList">
        {data.results.map((result) => {
          return (
            <Link
              key={result._id}
              to={`/comicscharacters/${result._id}`}
              className="character"
            >
              <img
                src={result.thumbnail.path + "." + result.thumbnail.extension}
                alt=""
              />
              <p className="tagCharacter">{result.name}</p>
              {result.description ? (
                <p className="descriptionCharacter">
                  {formatString(result.description)}
                </p>
              ) : (
                <p className="zéroDescription">Pas de description</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
