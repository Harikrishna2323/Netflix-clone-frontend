export const getMoviesStart = () => ({
  type: "GET_MOVIES_START",
});

export const getMoviesSuccess = (movies) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});

export const getMoviesFailure = (err) => ({
  type: "GET_MOVIES_FAILURE",
  payload: err,
});

//ADD MOVIES
export const createMovieStart = () => ({
  type: "CREATE_MOVIES_START",
});

export const createMovieSuccess = (movie) => ({
  type: "CREATE_MOVIES_SUCCESS",
  payload: movie,
});

export const createMovieFailure = (err) => ({
  type: "CREATE_MOVIES_FAILURE",
  payload: err,
});

//UPDATE MOVIES
export const updateMovieStart = () => ({
  type: "UPDATE_MOVIE_START",
});

export const updateMovieSuccess = (movie) => ({
  type: "UPDATE_MOVIE_SUCCESS",
  payload: movie,
});

export const updateMovieFailure = () => ({
  type: "UPDATE_MOVIE_FAILURE",
});

export const deleteMovieStart = () => ({
  type: "DELETE_MOVIE_START",
});

export const deleteMovieSuccess = (id) => ({
  type: "DELETE_MOVIE_SUCCESS",
  payload: id,
});

export const deleteMovieFailure = (err) => ({
  type: "DELETE_MOVIE_FAILURE",
  payload: err,
});
