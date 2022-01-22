import { useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRows } from "../../../dummyData";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { useEffect } from "react";
import { getUsers } from "../../context/userContext/apiCalls";
import { getMovies, getSeries } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import axios from "axios";

export default function FeaturedInfo() {
  const { users, dispatch } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getUsers(dispatch);
    const getAllMovies = async () => {
      const { data } = await axios.get("/api/movies/ismovie", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      });
      setMovies(data);
    };
    getAllMovies();

    const getAllSeries = async () => {
      const { data } = await axios.get("/api/movies/isseries", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      });
      console.log(data);
      setSeries(data.series);
    };
    getAllSeries();
  }, [dispatch]);

  return (
    <div className="adminfeatured">
      <div className="adminfeaturedItem">
        <span className="adminfeaturedTitle">Users</span>
        <div className="adminfeaturedMoneyContainer">
          <span className="adminfeaturedMoney">{users.length}</span>
        </div>
      </div>
      <div className="adminfeaturedItem">
        <span className="adminfeaturedTitle">Movies</span>
        <div className="adminfeaturedMoneyContainer">
          <span className="adminfeaturedMoney">{movies.length}</span>
        </div>
      </div>
      <div className="adminfeaturedItem">
        <span className="adminfeaturedTitle">Series</span>
        <div className="adminfeaturedMoneyContainer">
          <span className="adminfeaturedMoney">{series.length}</span>
        </div>
      </div>
    </div>
  );
}
