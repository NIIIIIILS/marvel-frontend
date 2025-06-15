import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ComicsCharacters = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-back--fn6hxrqtx4nq.code.run/comics/" + id
        );
        console.log(response.data);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return loading ? (
    <p>Chargement</p>
  ) : (
    <div>
      <div className="container comicsIdCharacters">
        <h2>{data.name}</h2>
        <div>{data.description}</div>
      </div>

      <div className="comicsId container">
        {data.comics.map((result) => {
          return (
            <div key={result._id}>
              <img
                src={result.thumbnail.path + "." + result.thumbnail.extension}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsCharacters;
