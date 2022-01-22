import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./movieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    // console.log("dispatching the movies");
    const res = await axios.get(
      "https://netflix-clone-hkb.herokuapp.com/api/movies/ismovie",
      {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    // console.log("movies: ", res.data);
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getMoviesFailure());
  }
};

//series
export const getSeries = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get(
      "https://netflix-clone-hkb.herokuapp.com/api/movies/isseries",
      {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );

    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getMoviesFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    console.log(JSON.parse(localStorage.getItem("user")).token);
    await axios.delete(
      "https://netflix-clone-hkb.herokuapp.com/api/movies/" + id,
      {
        headers: {
          token: " Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteMovieFailure());
  }
};

//CREATE MOVIES => POST
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post(
      "https://netflix-clone-hkb.herokuapp.com/api/movies",
      movie,
      {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};
