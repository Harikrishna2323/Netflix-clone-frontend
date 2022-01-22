import React, { useContext, useEffect, useState } from "react";
import "./movieInfo.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { PlayArrow, Info } from "@material-ui/icons";

const MovieInfo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //   const [movie, setMovie] = useState([]);
  const location = useLocation();

  const movie = location.state;

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>{movie.title}</h1>
          <img src={movie.imgTitle} alt={movie.title} />

          <span style={{ padding: "5px" }}>year: {movie.year}</span>
          <h4 style={{ padding: "5px" }}>Desc:</h4>
          <h4 style={{ margin: "4px" }}>{movie.desc}</h4>
          <i>
            <PlayArrow
              style={{
                border: "2px solid white",
                padding: "10px",
                borderRadius: "50%",
                marginRight: "10px",
                fontSize: "16px",
              }}
              onClick={(e) => navigate("/watch", { state: movie })}
            />
          </i>
        </form>
      </div>
    </div>
  );
};

export default MovieInfo;

// border: 2px solid white;
// padding: 5px;
// border-radius: 50%;
// margin-right: 10px;
// font-size: 16px;
