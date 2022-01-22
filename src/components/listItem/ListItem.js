import "./listItem.scss";
import { PlayArrow, Info } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `https://netflix-clone-hkb.herokuapp.com/api/movies/find/${item}`,
          {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    // <Link to={{ pathname: "/watch", state: { movie: movie } }}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie?.imgSm} alt="" />

      {isHovered && (
        <>
          {/* <ReactPlayer
            width="100%"
            height="100%"
            className="video"
            url={movie.trailer}
            controls
            loop
            muted={true}
            autoplay={true}
          /> */}
          {/* <video src={movie.trailer} autoPlay={true} loop /> */}
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow
                className="icon"
                onClick={(e) => navigate("/watch", { state: movie })}
              />
              <Info
                className="icon"
                onClick={(e) =>
                  navigate(`/info/${movie._id}`, { state: movie })
                }
              />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
    // </Link>
  );
}
