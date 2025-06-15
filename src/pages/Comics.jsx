import { useEffect, useState } from "react";
import axios from "axios";

const formatString = (str) => {
  if (str.length < 50) {
    return str;
  } else {
    for (let i = 0; i < str.length; i++) {
      if (i > 50 && str[i] === " ") {
        return str.slice(0, i) + "...";
      }
    }
  }
};

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-back--fn6hxrqtx4nq.code.run/comics"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <div>
      <h1>Voici la liste des Comics</h1>

      <div className="superheroList">
        {data.results.map((result) => {
          return (
            <div key={result._id} className="character">
              <img
                src={result.thumbnail.path + "." + result.thumbnail.extension}
                alt=""
              />
              <p className="tagCharacter">{result.title}</p>
              {result.description ? (
                <p className="descriptionCharacter">
                  {formatString(result.description)}
                </p>
              ) : (
                <p>pas de description</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
