export const getUsersStart = () => ({
  type: "GET_USERS_START",
});

export const getUsersSuccess = (users) => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});

export const getUsersFailure = () => ({
  type: "GET_USERS_FAILURE",
});

export const createUserStart = () => ({
  type: "CREATE_USER_START",
});

export const createUserSuccess = (list) => ({
  type: "CREATE_User_SUCCESS",
  payload: list,
});

export const createUserFailure = () => ({
  type: "CREATE_User_FAILURE",
});

export const updateUserStart = () => ({
  type: "UPDATE_USER_START",
});

export const updateUserSuccess = (movie) => ({
  type: "UPDATE_User_SUCCESS",
  payload: movie,
});

export const updateUserFailure = () => ({
  type: "UPDATE_User_FAILURE",
});

export const deleteUserStart = () => ({
  type: "DELETE_User_START",
});

export const deleteUserSuccess = (id) => ({
  type: "DELETE_User_SUCCESS",
  payload: id,
});

export const deleteUserFailure = () => ({
  type: "DELETE_User_FAILURE",
});
