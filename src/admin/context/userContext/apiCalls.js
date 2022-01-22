import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "./userActions";

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    console.log("fetching users list...");
    const res = await axios.get("/api/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });

    console.log("users found");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getUsersFailure());
  }
};

//create
export const createUser = async (list, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post(
      "https://netflix-clone-hkb.herokuapp.com/api/users",
      list,
      {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

//delete
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(
      "https://netflix-clone-hkb.herokuapp.com/api/users/" + id,
      {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
