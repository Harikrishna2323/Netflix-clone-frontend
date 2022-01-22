import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./Featured.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

export default function Featured({ type, setGenre }) {
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/api/movies/random?type=${type}`, {
          headers: {
            token: "Bearer " + user.token,
          },
        });
        setMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  console.log(movie);

  return (
    <div className="featured">
      {/* {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )} */}
      <img src={movie.img} alt="" />
      <div className="info">
        <img className="imageTitle" src={movie.imgTitle} alt="" />
        <span className="desc">{movie.desc}</span>
        <div className="buttons">
          <button
            className="play"
            onClick={(e) => navigate("/watch", { state: movie })}
          >
            <PlayArrow />
            <span>Play</span>
          </button>
          {/* <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}
